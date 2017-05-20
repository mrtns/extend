## Successful Response

An extension that returns a valid response can look like this: 

```javascript
module.exports = (ctx, cb) => {
  cb(null, { valid: 'response' });
};
```

The response you will see when calling this extension is: 

```
HTTP/1.1 200 OK
Content-type: application/json
x-wt-response-source: webtask

{"valid":"response"}
```