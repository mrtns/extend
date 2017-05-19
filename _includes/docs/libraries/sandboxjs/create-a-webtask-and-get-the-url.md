## Create a webtask and get the URL

Our second example creates a webtask but instead of running it, returns the URL as output. Making requests to this url will run the specified custom code in a node.js sandbox and will give it access to your secrets in the firstargument of your exported webtask function. In this example we are utilizing the [options] argument and use it to set a secret: auth0: 'rocks'.

```javascript
var Assert = require('assert');
var Sandbox = require('sandboxjs');

var code = 'module.exports = function (ctx, cb) { cb(null, "hello world"); }';
var profile = Sandbox.fromToken(process.env.WEBTASK_TOKEN);

// This library lets you create a webtask and returns the URL:
profile.create(code, { secrets: { auth0: 'rocks' } }, function (err, webtask) {
  Assert.ifError(err);
  console.log(webtask.url);
});
```