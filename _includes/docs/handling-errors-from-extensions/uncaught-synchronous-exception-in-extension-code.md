## Uncaught Synchronous Exception in Extension Code

An extension that generates an uncaught synchronous exception:

```javascript
module.exports = (ctx, cb) => {
  throw new Error('Some error');
};
```

Response:

```
HTTP/1.1 500 Internal Server Error
Content-type: application/json
x-wt-response-source: webtask

{
  "code": 500,
  "error": "Script generated an unhandled synchronous exception.",
  "details": "Error: Some error",
  "name": "Error",
  "message": "Some error",
  "stack": "..."
}
```