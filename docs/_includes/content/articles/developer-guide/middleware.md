## Middleware

Auth0 Extend middleware is custom Node.js code you control that executes right before the extension code your users write. It allows you to augment the default extension execution logic supported by Auth0 Extend without requiring any changes in the code of your users. 

Most common situations where middleware is useful include: 

1. **Custom programming models**. With middleware, you can transform and adapt webtask function signatures to offer custom programming models for your users. For example, the on-new-lead extension could offer a `function (new_lead, history, context, callback)` function signature that is specific to the domain it addresses. However, this adaptation is not limited to JavaScript: you can as well support writing extensions using domain specific languages like T-SQL or a templating engine. 

2. **Authorization**. Middleware allows you to implement authorization and access control logic for calls to extension endpoints. For example, the [Creating Extensions](#creating-extensions) section recommends using a pattern of securing extension endpoints that builds on middleware. 

3. **Logging**. Middleware allows you to build a custom logging solution. For example, you can intercept and capture all calls to `console.log` made by extension code to filter or export it to an external system. 

4. **Context enhancement**. You can use middleware to provide extension code with additional data or functionality beyond what Auth0 Extend provides by default. For example, you can pre-fetch data from a database or make a function that fetches data available for calling from the extension code. 

Middleware for an extension is determined via the `wt-compiler` metadata property of a webtask, which sets a *webtask compiler* for the webtask. Normally it is specified at the time the [extension is created](#creating-extensions). You can read more about creating and setting custom webtask compilers [here](https://webtask.io/docs/webtask-compilers).  

**NOTE** The [Creating Extensions](#creating-extensions) section recommends using the `auth0-ext-ompilers/generic` for the value of `wt-compiler` metadata property. This middleware enforces a simple authorization scheme to ensure that only your platform can execute extensions. If you choose to set your own middleware, you need to make sure adequate replacement for that authorization mechanism is in place. You can refer to the code of the `auth0-ext-compilers/generic` implementation [here](https://github.com/auth0/auth0-ext-compilers/blob/master/lib/compilers/generic.js). 

Let's look at an example of a custom middleware that introduces a domain specific programming model and enforces the same authorization mechanism as `auth0-ext-compilers/generic`. Imagine you want your users to be able to modify the logic of creating a new lead in a hypothetical CRM system. When a new lead is created they will be notified and get a chance to add extra attributes to the new lead record. 

The body of the request to this extension would be a JSON object that looks like this:

```json
{
  "name": "Jon Doe",
  "value": 1000
}
```

The expected body of the response would contain a JSON object with new attributes to add to the record, e.g.:

```json
{
  "newAttributes": {
    "vip": true,
    "profile": {}
  }
}
```

Out of the box, this is the programming model of an Auth0 Extend extensions given this schema: 

```javascript
module.exports = function (ctx, cb) {
  var newAttributes = {};
  if (ctx.body.value > 500) {
    newAttributes.vip = true;
  }
  return cb(null, {
    newAttributes: newAttributes
  });
};
```

Now assume you want to provide your users with a much more friendly and self-exlanatory programming model: 

```javascript
module.exports = function (name, value, cb) {
  var newAttributes = {};
  if (value > 500) {
    newAttributes.vip = true;
  }
  return cb(null, newAttributes);
};
```

The way to achieve this is to implement a [webtask compiler](https://webtask.io/docs/webtask-compilers) which adjusts between the two programming models: 

```javascript
module.exports = (options, cb) => {
    // First compile the user-supplied extension code into a function
    options.nodejsCompiler(options.script, (error, func) => {
      if (error) return cb(error);
      // Now return a function that uses the (ctx, cb) programming model
      // supported natively by Webtasks, and adjusts the programming models
      // when called
      return cb(null, (ctx, cb) {
        // First, enforce authorization check similar to auth0-ext-compilers/generic.
        var match = (ctx.headers['authorization'] || '').trim().match(/^bearer (.+)$/i);
        if (!match || match[1] !== ctx.secrets['auth0-extension-secret']) {
          var error = new Error('Unauthorized call');
          error.statusCode = 401;
          return cb(error);
        }

        // Extract inputs from request body into stand-along arguments,
        // wrap callback to transform response format.
        var name = ctx.body.name;
        var value = ctx.body.value;
        return func(name, value, (error, response) => {
          if (error) return cb(error);
          // Transform the response format
          return cb(null, {
            newAttributes: response
          });
        })
      })
    });
};
```

You need to host the code of the compiler at a place where it can be obtained over HTTPS, say https://cdn.mycompany.com/on-new-lead-compiler.js. 

Now, when [creating a new on-new-lead extension](#creating-extensions), you can refer to this compiler instead of the `auth0-ext-compilers/generic` one:

```
PUT /api/webtask/{webtask_container}/{webtask_name}
Content-Type: application/json
Authorization: Bearer {tenant_webtask_token}

{
  "code": "{code}",
  "secrets": {
    "auth0-extension-secret": "{secret}"
  },
  "meta": {
    "auth0-extension-secret": "{secret}",
    "auth0-extension-type": "on-new-lead",
    "wt-compiler": "https://cdn.mycompany.com/on-new-lead-compiler.js"
  }
}
```