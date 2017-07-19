## NPM Modules

Extend editor has support for helping you with NPM modules. You will be able to add, remove or edit modules from your webtask.

### Adding a module

First thing is to go to `tools/NPM modules`. Once you click there, NPM modules panel will be opened.

![](https://user-images.githubusercontent.com/302314/28381504-7fd1d0ec-6c91-11e7-8d0b-6cd4a1e92115.png)

Then click on `Add module`, the searh modal will be opened. Here you will be able to navigate over all the existing modules at [NPM](http://npmjs.com/).

![](https://user-images.githubusercontent.com/302314/28381503-7fcc43b6-6c91-11e7-91da-63d28032f442.png)

Finally, click on the module you want to add. You will see that the module/version will be automatically added to the panel.

![](https://user-images.githubusercontent.com/302314/28381505-7fd43094-6c91-11e7-99b0-dbc11c92b48e.png)

**Note**: As you might notice when you add a new module the editor shows the webtask as dirty. This is because the dependecies are only saved when the webtask is saved.

### Editing a module 

Once a module is added, you will be able to edit its version by clicking on the edit icon. As you will see, a popup with all the installed version of the module will appear. After selecting the version you want, click on `save` for updating the version at the panel.

![](https://user-images.githubusercontent.com/302314/28381507-7fdb93fc-6c91-11e7-8fb0-d5cc784a1d7e.png)

**Note**: The module version will be effectively updated once the webtask is saved.

### Removing a module

You are able to remove modules by clicking on the remove icon at the NPM Modules panel. Once you click on the icon, a confirmation will be displayed. If you want to proceed click on `yes`.

![](https://user-images.githubusercontent.com/302314/28381506-7fd513e2-6c91-11e7-92d7-69de66499697.png)

**Note**: The module will be effectively removed once the webtask is saved.


### Provisioning new modules

You are able to provision new modules to the Webtask platform by just searching them. When a module does not exists in the platform you will see an spinner right next to the module name. See below:

![](https://user-images.githubusercontent.com/302314/28381508-7feb2826-6c91-11e7-9c82-f1e9972d76c4.png)

If you try to save the webtask while a module is being provisioned, you will be warn about that if the module is not provisioned the webtask can fail in runtime. You have the option to continue and save changes anyways.

![](https://user-images.githubusercontent.com/302314/28381509-7ffdfd8e-6c91-11e7-82d2-c8419df7795c.png)
