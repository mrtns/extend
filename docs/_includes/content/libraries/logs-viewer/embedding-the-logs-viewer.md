## Embedding the Logs Viewer

The logs viewer component is one of the parts of the Extend Editor. It provides an easy way to add a real-time logs viewer to your application.

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.auth0.com/auth0-extend/components/1/extend-editor-logs.js"></script>
</head>
<body>
  <div id="logs-viewer" style="height: 100%;">
  <script>
    ExtendEditorLogsComponent.show(document.getElementById('logs-viewer'), {
      token: '{webtask_token}'
    });
  </script>
</body>
</html>
```

The minimal configuration above will display the real-time logs viewer using all the default options:

![Logs viewer](https://cloud.githubusercontent.com/assets/302314/26527300/4aed909e-4367-11e7-983f-95d356a17c82.png)
