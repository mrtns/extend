## Discovering Extensions

There are at least two situations in which you need to determine if a specific tenant in your system has an existing extension of a specific extensibility point: 

* at runtime, when you need to [invoke the extension](#invoking-extensions),
* at development time, to determine if the extension [needs to be pre-created](#creating-extensions) before you redirect your user to the Auth0 Extend editor.

The same [GET /api/webtask/{container}](https://webtask.io/docs/webtask_list) Auth0 Extend management API can be used in both cases. The API allows you to list all extensions that exist in a specific webtask container, and allows you to optionally specify further filtering criteria. You can use this capability to filter the list down to extensions with a specific value of the *auth0-extension-type* metadata property that stores the name of the extensibility point in your system. 

To find out all extensions defined in a specific webtask container (i.e. for a particular tenant), issue: 

```bash
GET {host_url}/api/webtask/{webtask_container}
Authorization: Bearer {tenant_webtask_token}
```

To find out all extensions associated with a specific extensibility point in your platform, issue:

```bash
GET {host_url}/api/webtask/{webtask_container}?meta=auth0-extension-type:{extensibility_point_name}
Authorization: Bearer {tenant_webtask_token}
```

The following parameters must be provided in these call: 

* **{webtask_container}**: name of the webtask container associated with the isolation scope (e.g. tenant) as determined in [Mapping Isolation Requirements onto Webtask Tokens](#mapping-isolation-requirements-onto-webtask-tokens).  

* **{tenant_webtask_token}**: tenant-specific webtask token derived from the master webtask token as described in [Mapping Isolation Requirements onto Webtask Tokens](#mapping-isolation-requirements-onto-webtask-tokens).  

* **{extensibility_point_name}**: a unique name of this extensibility point type within your platform, e.g. "on-new-lead", you are interested if finding defined extensions for. You have specified this platform-specific identifier when [pre-creating the extension](#creating-extensions). 

A successful response to these API calls will contain a JSON array with objects representing matching extensions. For each extension, you will get: 

* **name**: the name of the webtask implementing this extension.

* **host_url**: the HTTPS URL for your Auth0 Extend instance.

* **meta**: an object representing all metadata properties of this webtask associated with it at creation time. 

[See browser discoverExtensions function](https://github.com/auth0/extend/blob/master/samples/zerocrm/public/javascripts/extend.js#L86).  
[See Node.js discoverExtensions function](https://github.com/auth0/extend/blob/master/samples/zerocrm/lib/extend.js#L57).  
