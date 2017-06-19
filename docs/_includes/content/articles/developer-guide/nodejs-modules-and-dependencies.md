## Node.js Modules and Dependencies

The Node.js code your customers write to extend your platform can utilize all built-in Node.js modules as well as a large number of most popular modules from public NPM registry. No special declaration of modules is necessary, the code can simply `require` them, e.g: 

```javascript
var mongo = require('mongodb');

module.exports = function (ctx, cb) { };
```

The list of available modules is always growing, you can check current module availability [here](https://tehsis.github.io/webtaskio-canirequire/). Some modules are available in multiple versions, you can require a specific version with: 

```javascript
var mongo = require('mondbodb@2.0.33');
```

Apart from selected public NPM modules, your installation of Auth0 Extend can also offer your users modules from your private NPM repository, or even modules you manage outside of NPM. [Contact support](#support) if you are interested in this capability. 