## Image customization

All extensions in an Auth0 Extend installation execute in a uniform execution environment. The environment includes built-in support for over [1000 most popular Node.js modules](https://tehsis.github.io/webtaskio-canirequire/). In cases when you need to add modules outside of that list, modules from private NPM repository, or custom native components, you can use the image customization feature. Please [contact support](#support) with questions. 

Image customization allows you to add custom components on top of a base Docker image we provide, and use the new Docker image as the execution environment for your extensions. The process involves the following steps: 

1. Auth0 provides you with access to an AWS ECR repository from which you can obtain the base Docker image (currently based on Ubuntu 16.04). 

2. You customize the image by creating a derived Docker image with additional components and modules.

3. You push the new image to another AWS ECR repository Auth0 provides you access to. 

4. Auth0 performs a set of validations on your new image to ensure integrity and puts it in production in your installation. This process does not involve any downtime. 

Please [contact support](#support) if you are interesting in exploring this option. 