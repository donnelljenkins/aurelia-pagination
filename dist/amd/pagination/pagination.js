define(['exports', 'aurelia-binding', 'aurelia-templating'], function (exports, _aureliaBinding, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  var Pagination = (function () {
    var _instanceInitializers = {};

    function Pagination() {
      var _this = this;

      _classCallCheck(this, Pagination);

      _defineDecoratedPropertyDescriptor(this, 'currentPage', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'model', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'pageBlockSize', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'pages', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'pageSize', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'refineData', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'refresh', _instanceInitializers);

      this.currentBlockStartPageIndex = 0;
      this.isDataRefiner = true;

      this.onRefineData = function (data) {
        return new Promise(function (resolve) {
          var currentPageData = _this.applyPaging(data);
          resolve(currentPageData);
        });
      };

      this.applyPaging = function (data) {
        _this.isRefining = true;
        var pageSize = parseInt(_this.pageSize, 10);
        _this.pages = Math.ceil(data.length / pageSize);
        _this.currentPage = _this.minimumAllowedPage(_this.currentPage, _this.pages);
        _this.updatePaging();
        var start = (_this.currentPage - 1) * pageSize;
        var end = start + pageSize;
        var currentPageData = data.slice(start, end);

        _this.isRefining = false;
        return currentPageData;
      };
    }

    _createDecoratedClass(Pagination, [{
      key: 'bind',
      value: function bind(bindingContext) {
        this.model = this.model || bindingContext;
        if (this.refineData !== 'false' && this.model.addDataRefiner) {
          this.model.addDataRefiner(this.onRefineData);
        } else {
          this.onRefresh();
        }
      }
    }, {
      key: 'minimumAllowedPage',
      value: function minimumAllowedPage(a, b) {
        var page = Math.min(a, b);
        return Math.max(page, 1);
      }
    }, {
      key: 'updatePaging',
      value: function updatePaging() {
        this.updatePageBlocks();
        this.updateVisibility();
      }
    }, {
      key: 'updatePageBlocks',
      value: function updatePageBlocks() {
        var pageBlockSize = parseInt(this.pageBlockSize || this.pages, 10);
        var blockIndex = undefined;
        if (!this.currentPage || !pageBlockSize) {
          blockIndex = 0;
        } else {
          blockIndex = Math.ceil(this.currentPage / pageBlockSize) - 1;
        }

        if (blockIndex) {
          this.currentBlockStartPageIndex = blockIndex * pageBlockSize + 1;
        } else {
          this.currentBlockStartPageIndex = 1;
        }
        this.numberOfVisiblePages = this.minimumAllowedPage(pageBlockSize, this.pages - this.currentBlockStartPageIndex + 1);
      }
    }, {
      key: 'updateVisibility',
      value: function updateVisibility() {
        var pageSize = parseInt(this.pageSize, 10);
        this.showFirst = this.currentBlockStartPageIndex > 1;
        this.showLast = this.pageBlockSize && this.currentBlockStartPageIndex + pageSize < this.pages;
      }
    }, {
      key: 'onRefresh',
      value: function onRefresh() {
        if (this.refresh) {
          this.refresh();
        } else if (this.model.refresh) {
          this.model.refresh();
        } else {
          throw new Error(this.model.constructor.name + ' does not contain a \'refresh\' function.');
        }
      }
    }, {
      key: 'goToPage',
      value: function goToPage(page) {
        if (page > 0) {
          this.currentPage = page;
          this.onRefresh();
        }
      }
    }, {
      key: 'currentPageChanged',
      value: function currentPageChanged() {
        if (!this.isRefining) {
          this.updatePaging();
        }
      }
    }, {
      key: 'pagesChanged',
      value: function pagesChanged() {
        if (!this.isRefining) {
          this.updatePaging();
        }
      }
    }, {
      key: 'currentPage',
      decorators: [(0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay })],
      initializer: function initializer() {
        return 1;
      },
      enumerable: true
    }, {
      key: 'model',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }, {
      key: 'pageBlockSize',
      decorators: [_aureliaTemplating.bindable],
      initializer: function initializer() {
        return 0;
      },
      enumerable: true
    }, {
      key: 'pages',
      decorators: [_aureliaTemplating.bindable],
      initializer: function initializer() {
        return 1;
      },
      enumerable: true
    }, {
      key: 'pageSize',
      decorators: [_aureliaTemplating.bindable],
      initializer: function initializer() {
        return 10;
      },
      enumerable: true
    }, {
      key: 'refineData',
      decorators: [_aureliaTemplating.bindable],
      initializer: function initializer() {
        return true;
      },
      enumerable: true
    }, {
      key: 'refresh',
      decorators: [_aureliaTemplating.bindable],
      initializer: null,
      enumerable: true
    }], null, _instanceInitializers);

    return Pagination;
  })();

  exports.Pagination = Pagination;
});