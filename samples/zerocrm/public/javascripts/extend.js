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
          content : "Enter the name 'Customer'",
          position : "e",
          animation: 'bounce'
        },
        { 
          sel : $(".tutorial.step2"), 
          content : "Put the value '5000'",
          position : "e" 
        },
        { 
          sel : $(".tutorial.step3"), 
          content : "Click here",
          position : "e" 
        },
        {
          sel : $(".tutorial.step4"), 
          content: 'a JSON result is returned showing the lead has been created',
          position : "n",
          delay : 5000
        },
        {
          sel : $(".tutorial.step5"), 
          content: 'Zero CRM uses Auth0 Extend to execute custom user actions on creation of the lead.',
          position : "s" ,
          delay : 6000
        },
        {
          sel : $(".tutorial.step6"), 
          content: 'The Settings screen is where you do this configuration.',
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
        content : "Click here",
        position : "e",
        animation: 'bounce'
      },
      { 
        sel : $(".tutorial.step2"), 
        content : "The code for the action was created on 'Edit' for illustration, in a real system you would likely have a different default template. This code first writes out to the console when a new lead is created. It then checks to see if the lead value is greater than $1000 and has a placeholder for sending an email. Finally, it tacks on additional profile information to the returned lead.",
        position : "n",
        showCloseBox: true
      }
    ], {
      delay : -1,
      tripTheme : "white"
    });

    return trip;
}