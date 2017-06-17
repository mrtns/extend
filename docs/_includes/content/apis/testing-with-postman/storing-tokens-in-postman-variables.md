## Storing tokens in Postman variables

We do need to point out that storing tokens in Postman as environment variables could pose a potential security risk.  If you are signed in to the Postman application it will automatically try and [synchronize some entities such as Collections and Environments with the Postman servers](https://www.getpostman.com/docs/sync_overview). This means that a token, which could allow someone else to gain access to your Management API, is leaving the privacy of your computer and uploaded Postman's servers.

It also has to be said that Postman has taken measures to ensure that this information is encrypted, and indeed encourages users to store this sort of information in Environment Variables. You can [read more about this on their website](https://www.getpostman.com/docs/security).

If you feel that this still poses too much of a risk for you, then you will need to sign out of Postman to ensure that environment variables are not synchronized.