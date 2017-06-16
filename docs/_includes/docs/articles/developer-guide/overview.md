## Overview

There are to main areas to consider when integrating Auth0 Extend into your SaaS product: providing users of your product with extension authoring experience, and invoking the extensions at runtime. 

This guide starts off with extension execution considerations. At the high level, extension execution is very much like calling a web hook from within a product: all extensions are exposed as an HTTP endpoint with a protocol contract you define. Part of the integration process focuses on providing a usable programming model on top of the protocol, securing the extension endpoints to ensure they can only be called from within your product, and designing isolation scopes for code execution. 

The second part of this guide talks about providing users of your product with Auth0 Extend authoring experience of extensions. You will see how you can embed Webtask Editor into your site and customize its look & feel, and allow your users to use the wt-cli command line tool. 

Let's get started. 
