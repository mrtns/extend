#### Using Extend Editor as a Stand Alone Web App

You can run the Extend Editor as a stand alone web application instead of embedding it within your web site. Hosted version of the Extend Editor is already part of your Auth0 Extend installation, and you can provide individual [configuration parameters]() within the URL itself as follows: 

```
{host_url}/edit/{webtask_container}#webtaskName={webtask_name}&token={webtask_token}&...
```

The **{host_url}**, **{webtask_container}**, **{webtask_token}**, and **{webtask_name}** parameters are the same as you would otherwise specify when [hosting the editor in your web site](#hosting-extend-editor-in-your-web-site). You can specify any other parameters of the configuration object as corresponding params of the URL hash. 

**NOTE** The URL contains the webtask token in the hash params, and as such care must be taken when sharing this URL. There is nothing that would prevent a security-unaware user from passing this URL around and therefore disclosing their webtask token. 