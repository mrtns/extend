## NPM Modules

The Node.js code your customers write to extend your platform can utilize all built-in Node.js modules as well as any module from the public NPM registry. When your customers write extension code, they should use `require` as they would normally, e.g: 

```javascript
var mongo = require('mongodb');

module.exports = function (ctx, cb) { };
```

However, before executing a webtask that has a dependency on an NPM module, the NPM module must be registered with the platform. Registering NPM modules allows the platform to download and install the NPM module beforehand, ensuring that the dependency is available whenever the webtask executes.

If your customers are using the [command line tool](#enabling-command-line-tool-for-your-users), then the tool will read the dependencies listed in the package.json file and ensure that each is registered with the platform. If the package.json file specifies a version range for the module semver, the semver will be resolved to a particular version.

If your customers are using the [embedded Extend Editor](libraries/extend-editor#integration-options) then they can specify their dependencies by clicking on the editor 'Settings' icon and selecting 'NPM Modules'.

![Settings > NPM Modules](https://cloud.githubusercontent.com/assets/302314/26526748/3a4aeb36-435a-11e7-939a-3248a218bd22.png)

Your customers can then enter the NPM module that their code will take a dependency upon.

![Adding an NPM Module](https://cloud.githubusercontent.com/assets/302314/26526749/3a525c5e-435a-11e7-9217-533066c57f33.png)

If your customers are not using either the command line tool or the embedded extend editor, you will need to ensure your customers NPM modules are registered with the platform by calling the [HTTP API](api/http-api#ensuring-modules).
