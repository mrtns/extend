## Configuration Options

Option | Description
------------ | -------------
token | The webtask token the Logs viewer will use to authorize calls to Auth0 Extend management APIs. This token is specific to the [selected isolation scope](#mapping-isolation-requirements-onto-webtask-tokens). In the most common case it is a tenant webtask token. 
theme | The enumeration that allows you to customize the look & feel of the Logs viewer. We provide two themes to choose from out of the box: `light` and `dark`.
height | The height of the component.
filter | Determines how the logs viewer will filter the incoming log events. Example: ``^(new|finished)``.
onClose | This event will be called once the user closes the logs viewer.
onError | This event will be called if an error occurred with the connection between the logs viewer and the logs API.
