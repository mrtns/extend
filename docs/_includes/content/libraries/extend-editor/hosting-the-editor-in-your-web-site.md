#### Hosting the Editor in Your Web Site

Extend Editor can be hosted within your own web site and customized to provide your users with the most streamlined, built-in experience. Extend Editor can be added with just a few lines of script: 

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.auth0.com/auth0-extend/1/extend-editor.js"></script>
</head>
<body>
  <div id="extend-editor" style="height: 400px; width: 600px"></div>
  <script>
    ExtendEditor.create(document.getElementById('extend-editor'), {
      hostUrl: '{host_url}',
      webtaskContainer: '{webtask_container}',
      token: '{webtask_token}',
      webtaskName: 'webtask-sample'
    });
  </script>
</body>
</html>
```

In the typical situation, the Extend Editor would be presented to an authenticated user from the administration section of your web site, and the **{webtask_container}** and **{webtask_token}** would be specific to the tenant in your system they are managing. In a more general case, the **{host_url}**, **{webtask_container}**, and **{webtask_token}** are specific to the [selected isolation scope](#mapping-isolation-requirements-onto-webtask-tokens). 

[See Express handler that renders the page with Extend Editor](https://github.com/auth0/extend/blob/master/samples/zerocrm/routes/index.js#L22).  
[See how the Extend Editor is embedded in the settings page](https://github.com/auth0/extend/blob/master/samples/zerocrm/views/settings.ejs#L86).  

**NOTE** When experimenting with the code snippet above, you can use the same parameters as you use for running the [sample application](#sample-application). However, remember to never disclose your {master_webtask_token} to customers. 

The minimal configuration above will display the Extend Editor using all the default options:

![Default Extend Editor](https://cloud.githubusercontent.com/assets/302314/26526687/e34688aa-4358-11e7-8f17-9f3f222e3541.png)
