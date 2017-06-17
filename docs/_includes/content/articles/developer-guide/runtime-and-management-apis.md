## Runtime and Management APIs 

Auth0 Extend exposes the following APIs for Runtime and Management.

* [Run](https://webtask.io/docs/api_run) - Used for executing dynamic and named Webtasks
* Webtask - Used for creating and managing named Webtasks 
  * [Create or update a webtask](https://webtask.io/docs/webtask_upsert) 
  * [List webtasks](https://webtask.io/docs/webtask_list)
  * [Delete webtasks](https://webtask.io/docs/webtask_delete)
* [Storage](https://webtask.io/docs/webtask_storage) - Used for setting and getting Webtask storage.
* [Cache](https://webtask.io/docs/webtask_cache) - Stores pre-compiled artifacts for the task
* Tokens - Used for creating and managing Webtask tokens
  * [Token Issuance](https://webtask.io/docs/api_issue) - Issue new tokens
  * [Token Revocation](https://webtask.io/docs/api_revoke) - Revoke an existing tokens
  * [Token Inspection](https://webtask.io/docs/api_inspect) - Inspect the contents of a token
* [Limits](https://webtask.io/docs/api_limits) - Used for querying and resetting token rate limits
* [Logs](https://webtask.io/docs/api_logs) - Used for accessing real-time logs