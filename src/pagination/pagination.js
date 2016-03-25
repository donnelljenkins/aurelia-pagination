import { bindingMode } from 'aurelia-binding';
import { bindable } from 'aurelia-templating';

export class Pagination {
  @bindable({defaultBindingMode: bindingMode.twoWay})
  currentPage = 1;
  @bindable model;
  @bindable pageBlockSize = 0;
  @bindable pages = 1;
  @bindable pageSize = 10;
  @bindable refineData = true;
  @bindable refresh;

  currentBlockStartPageIndex = 0;
  isDataRefiner = true;

  bind(bindingContext) {
    this.model = this.model || bindingContext;
    if (this.refineData !== 'false' && this.model.addDataRefiner) {
      this.model.addDataRefiner(this.onRefineData);
    } else {
      this.onRefresh();
    }
  }

  onRefineData = (data) => {
    return new Promise(resolve => {
      let currentPageData = this.applyPaging(data);
      resolve(currentPageData);
    });
  }

  applyPaging = (data) => {
    this.isRefining = true;
    let pageSize = parseInt(this.pageSize, 10);
    this.pages = Math.ceil(data.length / pageSize);
    this.currentPage = this.minimumAllowedPage(this.currentPage, this.pages);
    this.updatePaging();
    let start = (this.currentPage - 1) * pageSize;
    let end = start + pageSize;
    let currentPageData = data.slice(start, end);

    this.isRefining = false;
    return currentPageData;
  }

  minimumAllowedPage(a, b) {
    let page = Math.min(a, b);
    return Math.max(page, 1);
  }

  updatePaging() {
    this.updatePageBlocks();
    this.updateVisibility();
  }

  updatePageBlocks() {
    let pageBlockSize = parseInt(this.pageBlockSize || this.pages, 10);
    let blockIndex;
    if (!this.currentPage || !pageBlockSize) {
      blockIndex = 0;
    } else {
      blockIndex = Math.ceil(this.currentPage / pageBlockSize) - 1;
    }

    if (blockIndex) {
      this.currentBlockStartPageIndex = (blockIndex * pageBlockSize) + 1;
    } else {
      this.currentBlockStartPageIndex = 1;
    }
    this.numberOfVisiblePages = this.minimumAllowedPage(pageBlockSize, this.pages - this.currentBlockStartPageIndex + 1);
  }

  updateVisibility() {
    let pageSize = parseInt(this.pageSize, 10);
    this.showFirst = this.currentBlockStartPageIndex > 1;
    this.showLast = this.pageBlockSize && (this.currentBlockStartPageIndex + pageSize) < this.pages;
  }

  onRefresh() {
    if (this.refresh) {
      this.refresh();
    } else if (this.model.refresh) {
      this.model.refresh();
    } else {
      throw new Error(`${this.model.constructor.name} does not contain a 'refresh' function.`);
    }
  }

  goToPage(page) {
    if (page > 0) {
      this.currentPage = page;
      this.onRefresh();
    }
  }

  currentPageChanged() {
    if (!this.isRefining) {
      this.updatePaging();
    }
  }

  pagesChanged() {
    if (!this.isRefining) {
      this.updatePaging();
    }
  }
}
