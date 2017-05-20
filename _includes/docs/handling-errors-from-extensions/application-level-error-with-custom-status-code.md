## Application Level Error with Custom Status Code

An extension that explicitly returns an application error can override the default HTTP 400 status code with a custom status code value:

```javascript
module.exports = (ctx, cb) => {
  var error = new Error('Some error');
  error.statusCode = 401;
  cb(error);
};
```

Response: 

```
HTTP/1.1 401 Unauthorized
Content-type: application/json
x-wt-response-source: webtask

{
  "code": 401,
  "error": "Script returned an error.",
  "details": "Error: Some error",
  "name": "Error",
  "message": "Some error",
  "stack": "..."
}
```