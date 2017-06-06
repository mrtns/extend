---
title:  Logs Viewer
layout: libraries
root: true
permalink: docs/libraries/logs-viewer
--- 
{% include sticky-title.html title="Logs viewer" %}

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

## Configuration Options

Option | Description
------------ | -------------
token | The webtask token the Logs viewer will use to authorize calls to Auth0 Extend management APIs. This token is specific to the [selected isolation scope](#mapping-isolation-requirements-onto-webtask-tokens). In the most common case it is a tenant webtask token. 
theme | The enumeration that allows you to customize the look & feel of the Logs viewer. We provide two themes to choose from out of the box: `light` and `dark`.
height | The height of the component.
filter | Determines how the logs viewer will filter the incoming log events. Example: ``^(new|finished)``.
onClose | This event will be called once the user closes the logs viewer.
onError | This event will be called if an error occurred with the connection between the logs viewer and the logs API.

{% include feedback.html src="libraries/sandboxjs" source="logs-viewer" %}