## Mapping Isolation Requirements onto Webtask Tokens

After you have [identified the desired isolation scope](#isolation-requirements) in your system, you can use the webtask containers along with webtask tokens as way of implementing support for it. 

At the high level, each isolation scope should be assigned a unique, single webtask container to create and execute extensions in. For each webtask container you will also use the master webtask token to create a unique, derived webtask token with permissions scoped down to just that webtask container. 

For illustration, let's assume your desired isolation scope is a tenant (a subscription or account in your multi-tenant system). Every tenant would then be assigned a unique webtask container name within which all their extensions will execute. Webtask container name can be either derived from the tenant name in your system, or a random, unique name can be used as long as you maintain the association between your notion of a tenant and that webtask container name in Auth0 Extend. 

Once the webtask container name for a given tenant is decided, you must use your master webtask token to create a tenant webtask token with permissions scoped down to allow managing only that single webtask container assigned to the tenant. The purpose of the tenant webtask token is to share it with your customer who owns specific tenant. They will use this token with Auth0 Extend editor, wt-cli, or HTTP management APIs of Auth0 Extend to manage their extensions. At the same time, the token does not provide them with permissions to manage extensions of other tenants. 

A convenient moment to create a tenant webtask token is during your own tenant provisioning process. Alternatively, you can implement lazy provisioning of tenant webtask tokens (e.g. only when a tenant chooses to add an extension to your system). Regardless when you create the tenant webtask token, you must then durably store the token alongside your tenant (e.g. in your "customers" database) to ensure that you use the same token for a particular tenant every time. 

The webtask management API to use to issue a tenant webtask token is [POST /api/tokens/issue](https://webtask.io/docs/api_issue). The call must be authorized with your master webtask token. The API allows you to specify a number of restrictions for the new token which are outlined in the documentation. The most important to specify is the `ten` restriction, which limits the management permissions of the new webtask token to the webtask container with a matching name: 

```bash
POST {host_url}/api/tokens/issue
Content-Type: application/json
Authorization: Bearer {master_webtask_token}

{
  "ten": "{webtask_container_name}"
}
```

The response to this API call contains the tenant webtask token in the body. Store it alongside your tenant information in your system for future use (or alongside whichever isolation scope you chose to use if other than tenant).

[See mapTenantToIsolationScope function](https://github.com/auth0/extend/blob/master/samples/zerocrm/lib/extend.js#L9).
