# Configuring Extend Editor

Several aspects of the Extend Editor can be controlled throught the options object passed to it on initialization:
```javascript
{
  "token": "string",
  "webtaskName": "string",
  "webtaskContainer": "string",
  "hostUrl": "string",
  "fullscreen": {
    "enabled": "boolean",
    "height": "string",
    "width": "string"
  },
  "createIfNotExists": {
    "enabled": "boolean",
    "category": "string"
  },
  "theme": "string",
  "header": {
    "enabled": "boolean",
    "links": "array"
  },
  "toolbar": {
    "enabled": "boolean",
    "displayName": "boolean"
  },
  "footer": {
    "enabled": "boolean",
    "displayWebtaskUrl": "boolean",
    "displayWebtaskWeight": "boolean",
    "allowCustomItems": "boolean"
  },
  "allowRenaming": "boolean",
  "allowDeleting": "boolean",
  "allowUpdating": "boolean",
  "allowCreating": "boolean",
  "allowSwitching": "boolean",
  "allowEditingSecrets": "boolean",
  "allowEditingMeta": "boolean",
  "allowEditingDependencies": "boolean",
  "allowAccessingLogs": "boolean",
  "allowEditingSchedule": "boolean",
  "allowSwitchingTemplates": "boolean",
  "allowCreatingFromTemplate": "boolean",
  "runner": {
    "enabled": "boolean",
    "expandLogs": "boolean",
    "methods": "array",
    "methodSelector": "boolean",
    "headersEditor": {
      "enabled": "boolean",
      "defaultHeaders": "object",
      "expand": "boolean"
    },
    "paramsEditor": {
      "enabled": "boolean",
      "defaultParams": "object",
      "expand": "boolean"
    },
    "bodyEditor": {
      "enabled": "boolean",
      "typeSelector": "boolean",
      "defaultType": "raw|form-data|x-www-form-urlencoded",
      "rawTypeOptions": {
        "enabled": "boolean",
        "defaultMode": "json|xml|text"
      },
      "expand": "boolean"
    },
    "explanation": "string"
  },
  "shortcuts": {
    "enabled": "boolean",
    "targetElement": "object"
  },
  "defaultEditor": "string",
  "allowHashParams": "boolean",
  "expand": {
    "left": "explorer|secrets|meta|dependencies|scheduler|templates",
    "right": "runner",
    "bottom": "logs"
  },
  "preventClosingWindowIfDirty": "boolean",
  "loader": {
    "enabled": "boolean",
    "messages": "array"
  },
  "integrations": {
    "enabled": "boolean",
    "github": "boolean"
  }
}
```

Last update: `6/30/2017`.