System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(aurelia) {
    aurelia.globalResources('./pagination/pagination');
  }

  return {
    setters: [],
    execute: function () {}
  };
});