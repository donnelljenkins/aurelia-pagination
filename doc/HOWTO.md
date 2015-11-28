# Example

```html
<pagination page-size="3" page-block-size="10" model.bind="listViewModel"></pagination>
```

# Installation

## Prerequisite
- [Aurelia](http://aurelia.io/) is installed.

## Install via JSPM

1.  Ensure that [JSPM](http://jspm.io/) is installed.
2.  From your project folder, execute the following command:

```shell
jspm install github:donnelljenkins/aurelia-pagination
```

### Migrate from aurelia-app to aurelia-app="main"
You'll need to register the plugin when your aurelia app is bootstrapping. If you have an aurelia app because you cloned a sample, there's a good chance that the app is bootstrapping based on default conventions. In that case, open your **index.html** file and look at the *body* tag.

``` html
<body aurelia-app>
```
Change the *aurelia-app* attribute to *aurelia-app="main"*.

``` html
<body aurelia-app="main">
```
The aurelia framework will now bootstrap the application by looking for your **main.js** file and executing the exported *configure* method. Go ahead and add a new **main.js** file with these contents:

``` javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(a => a.setRoot('app', document.body));
}

```

### Load the plugin
During bootstrapping phase, you can now include the pagination plugin:

```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

    // import the plugin
    .plugin('donnelljenkins/aurelia-pagination');
  ...
}
```

# Getting started

## aurelia-datagrid
- Notes
  - aurelia-datagrid@0.1.5 and later is setup to work with the pagination 'out of the box'.  
  - Earlier versions can be setup using a similar setup as [Custom Components](https://github.com/donnelljenkins/aurelia-pagination/blob/master/doc/HOWTO.md#other-components).

If you have not already, setup your app using the instructions from the <a href="http://aurelia.io/docs.html#/aurelia/framework/latest/doc/article/getting-started" target="_blank">Getting Started<a> page on Aurelia.

Once your app is set up, install and setup the aurelia-datagrid using the instructions <a href="https://github.com/donnelljenkins/aurelia-datagrid/blob/master/doc/HOWTO.md#getting-started" target="_blank">here</a>.

After setting up and installing this plugin, we'll create a simple working example by doing the following:
- Add the plugin to the aurelia-data grid in HTML.
- Add more items to the **tools** list on the products page.
- Configure the plugin to show 5 items per page.
- Configure the plugin to show page blocks of 10.

### Add the plugin to the aurelia-data grid in HTML.
In the **products.html** file, add the **grid-footer-template** template section to the aurelia-datagrid.
```html
<template replace-part="grid-footer-template">
</template>
```

Next, add the pagination component to the **grid-footer-template**:
```html
<td colspan.bind="columns.length">
  <pagination></pagination>
</td>
```
The grid should now look like this:
```html
<grid data-source="tools">
  <template replace-part="grid-template">
    <grid-column property="name" filterable sortable></grid-column>
    <grid-column-checkbox property="active" filterable sortable></grid-column-checkbox>
    <grid-column property="price"></grid-column>
  </template>
  
  <template replace-part="grid-footer-template">
    <pagination></pagination>
  </template>
</grid>
```

### Add more items to the **tools** list on the products page.
Now, let's add items to the tools list so we can see the pagination component in action. In the **products.js** file, add a constructor method with the following code:
```javascript
constructor() {
  for (let i = 0; i < 300; i++) {
    this.products.push({ category: 'Tool', code: 'T' + i, name: 'Tool #' + i, active: true, price: i + '.99' });
  }
}
```
This adds 300 more items to the tools list.

Run the app and the grid now has 31 pages with 10 items per page.

### Configure the plugin to show 5 items per page.
By default, the **pagination** component's initial page size is 10.  Let's configure it to show 5 items per page instead.

In the **products.html** file, add the following attribute to the pagination component:
```html
page-size="5"
```

```html
<pagination page-size="5"></pagination>
```
That's it! Refresh the app and now there are 61 pages with 5 items per page.

### Configure the plugin to show page blocks of 10.
Notice all 61 pages are shown and because there are so many, the pages wrap and take up a lot of real estate.  Let's configure the component to only show 10 blocks of pages at a time to save space.

In the **products.html** file, add the following attribute to the pagination component:
```html
page-block-size="10"
```

```html
<pagination page-size="5" page-block-size="10"></pagination>
```

Refresh the app and now only 10 pages show at time.

## Custom Components

### aurelia-datagrid@0.1.4
> Coming soon.

### Others
> Coming soon.
