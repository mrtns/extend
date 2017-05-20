## Application Level Error

An extension that explicitly returns an application error:  

```javascript
module.exports = (ctx, cb) => {
  cb(new Error('Some error'));
};
```

The response you will see when calling this extension is: 

```
HTTP/1.1 400 Bad Request
Content-type: application/json
x-wt-response-source: webtask

{
  "code": 400,
  "error": "Script returned an error.",
  "details": "Error: Some error",
  "name": "Error",
  "message": "Some error",
  "stack": "..."
}

```