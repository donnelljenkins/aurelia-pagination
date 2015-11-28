# aurelia-pagination
A pagination plugin for Aurelia.

```html
<pagination page-size="3" page-block-size="10" model.bind="listViewModel"></pagination>
```

## Live Demo
> Coming soon.

## Documentation
- [Installation](https://github.com/donnelljenkins/aurelia-pagination/blob/master/doc/HOWTO.md#installation)
- [Getting started](https://github.com/donnelljenkins/aurelia-pagination/blob/master/doc/HOWTO.md#getting-started)
  - [aurelia-datagrid](https://github.com/donnelljenkins/aurelia-pagination/blob/master/doc/HOWTO.md#aurelia-datagrid)
  - [Other Components](https://github.com/donnelljenkins/aurelia-pagination/blob/master/doc/HOWTO.md#other-components)
- [Pagination](https://github.com/donnelljenkins/aurelia-pagination/blob/master/doc/HOWTO.md#pagination)

## Dependencies

* [aurelia-binding](https://github.com/aurelia/binding)
* [aurelia-templating](https://github.com/aurelia/templating)
* [bootstrap**](http://getbootstrap.com/)

## Used By

This library is not used by Aurelia. It is an optional plugin.

## Platform Support

This library can be used in the **browser**.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in four module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.
