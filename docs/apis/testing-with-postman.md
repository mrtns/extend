---
title:  Testing with Postman
layout: apis
root: true
permalink: docs/api/testing-with-postman
--- 
# Using the Webtask API with our Postman Collection

## Installing the Collection

To install the Postman Collection you will need to have installed the Postman App for Windows, Mac or Chrome. You can download any of these from the [Postman Apps page](https://www.getpostman.com/apps).

Once you have Postman installed, go to `Import` menu and select `Import from link`. Then, paste the following url:

```
{{ "assets/webtask-collection.json" | absolute_url}}
```

![]({{ "assets/img/postman-import.png" | absolute_url}})

After clicking on `Import`, Postman will open the collection.

![]({{ "assets/img/postman-collection.png" | absolute_url}})

## Configuring the Postman Environment

The Webtask Postman collection make use of environment variables to customize the requests being sent. More information on managing Postman environments can be found at [Setting up an environment with variables](https://www.getpostman.com/docs/environments)

You will need to create an environment and configure the following variables:

* `webtask_container`: Should contain your webtask container, e.g. **my-containter**.
* `webtask_token`: Should contain the token needed when making calls to the Webtask API.
* `webtask_name`: Should contain the name of the webtask that you want to work with.

In the screenshot below you can see a Postman environment configured with both the `webtask_container`, `webtask_token` and `webtask_name` variables defined:

![]({{ "assets/img/postman-environment.png" | absolute_url}})

## Executing a request

Once the environment is configured, you can follow theses steps to execute an Webtask API method:

1. Select the environment you want to work with
2. Select the relevant API method in the collection folder
3. Click the send button

![]({{ "assets/img/postman-sample.png" | absolute_url}})

You man also optionally have to configure query parameters or the JSON method body, depending on the API call. For more information please refer to the [Sending Requests](https://www.getpostman.com/docs/requests) document on the Postman website.

## A word about storing tokens in Postman variables

We do need to point out that storing tokens in Postman as environment variables could pose a potential security risk.  If you are signed in to the Postman application it will automatically try and [synchronize some entities such as Collections and Environments with the Postman servers](https://www.getpostman.com/docs/sync_overview). This means that a token, which could allow someone else to gain access to your Management API, is leaving the privacy of your computer and uploaded Postman's servers.

It also has to be said that Postman has taken measures to ensure that this information is encrypted, and indeed encourages users to store this sort of information in Environment Variables. You can [read more about this on their website](https://www.getpostman.com/docs/security).

If you feel that this still poses too much of a risk for you, then you will need to sign out of Postman to ensure that environment variables are not synchronized.