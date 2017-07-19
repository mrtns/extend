## NPM Modules

The Auth0 Extend editor allows you to easily manage the list of NPM modules that your code depends upon. You can add, edit or remove NPM module dependencies by clicking on the tools icon in the editor toolbar and then selecting the NPM Modules option to open the NPM Modules panel.

![](https://user-images.githubusercontent.com/302314/28381504-7fd1d0ec-6c91-11e7-8d0b-6cd4a1e92115.png)

### Adding a module

With the NPM Modules panel open, click on the Add Module link to launch the search dialogue box. You can then search for and select any NPM module from the public [NPM](http://npmjs.com/) repository.

![](https://user-images.githubusercontent.com/302314/28381503-7fcc43b6-6c91-11e7-91da-63d28032f442.png)

After selecting an NPM module, you will notice that the NPM module name and version will be automatically added to the list of dependencies in the NPM Modules panel.

![](https://user-images.githubusercontent.com/302314/28381505-7fd43094-6c91-11e7-99b0-dbc11c92b48e.png)

**Note**: After adding a new module the editor may show the webtask as dirty. This is because the dependencies are only saved when the webtask is saved.

### Editing a module 

If you have already added an NPM module as a dependency, you can select a different version of the module. Click on the edit icon next to the NPM module entry to launch a dialog box that lists all of the available versions of that given NPM module. After selecting the new version of the module, click on the save button to update the module version.

![](https://user-images.githubusercontent.com/302314/28381507-7fdb93fc-6c91-11e7-8fb0-d5cc784a1d7e.png)

**Note**: The module version is only updated when the webtask is saved.

### Removing a module

To remove an NPM module that was previously added as a dependency, click on the delete icon next to the NPM module entry. A dialogue box will ask you to confirm that you want to remove that given module from the list of dependencies. Click 'yes' to remove the NPM module.

![](https://user-images.githubusercontent.com/302314/28381506-7fd513e2-6c91-11e7-92d7-69de66499697.png)

**Note**: The module is removed when the webtask is saved.
