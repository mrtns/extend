## Identify Extensibility Points

Making your platform extensible starts with identifying the places within the product that your customers will be able to extend or customize. If you are already using web hooks today, you can reuse your list of web hooks as a starting point. 

Some examples of extensibility points in a hypothetical CRM system could be:

* new lead has been created, 
* account information was modified, 
* an e-mail must be composed before it is sent, 
* payment status must be verified.  

The first decision you need to make with respect to every extensibility point is about the call pattern it needs to support. Is this a one-way, asynchronous notification or do you expect a synchronous response that may alter further processing within your product? 

For example, creation of a new lead may generate a simple invocation of the extension that sends a Slack message or adjusts state of some external system. While this happens processing within your product can continue since it has no dependency on the outcome of extension execution:

<img src="https://cloud.githubusercontent.com/assets/822369/23878647/ee8ed444-0805-11e7-86f6-2e91e4861927.png" alt="Asynchronous extension" width="400"/>

In contrast, an extension that formats an e-mail body must complete execution and return the result to your product before processing can continue:

<img src="https://cloud.githubusercontent.com/assets/822369/23878665/04f5c6e8-0806-11e7-9cad-98949bdc03d3.png" alt="Synchronous extension" width="470"/>

The second design decision you need to make is related to the data format and schema for the data your product will sent to and accept as a response from each of the extensibility points. Auth0 Extend supports a high fidelity with the HTTP protocol and allows you full flexibility in deciding what data format to use. Having said that, vast majority or extensibility cases will be well served with JSON format of both the request and response, and JSON will be assumed for the rest of this guide.
