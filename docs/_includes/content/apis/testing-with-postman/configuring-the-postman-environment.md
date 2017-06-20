## Configuring the Postman Environment

The Webtask Postman collection make use of environment variables to customize the requests being sent. More information on managing Postman environments can be found at [Setting up an environment with variables](https://www.getpostman.com/docs/environments)

You will need to create an environment and configure the following variables:

* `webtask_container`: Should contain your webtask container, e.g. **my-containter**.
* `webtask_token`: Should contain the token needed when making calls to the Webtask API.
* `webtask_name`: Should contain the name of the webtask that you want to work with.

In the screenshot below you can see a Postman environment configured with both the `webtask_container`, `webtask_token` and `webtask_name` variables defined:

![](../assets/img/postman-environment.png)