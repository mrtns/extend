## Creating Extensions

Before your users can edit extensions using Auth0 Extend editor, your platform must pre-create them on their behalf. This is typically done lazily: if a specific extension does not yet exist, your platform must create it immediately before launching the Auth0 Extend editor. You can check if a particular extension already exist by [discovering extensions](#discovering-extensions). 

Each extension is a webtask that has a name unique within the webtask container, consists of code, secrets, and metadata, and will be callable via HTTPS at a specic URL once created. As such, you must consider the following when pre-creating extensions for your users to edit:

1. **Name**. In simple cases, webtask name can act as an identifier of a specific extension type (e.g. "on-new-lead"). Your platform can quickly look up an extension for a specific extensibility point to edit or call based on that name and the webtask container name which is implied by the execution context (e.g. the current tenant). 

2. **Code**. What is the code of the newly created, "empty" extension? It is a good practice to define this code to have no side effects by default, and contain some minimal documentation in the form of comments that will get your users started when they edit it. For example: 

    ```javascript
    /**
    @param ctx.body - new lead information
    @param ctx.body.name - name of new lead
    */
    module.exports = function (ctx, cb) {
      var extra_info = {};
      // Add extra information to the lead entry:
      // extra_info.campaign = 'blog';
      return cb(null, extra_info);
    };
    ```

3. **Secrets**. Secrets are typically only needed when the extension code is accessing protected downstream resources. As such the initial list of secrets for an emtpy extension would not specify any application specific secrets. Your users will add them as needed, depending on what their code does. 

4. **Metadata**. Your platform may rely on metadata for several uses. They are covered in other sections of this guide as needed. Typically, when creating an "empty" extension you will want to add three metadata properties: 

    * One that is specific to your platform and declares what the type of the extension is (e.g. "on-new-lead"), which later allows you to search for this extension in order to execute it. **NOTE** as mentioned before, in simple cases, instead of using this metadata property, you can rely on a convention of naming the extensions in a way that implies their type.

    * Two properties that taken together enable the call to the extension URL to be authorized as originating from your platform. See below. 

5. **Authorization**. Once created, extension URLs are public. As such it is necessary to ensure that only calls originating from your platform are authorized to call the extension. There are many mechanisms that can be used to achieve this. One simple pattern relies on the extension code requiring that the request specifies a secret token that is only known to your platform and the extension itself. To facilitate this pattern, you must associate a special [middleware](#middleware) with the newly created extension. The middleware enforces the authorization decision without requiring any changes to the code your user writes. 

To create a webtask that implements an extension following all the considerations above, you can use the [PUT /api/webtask/{container}/{name}](https://webtask.io/docs/webtask_upsert) API as follows:

```bash
PUT /api/webtask/{webtask_container}/{webtask_name}
Content-Type: application/json
Authorization: Bearer {tenant_webtask_token}

{
  "code": "{code}",
  "secrets": {
    "auth0-extension-secret": "{secret}"
  },
  "meta": {
    "auth0-extension-secret": "{secret}",
    "auth0-extension-type": "{extensibility_point_name}",
    "wt-compiler": "auth0-ext-compilers/generic"
  }
}
```

The following parameters must be provided in this call: 

* **{webtask_container}**: name of the webtask container associated with the isolation scope (e.g. tenant) as determined in [Mapping Isolation Requirements onto Webtask Tokens](#mapping-isolation-requirements-onto-webtask-tokens).  

* **{webtask_name}**: the name of the webtask; in simple cases this uniquely identifies the extensibility point in your platform.  

* **{tenant_webtask_token}**: tenant-specific webtask token derived from the master webtask token as described in [Mapping Isolation Requirements onto Webtask Tokens](#mapping-isolation-requirements-onto-webtask-tokens).  

* **{code}**: the source code of the "empty" extension as described above.  

* **{secret}**: a randomly generated secret key that will be used for authorizing calls to the webtask. This should have enough entropy to act as a strong cryptographic key. This can for example be hex encoded 32 byte long array generated with a random number generator. Note the same value must be specified both in metadata and secrets. 

* **{extensibility_point_name}**: a unique name of this extensibility point type within your platform, e.g. "on-new-lead". Auth0 Extend does not require this property or associate any semantics with its value. Specifying it is part of a usage pattern that makes it convenient for you to later query and find all extensions defined by your users. 

* **wt_compiler**: this metadata property specifies a [webtask compiler](https://webtask.io/docs/webtask-compilers) the extension will use. The **auth0-ext-compilers/generic** compiler ([check the source code](https://github.com/auth0/auth0-ext-compilers/blob/master/lib/compilers/generic.js)) is part of the Auth0 Extend platform, and its purpose is to authorize all calls to this webtask by ensuring that the Bearer credential specified in the `Authorization` header of the request matches the value of the **auth0-extension-secret** secret. This means your platform will need to correctly formulate the `Authorization` header when making calls to execute extensions, which is explained in the [Invoking Extensions](#invoking-extensions) section. 

A successful response to this API call will contain the `Location` HTTP response header with the webtask URL of the extension. You can choose to store it in your database, but it is not necessary to later find out if the user defined an extension for a specific extensibilty point. Thanks to the metadata properties you associated with the extension above, you can use Auth0 Extend management APIs to discover defined extensions. 

[See ensureExtensionExists function](https://github.com/auth0/extend/blob/master/samples/zerocrm/public/javascripts/extend.js#L35).