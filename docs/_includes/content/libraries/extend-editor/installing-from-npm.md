## Installing from NPM

If you already have a [React](https://reactjs.org/) application, you can just add our NPM module to your project by doing:

```sh
npm install extend-editor-react --save
```

### Usage

#### Configuration Options

| Name  | Type | Description | Default value |
| ------------- | ------------- |-------------|-------------|
| settings  | Object  | Extend Editor configuration object. For more info click [here](https://auth0.com/extend/docs/libraries/extend-editor#configuring-extend-editor). | - |
| libUrl | Integer | The Url to the Extend Editor library. | `https://cdn.auth0.com/auth0-extend/1/extend-editor.js` |
| on | Object | The handler for the Extend Editor events like `didWebtaskLoad`. | - |
| height | Integer | The heigh of the Extend Editor. | `450px` |
| width | Integer | The width of the Extend Editor. | `100%` |

#### Examples

Following, you'll find examples about how to use the different properties of the component.

##### Customizing the Editor

```javascript
import React from 'react';
import { Component } from 'react';
import ExtendEditor from 'extend-editor-react';

export default class MyApp extends Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <ExtendEditor
          settings= {{
            hostUrl: 'your-auth0-extend-deployment-url',
            token: 'ey...',
            webtaskName: 'empty-function',
            theme: 'light',
            allowSwitching: false
          }}
          height={500}
        />
      </div>
    );
  }
}
```

**Note**: For more information about settings click [here](https://auth0.com/extend/docs/libraries/extend-editor#configuring-extend-editor).

##### Attaching to events

```javascript
import React from 'react';
import { Component } from 'react';
import ExtendEditor from 'extend-editor-react';

export default class MyApp extends Component {
  onEditorDidSaveWebtask(data) {
    console.log(data);
  }

  onEditorError(data) {
    console.log(data);
  }

  render() {
    return (
      <div>
        <h1>My App</h1>
        <ExtendEditor
          settings= {{
            hostUrl: 'your-auth0-extend-deployment-url',
            token: 'ey...'
          }}
          on={{
            didSaveWebtask: this.onEditorDidSaveWebtask,
            error: this.onEditorError
          }}
        />
      </div>
    );
  }
}
```