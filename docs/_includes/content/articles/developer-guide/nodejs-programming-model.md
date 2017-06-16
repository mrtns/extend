## Node.Js programming model

Auth0 Extend allows your users to write Node.js code to implement extension logic. Each extension is a Node.js module that exports a single JavaScript function. Three basic function signatures are supported out of the box as documented in the [Webtask Programming Model](https://webtask.io/docs/model). However, Auth0 Extend allows you to step outside of these built-in Webtask programming models to allow extension authoring using arbitrary JavaScript function signatures, domain specific languages like T-SQL or Mustache templates, or to inject middleware services that offer a range of customizations of the programming model. These advanced topics are described in the [Middleware](#middleware) section.

In the most common case that satisfies vast majority of extensibility scenarios, an extension would accept JSON on input, and return JSON on output. For this use case, the following built-in function signature is adequate: 

```javascript
module.exports = function (ctx, cb) {
  // JSON object sent in the body of the request is parsed
  // and stored in ctx.body
  var result = {};

  // The result JavaScript object will be serialized as JSON in the response body
  return cb(null, result);
};
```

In more advanced cases where you want to process non-JSON data formats (for example have the extension return a PNG image), you need to use the low-level programming model that supports the full flexibility of the HTTP protocol: 

```javascript
module.exports = function (ctx, req, res) {
  res.writeHead(200, {'Content-Type': 'image/png'});
  var imageData;
  res.end(imageData);
};
```

In this low level programming model the extension is provided with the raw request and response object representing the [HTTP request and response in Node.js](https://nodejs.org/dist/latest-v6.x/docs/api/http.html). Note that the extension code in this case is responsible for reading in and parsing the request body, which provides it with the flexibility to accept arbitrary data formats. 

Instead of using one of the programming models that comes with Auth0 Extend, you can choose to design your own. For example, if you have an "on account changed" extension in your system that accepts information about the account, account representative, and contact history, and allows for a modified account to be returned, you can choose to offer a tailored programming model for your users: 

```javascript
module.exports = function (account, representative, history, cb) {
  // make changes in account info
  return cb(null, account);
};
```

Supporting advanced scenarios like this that require custom programming models, DSLs, and more, is addressed in the [Middleware](#middleware) section.  
