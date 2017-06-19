// Documentation: https://github.com/auth0/extend/wiki/Auth0-Extend-User%27s-Guide#hosting-the-editor
function createExtendEditorConfig(options) {
    var editorOptions = {
        token: options.webtaskContext.webtaskToken,
        hostUrl: options.webtaskContext.hostUrl,
        webtaskContainer: options.webtaskContext.webtaskContainer,
        theme: 'light',
        header: false,
        toolbar: {
            enabled: true,
            displayName: true
        },
        allowRenaming: false,
        allowDeleting: false,
        allowCreating: false,
        allowSwitching: false,
        allowUpdating: true,
        allowAccessingLogs: true,
        allowEditingSecrets: true,
        allowEditingMeta: false,
        allowEditingSchedule: false,
        allowSwitchingTemplates: false,
        allowCreatingFromTemplate: false,
        runner: {
            methods: ['POST'],
            headersEditor: {
                defaultHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: function (secrets) {
                    var token = secrets ? secrets['auth0-extension-secret'] : '';
                    return 'Bearer ' + token;
                    }
                }
            },
            paramsEditor:  false,
            bodyEditor: {
                typeSelector: false,
                defaultType: 'raw',
                rawTypeOptions: {
                    defaultMode: 'json',
                    enabled: false
                }
            }
        }
    };

    return editorOptions;
}

function getExtensibilityPointCode(extensibilityPoint) {
    var code = [
        '// This code will execute whenever an opportunity is changed.',
        '// Use 1000+ Node.js modules here. ',
        '',
        'module.exports = function(ctx, cb) {',
        '  console.log(\'On opportunity changed:\', ctx.body);',
        '  var opportunity = ctx.body;',
        '  ',
        '  if (opportunity.size > 1000) {',
        '    // send e-mail to manager',
        '  }',
        '  ',
        '  cb(null, opportunity);',
        '};'
    ].join('\n');

    if (extensibilityPoint === 'on-new-lead') {
        code = [
            '// This code will execute whenever a new lead is created.',
            '// Use 1000+ Node.js modules here. ',
            '',
            'module.exports = function(ctx, cb) {',
            '  console.log(\'On new lead:\', ctx.body);',
            '  ',
            '  var lead = ctx.body;',
            '  ',
            '  if (lead.value > 1000) {',
            '    // Send e-mail to manager',
            '    // ...',
            '  }',
            '',
            '  // lead.profile = getProfileFromFullContact(lead.email);',
            '  lead.profile = {',
            '    vip: true,',
            '    comment: \'This was added by custom code\'',
            '  };',
            ' ',
            '  // return the newly created lead',
            '  cb(null, lead);',
            '};'
        ].join('\n')
    }

    return code;
}

function getExtensibilityPointSample(extensibilityPoint)  {
    var sample = { opportunity: 100 }

    if (extensibilityPoint === 'on-new-lead') {
        sample = { value: 1 }
    }

    return JSON.stringify(sample, null, 2);
}

function createRuntimeConfig(options) {
    var editorOptions = {
        webtaskName: options.extensibilityPoint,
        createIfNotExists: {
            category: options.extensibilityPoint
        },
        runner: {
            sample: getExtensibilityPointSample(options.extensibilityPoint)
        },
        categories: [{
            default: true,
            name: options.extensibilityPoint,
            templates: [{
                name: options.extensibilityPoint,
                secrets: {
                    'auth0-extension-secret': options.randomBytes
                },
                meta: {
                    'auth0-extension-secret': options.randomBytes,
                    'auth0-extension-type': options.extensibilityPoint,
                    'wt-compiler': 'auth0-ext-compilers/generic'
                },
                code: getExtensibilityPointCode(options.extensibilityPoint)
            }]
        }]
    };

    return editorOptions;
}

function qs(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
}

function createTripMock() {
    return {
        start: function () {},
        next: function () {},
        stop: function () {},
    };
}

function createInitialTutorial() {
    if (qs('mode') !== 'tutorial') {
        return createTripMock();
    }

    $('.tutorial.step6 a')
        .attr('href', 'settings?mode=tutorial');

    var trip = new Trip([
        { 
          sel : $(".tutorial.step1"), 
          content : "Enter 'Customer' as a sample customer name.",
          position : "e",
          animation: 'bounce'
        },
        { 
          sel : $(".tutorial.step2"), 
          content : "Enter '5000' as the value of the prospective deal.",
          position : "e" 
        },
        { 
          sel : $(".tutorial.step3"), 
          content : "Click here.",
          position : "e" 
        },
        {
          sel : $(".tutorial.step4"), 
          content: 'JSON result is returned showing information about the newly created lead.',
          position : "n",
          delay : 5000
        },
        {
          sel : $(".tutorial.step6"), 
          content: 'Zero CRM can be extended via custom actions to intercept the lead creation event, and implement custom logic. The Settings screen is where you can configure custom actions.',
          position : "e",
          expose : true
          // delay: 1000
        }
      ], {
        delay : -1,
        tripTheme : "white"
      });

    return trip;
}

function createSettingsTutorial() {
    if (qs('mode') !== 'tutorial') {
        return createTripMock();
    }

    var trip = new Trip([
      { 
        sel : $(".tutorial.step1"), 
        content : "Most platforms today use webhooks for extensibility. Zero CRM uses Auth0 Extend to allow users to write the extension code in-place instead, and later execute it securely. Click here to edit the on-new-lead custom action.",
        position : "w",
        animation: 'bounce'
      },
      { 
        sel : $(".tutorial.step2"), 
        content : "The Auth0 Extend editor provides feature-rich and highly customizable in-product extension development experience. Extensions can be written in Node.js or domain specific languages. Users can manage secrets, access real-time logs, and test the code all from within the Auth0 Extend editor. Try modifying the JSON the code returns, save, then go back to 'Leads' and add a new lead to see your custom action executed.",
        position : "n",
        showCloseBox: true
      }
    ], {
      delay : -1,
      tripTheme : "white"
    });

    return trip;
}