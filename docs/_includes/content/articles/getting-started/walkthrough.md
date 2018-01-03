## Walkthrough
Here is a quick walkthrough of using ZeroCRM.

* Run the app with the following command: 
  * MacOS or Linux: `DEBUG=zerocrm npm start`
  * Windows: `set DEBUG=zerocrm & npm start`
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
