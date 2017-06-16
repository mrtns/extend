## Create and run a webtask using sandboxjs

The code snippet below creates a new webtask and runs it using Sandbox. The webtask code is defined as module.exports = function (ctx, cb) { cb(null, "hello world"); } and the Sandbox.fromToken method is used to create a Sandbox instance from your webtask token. The token in this example is retrieved from the environment variable WEBTASK_TOKEN. Once the Sandbox instance (profile) is defined, the instance method run is used. This method is a shortcut to create and run a Webtask from the given options. The method's structure is sandbox.run([codeOrUrl], [options], [cb]), where [codeOrUrl] is the code or the URL for the webtask (in our example the code variable holds the webtask code), [options] is the set of options (for example, secrets) used to create the webtask (omitted in our example), and [cb] is the optional callback function for node-style callbacks. In our example the callback function uses Assert to display:

- the error if the callback returns one
- The webtask executed as expected if the status code returned by the webtask is 200
- The webtask returned the expected string if the webtask returns the expected hello world

You can read more on this method here.

```javascript
var Assert = require('assert');
var Sandbox = require('sandboxjs');

var code = 'module.exports = function (ctx, cb) { cb(null, "hello world"); }';
var profile = Sandbox.fromToken(process.env.WEBTASK_TOKEN);

// This library lets you create a webtask and run it in one step as a shortcut
profile.run(code, function (err, res, body) {
  Assert.ifError(err);
  Assert.equal(res.statusCode, 200, 'The webtask executed as expected');
  Assert.equal(body, 'hello world', 'The webtask returned the expected string');
});
```