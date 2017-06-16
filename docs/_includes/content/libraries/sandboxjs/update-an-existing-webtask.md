## Update the code of an existing webtask

Our third example retrieves an existing named webtask and updates its code. Let's say that you already have a webtask named my-webtask and it prints Hello world. We will update its code to print Hello there instead. The code snippet uses the method sandbox.updateWebtask(options, [cb]) to update the webtask's code. This function can also be used to update a webtask's secrets or other claims. Note that this method should be used with caution as there is the potential for a race condition where another agent updates the webtask between the time that the webtask details and claims are resolved and when the webtask update is issued.

```javascript
var Sandbox = require('sandboxjs');

var webtaskName = 'my-webtask'; //existing webtask name
var webtaskCode = 'module.exports = function (ctx, cb) { cb(null, "Hello there"); }'; //updated code
var profile = Sandbox.fromToken(process.env.WEBTASK_TOKEN);

profile.updateWebtask({
  name: webtaskName,
  code: webtaskCode,
});
```