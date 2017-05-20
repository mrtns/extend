## Syntax Error in Extension Code

An extension that cannot be compiled due to a syntax error:

```javascript
module.exports = (ctx, cb) => {
  random text
};
```

Response: 

```
HTTP/1.1 400 Bad Request
Content-type: application/json
x-wt-response-source: compiler

{
  "code": 400,
  "message": "Compilation failed: Unexpected identifier",
  "error": "Unexpected identifier",
  "stack": "SyntaxError: Unexpected identifier\n    at ...""
}
```