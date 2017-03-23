/*
{
  "container": "ext-test",
  "name": "on-new-lead",
  "token": "eyJhbGciOiJIUzI1NiIsImtpZCI6IjIifQ.eyJqdGkiOiJmODYyZWMyMzhkZGQ0MGU2OWNkN2RkODI5ODJlNDRhYyIsImlhdCI6MTQ5MDIyMzMwMywiY2EiOlsiZTBjOGMxMDE5N2YyNGU0ZTgwZTJjMmY2YTdjMWUwZmYiLCI4YTg1MmJiYmQxMzE0MWJjOTJhNzYzYjIzMDQ4YWIyNSJdLCJkZCI6MCwidGVuIjoiZXh0LXRlc3QiLCJlY3R4IjoibElQZjFZbWc1RHFPZXpFZHh4aGx6Wm1SbkREclY0d0VzMmZlOVAzWVFnWDlITWNucENTK3pSVytKU243blM1UEJhbzhQSjk0ckdGQUVCRXlDQ0tvMVgzanJjMzQzUzI5YWZ2cWl3QWtoMXZ5YnJCQngvU0ZMZ1d6RzhxSDNYSVguSCszcHB6bmtHVHZPc0YvS0dkcnFFUT09IiwianRuIjoib24tbmV3LWxlYWQiLCJwYiI6MiwidXJsIjoid2VidGFzazovL2xvY2FsaG9zdC9hcGkvZGF0YS9jb2RlL2V4dC10ZXN0JTJGb24tbmV3LWxlYWQifQ.jHtyJc_ltS7ysgoqB9-G7I4I7g0_AtNrsIt-siK-Rrw",
  "meta": {
    "auth0-extension-secret": "9f0f6154a64dedd0e2f84ca34c43e2e618638e75f3267447f75d9b86c57831d2",
    "auth0-extension-type": "on-new-lead",
    "wt-compiler": "auth0-ext-compilers/generic"
  },
  "webtask_url": "https://ext-test.run.webtask.io/on-new-lead"
}
*/

// Documentation: https://github.com/auth0/extend/wiki/Auth0-Extend-User%27s-Guide#hosting-the-editor
function createExtendEditorConfig(options) {
    var editorOptions = {
        token: options.webtaskContext.webtaskToken,
        webtaskUrl: options.webtaskContext.webtaskUrl,
        webtaskContainer: options.webtask.container,
        webtaskName: options.webtask.name,
        defaultEditor: 'https://auth0.github.io/webtask-workbench/function-editor.js',
        // themeUrl: 'https://auth0.github.io/webtask-workbench/themes/white-theme.css',
        themeUrl: 'https://auth0.github.io/webtask-workbench/themes/auth0-theme.css',
        header: false,
        // header: {
        //     logoUrl: '...'
        // },
        toolbar: {
            enabled: true,
            displayName: true
        },
        allowCreating: false,
        allowSwitching: false,
        allowUpdating: true,
        allowAccessingLogs: true,
        allowEditingSecrets: true,
        allowEditingMeta: false,
        allowEditingSchedule: false,
        allowSwitchingTemplates: false,
        allowCreatingFromTemplate: false,
    };
    return editorOptions;
}


// Documentation: https://github.com/auth0/extend/wiki/Auth0-Extend-User%27s-Guide#creating-extensions
function ensureExtensionExists(options) {
    return discoverExtensions(options)
        .then((extensions) => {
            // Allow only one extension of a specific type to be defined. In production
            // you may allow multiple extensions to exists but only one to be active a time. 
            // You can use a webtask metadata property to indicate which of the extensions is active.
            if (extensions.length > 1) return Promise.reject(new Error(`Inconsistent configuration. More than 1 extension defined for ${options.extensibilityPoint}. Only one is allowed.`));

            // If an extension exists, return it.
            if (extensions.length === 1) return extensions[0];

            // Otherwise, create it
            return createExtension().then(() => ensureExtensionExists(options));
        });

    function createExtension() {
        return loadExtensionCode()
            .then(createWebtask);
    }

    function loadExtensionCode() {
        return superagent.get(`/javascripts/${options.extensibilityPoint}.js`)
            .then((res) => {
                if (!res.ok) return Promise.reject(new Error(`Unable to obtain template code for new extension: HTTP ${res.statusCode}`));
                return Promise.resolve(res.text);
            });
    }

    function createWebtask(code) {
        return superagent.put(`${options.webtaskContext.webtaskUrl}/api/webtask/${options.webtaskContext.webtaskContainer}/${options.extensibilityPoint}`)
            .set('Authorization', `Bearer ${options.webtaskContext.webtaskToken}`)
            .send({
                code: code, 
                secrets: {
                    'auth0-extension-secret': options.randomBytes
                },
                meta: {
                    'auth0-extension-secret': options.randomBytes,
                    'auth0-extension-type': options.extensibilityPoint,
                    'wt-compiler': 'auth0-ext-compilers/generic'
                }
            })
            .then((res) => {
                return res.ok 
                    ? null 
                    : Promise.reject(new Error(`Unable to create new extension: HTTP ${res.statusCode}`))
            });
    }
}

// Documentation: https://github.com/auth0/extend/wiki/Auth0-Extend-User%27s-Guide#discovering-extensions
function discoverExtensions(options) {
    return superagent.get(`${options.webtaskContext.webtaskUrl}/api/webtask/${options.webtaskContext.webtaskContainer}`)
        .query({ meta: `auth0-extension-type:${options.extensibilityPoint}` })
        .set('Authorization', `Bearer ${options.webtaskContext.webtaskToken}`)
        .then((res) => {
            if (!res.ok) return Promise.reject(new Error(`Unable to discover extensions: HTTP ${res.statusCode}`));
            return Promise.resolve(res.body);
        });
}
