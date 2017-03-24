
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
