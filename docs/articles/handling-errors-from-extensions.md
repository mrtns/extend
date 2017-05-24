---
title:  Handling Errors from Extensions
layout: page
root: true
permalink: docs/handling-errors-from-extensions
--- 
# Handling Errors from Extensions

Successful execution of an extension typically results in a HTTP 200 response with extension-specific payload in the response body. If you receive a non-200 response, the following information will guide you in understanding the error condition. 

All responses from calling extension URLs contain the `x-wt-response-source` HTTP header. It indicates the component of the Auth0 Extend stack that generated the response. Given this information, the response status code, and the response payload, you can decide how to handle it. These are the possible values of `x-wt-response-source`: 

* **webtask**: the response was generated as a result of executing the code of the extension. You will see this value when the extension completed successfuly but also when it returned an error object through the callback function, or the code of the extension generated an uncaught exception. You can differentiate between success and failure using the status code of the response and the content of the response body. 

* **compiler**: the code of the extension could not be compiled. The most likely cause is a syntax error in the code. In those cases the body of the response contains more information about the location of the error. 

* **proxy**, **network**: these uncommon values indicate an error that occured in Auth0 Extend infrastructure before the execution of the extension code. Typically there will be more details in the body of the response. 

Below are the most common cases of responses you will see. 

{::options parse_block_html="true" /}

{% include include-layout.html src="docs/handling-errors-from-extensions/successfull-response.md" name="successfull-response" %}

{% include include-layout.html src="docs/handling-errors-from-extensions/application-level-error.md" name="application-level-error" %}

{% include include-layout.html src="docs/handling-errors-from-extensions/application-level-error-with-custom-status-code.md" name="application-level-error-with-custom-status-code" %}

{% include include-layout.html src="docs/handling-errors-from-extensions/syntax-error-in-extension-code.md" name="syntax-error-in-extension-code" %}

{% include include-layout.html src="docs/handling-errors-from-extensions/uncaught-synchronous-exception-in-extension-code.md" name="uncaught-synchronous-exception-in-extension-code" %}

{% include include-layout.html src="docs/handling-errors-from-extensions/uncaught-asynchronous-exception-in-extension-code.md" name="uncaught-asynchronous-exception-in-extension-code" %}
 
{::options parse_block_html="false" /}

{% include feedback.html src="handling-errors-from-extensions" %}