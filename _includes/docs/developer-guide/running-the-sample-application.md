## Running the sample application

The ZeroCRM sample application at [auth0/extend](https://github.com/auth0/extend) is a working example of integrating Auth0 Extend into a hypothetical CRM system. As different integration aspects are discussed in this guide, you will see references to specific locations in the source code that demonstrate implementation details. 

![ZeroCRM](https://cloud.githubusercontent.com/assets/302314/24642275/29822bee-18bb-11e7-943d-2aa9d5b272b1.png)

To run the ZeroCRM application you will need the following configuration details: 

* **{host_url}**: The HTTPS URL for your Auth0 Extend instance. 
* **{master_webtask_token}**. This is the main webtask token you were provided with to manage your installation. 
* **{webtask_container}**. This is the main webtask container. 

If you are an existing Auth0 Extend customer, you were provided these as part of the onboarding process. If you are new to Auth0 Extend and want to try it out for free, you can get these parameters from the [Try Auth0 Extend](https://auth0.com/extend/try) page. 

To install the application, run the following: 

```bash
git clone https://github.com/auth0/extend.git
cd extend/samples/zerocrm
npm i
cat > .env <<EOF
MASTER_WEBTASK_TOKEN={master_webtask_token}
HOST_URL={host_url}
WEBTASK_CONTAINER={webtask_container}
ZEROCRM_TENANT={webtask_container}
EOF
```

Auth0 Extend has been designed to support code-based extensibility in multi-tenant systems. Normally the concept of a tenant is implied from the authentication context. For the sake of simplicity, the ZeroCRM sample application assumes the tenant name will be provided via an environment variable when you start the application. This can be provided by modifying the local .env file you create above and overriding `ZEROCRM_TENANT` with the tenant name. 

```bash
ZEROCRM_TENANT=tenant1
```

**NOTE** if you are using the [free trial of Auth0 Extend](https://auth0.com/extend/try), your account is **single-tenant** and cannot be used with arbitrary tenant names. In this case, please leave the ZEROCRM_TENANT environment variable set to the default value.

#### Walkthrough ####
Here is a quick walkthrough of using ZeroCRM.

* Run the app with the command: `DEBUG=zerocrm npm start`
* Open your browser to `http://localhost:3000`. You'll see a screen for creating leads.

<kbd>
  <img src="https://cloud.githubusercontent.com/assets/141124/24431998/1972e72a-13d4-11e7-832e-f37f1fcf64c4.png">
</kbd>

* Enter the name `Customer` and put the value `5000`. 
* Click `Create Lead` and you'll notice that a JSON result is returned showing the lead has been created.

<kbd>
  <img src="https://cloud.githubusercontent.com/assets/141124/24432002/22b281e2-13d4-11e7-8707-83b82afca115.png">
</kbd>

* Zero CRM uses Auth0 Extend to execute custom user actions on creation of the lead. The `Settings` screen is where you do this configuration. 
* Right click on the 'Settings` link and open it in a new tab.

<kbd>
  <img src="https://cloud.githubusercontent.com/assets/141124/24432017/32a5895a-13d4-11e7-8667-699cafd707ec.png">
</kbd>

* Click on the `Edit` button for `On new lead`. You will see the `Extend Editor` appear with the following code:

```javascript
// This code will execute whenever a new lead is created.
// Use 1000+ Node.js modules here. 

module.exports = function(ctx, cb) {
  console.log('On new lead:', ctx.body);
  
  var lead = ctx.body;
  
  if (lead.value > 1000) {
    // Send e-mail to manager
    // ...
  }

  // lead.profile = getProfileFromFullContact(lead.email);
  lead.profile = {
    vip: true,
    comment: 'This was added by custom code'
  };
 
  // return the newly created lead
  cb(null, lead);
};
```

The code for the action was created on "Edit" for illustration, in a real system you would likely have a different default template. This code first writes out to the console when a new lead is created. It then checks to see if the lead value is greater than $1000 and has a placeholder for sending an email. Finally, it tacks on additional profile information to the returned lead.  

Before continuing, click the "Logs" button second from the right in the upper toolbar. 

<kbd>
  <img src="https://cloud.githubusercontent.com/assets/141124/24432055/6d88ce74-13d4-11e7-8b12-c9a0369116c8.png">
</kbd>
<br><br>

This will allow you to view real time logs as the action is invoked.

* Go back to the "Leads" tab and hit `Create New Lead` again.
* This time after the lead is created, you will see the profile information which has been appended.

<kbd>
  <img src="https://cloud.githubusercontent.com/assets/141124/24432229/90e01804-13d5-11e7-843b-f2bb83dc6480.png">
</kbd>

* Go back to the "Settings" tab.
* You'll see that the log shows that your new lead was created.

<kbd>
  <img src="https://cloud.githubusercontent.com/assets/141124/24432235/9a2e5b5a-13d5-11e7-8c8e-017732f00451.png">
</kbd>

<br><br>

This is just the beginning of what is possible with Auth0 Extend! You'll learn much more throughout the rest of the Extend User's Guide.
