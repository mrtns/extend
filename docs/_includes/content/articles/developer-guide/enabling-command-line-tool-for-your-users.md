## Enabling Command Line Tool for Your Users

Auth0 Extend comes with a command line tool [wt-cli](https://webtask.io/docs/wt-cli) that allows for creating and managing webtasks, access to real-time logs from an Auth0 Extend installation, and more. This is a low level tool targeting more sophisticated users (developers and administrators). To use the tool effectively for managing extensions requires your users to have a similar level of understanding of key concepts as presented in this guide. 

If you choose to enable your users to use wt-cli, you will need to provide them with instructions for setting up a wt-cli profile specific to the tenant they are allowed to manage. The wt-cli profile is a concept that exists at the level of the wt-cli tool only: it is a combination of configuration paramaters that allows wt-cli to connect to the correct Auth0 Extend installation and invoke management APIs on it. A user of wt-cli can define several named profiles, and select the profile to use when invoking individual commands. A profile consists of: 

* **host_url**: the HTTPS URL for your Auth0 Extend instance. 

* **webtask_token**: this should be the tenant webtask token you have created to allow management of extensions at tenant scope. **NOTE** never disclose your master webtask token to your users. 

* **webtask_container**: this should be the webtask container name you assigned to the specific tenant - the same container name the tenant webtask token is authorized to perform management operations on. 

As you can see, the profile your users will need to set up is tenant-specific. The command your users need to run to set up that profile after installing wt-cli looks like this: 

```bash
wt init -p {profile-name} \
  --url {host_url} \
  --token {tenant_webtask_token} \
  --container {webtask_container}
```

If the configured **{profile-name}** is `makaron`, your users would then be able to create a hypothetical on-new-lead extensions with: 

```
EXTENSION_SECRET=$(openssl rand 32 -hex)
wt create on-new-lead.js -p makaraon \
  --secret auth0-extension-secret=$EXTENSION_SECRET \
  --meta auth0-extension-secret=$EXTENSION_SECRET \
  --meta auth0-extension-type=on-new-lead \
  --meta wt-compiler=auth0-ext-compilers/generic
```

The example above corresponds to the management API call to [pre-create an extension](#creating-extensions). 

The wt-cli is [open source and available on GitHub](https://github.com/auth0/wt-cli). You can use it as an inspiration and basis for a higher level command line tool that is specific to your platform, similarly to what we have done to support managing [Auth0 Hooks](https://auth0.com/docs/hooks/cli) in the Auth0 Identity platform [here](https://github.com/auth0/wt-cli/blob/master/bin/auth0). 