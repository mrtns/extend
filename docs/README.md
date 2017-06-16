# Auth0 Extend - Docs

Auth0 Extend docs have three main sections:

- Articles: all the information about the platform.
- API: a playground for Webtask API.
- Libraries: all the information about the SDKS, JS libraries, etc.

**WARNING:** Take into account that by pushing changes to `gh-pages` you are deploying to production.

## Running locally

1. Run `bundle install`.
2. Run `bundle exec jekyll serve`.
3. Navigate to `http://localhost:4000/extend/docs`.

## Articles

Below, you will find the structure of files for the articles. Basically, you have three folders:

- data: contains `articles.yml`, such files is being used for generating the sidebar menu.
- _includes/docs: contains a folder per each topic. Each folder contains all the `md` files that conforms a section in the topic.
- docs/articles: contains a `md` file per topic. Each file, includes the list of documents which are part of the main topic.

```
.
├── data
|   ├── articles.yml
├── _includes
|   ├── docs
|   |    ├── articles
|   |    |    ├── what-is-auth0-extend
|   |    |    |    ├── how-auth0-extend-helps-you.md
|   |    |    |    ├── platform-extensibility.md
|   |    |    |    ├── relationship-to-auth0-webtasks.md
├── docs
|   ├── articles
|   |   ├── what-is-auth0-extend.md
```

### How to add a new article

For adding a new article `my-article` with a section `my-article-section` you will have to do the following:

- Add an entry to `data/articles.yml`:

```yml
- title: Articles
  subcategories:
    - title: My article
      name: my-article
      href: /extend/docs/my-article
      items:
        - title: My article section
          href: "#my-article-section"
          name: my-article-section
```

- Create a new folder `my-article` at `_includes/docs/articles`.

- Create a new file `my-article-section.md` at `_includes/docs/articles/my-article`:

```
## My article section

Some text here...
```

- Create a new file `my-article.md` at `docs/articles`:

```md
---
title:  My article
layout: page
root: true
permalink: docs/my-article
--- 
# My article

Some text here...

{::options parse_block_html="true" /}

{% include include-layout.html src="docs/my-article/my-article-section.md" name="my-article-section" %}
 
{::options parse_block_html="false" /}

{% include feedback.html src="what-is-auth0-extend" %}
```

Note: `{% include feedback.html src="what-is-auth0-extend" %}` allows you to add the feedback widget.

![](https://cloud.githubusercontent.com/assets/302314/26772097/ccc4280c-4999-11e7-9928-76cbb7888df6.png)

## Libraries

The folder structure is pretty much the same as `articles` with some little changes.

- data: contains `libraries.yml`, such files is being used for generating the sidebar menu.
- _includes/docs/libraries: contains a folder per each topic. Each folder contains all the `md` files that conforms a section in the topic.
- docs/libraries: contains a `md` file per topic. Each file, includes the list of documents which are part of the main topic.

```
.
├── data
|   ├── libraries.yml
├── _includes
|   ├── docs
|   |    ├── libraries
|   |    |    ├── extend-editor
|   |    |    |    ├── configuring-extend-editor.md
|   |    |    |    ├── hosting-the-editor.md
|   |    |    |    ├── using-extend-editor-as-a-stand-alone-web-app.md
|   |    |    |    ├── playground.html
├── docs
|   ├── libraries
|   |   ├── extend-editor.md
```

### How to add a new library

For adding a new library `my-library` with a section `my-library-section` you will have to do the following:

- Add an entry to `data/libraries.yml`:

```yml
- title: Libraries
  subcategories:
    - title: My library
      name: my-library
      href: /extend/docs/libraries/my-library
      items:
        - title: My library section
          href: "#my-library-section"
          name: my-library-section
```

- Create a new folder `my-library` at `_includes/docs/libraries`.

- Create a new file `my-library-section.md` at `_includes/docs/libraries/my-library`:

```
## My library section

Some text here...
```

- Create a new file `my-library.md` at `docs/libraries`:

```md
---
title:  My library
layout: page
root: true
permalink: docs/libraries/my-library
--- 
# My library

Some text here...

{::options parse_block_html="true" /}

{% include include-layout.html src="docs/libraries/my-library/my-library-section.md" name="my-library-section" %}
 
{::options parse_block_html="false" /}

{% include feedback.html src="what-is-auth0-extend" %}
```

## API

The folder structure for API is the same as articles and libraries.

- data: contains `apis.yml`, such files is being used for generating the sidebar menu.
- _includes/docs/apis: contains an `html` file for each API operation. Such file will have a little description about the operation.
- docs/apis: contains a `md` file per topic. Each file, includes the list of documents which are part of the main topic.
- assets/api: contains an `yml` file ([Swagger Spec](http://swagger.io/specification/)) for each API operation.

```
.
├── data
|   ├── apis.yml
├── _includes
|   ├── docs
|   |    ├── apis
|   |    |    ├── webtask-cache.html
|   |    |    ├── webtask-creation.html
|   |    |    ├── webtask-listing.html
├── docs
|   ├── apis
|   |   ├── http-api.md
├── assets
|   ├── api
|   |   ├── webtask-cache.yml
|   |   ├── webtask-creation.yml
|   |   ├── webtask-listing.yml
```

### How to add a new API operation

For adding a new API operation `my-operation` you will have to do the following:

- Create a new file `my-operation.yml` at `assets/api`.

```yml
swagger: '2.0'
info:
  version: 1.0.0
  title: Webtask API

host: webtask.it.auth0.com

schemes:
- https

paths:
  /api/webtask/{webtask_container}/my-operation:
    get:
      description: Operation description
      produces:
      - application/json
      parameters:
      - in: path
        name: webtask_container
        description: Your webtask container
        required: true
        type: string       
      - in: header
        name: Authorization
        required: true
        description: Your webtask token
        type: string
      responses:
        200:
          description: Response code description
```

- Create a new file `my-operation.html` at `_includes/docs/apis`

```html
<p>Some description about my-operation.</p>
```

- Update `data/apis.yml` by adding your operation to the menu.

```yml
- title: API entries
  subcategories:
    - title: HTTP API
      name: http-api
      href: /extend/docs/api/http-api
      items:

        ...

        - title: My operation
          href: "#my-operation"
          name: my-operation

        ...          
```

- Update `docs/apis/http-api.md` by including your operation file.

```
---
title:  Overview
layout: apis
root: true
permalink: docs/api/http-api
--- 
## HTTP API

...

{% include swagger.html name="my-operation" %}

...
```

## What's next

- [ ] Create a Jekyll generator 