import PerfectScrollbar from "perfect-scrollbar";
import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { takeUntil, filter } from "rxjs/operators";

import { Lifecycle } from "../../_shared/bases";

/**
 * Service for 3d-party https://github.com/utatti/perfect-scrollbar
 */
@Injectable()
export class ScrollbarService extends Lifecycle {
  options: PerfectScrollbar.Options = {
    wheelSpeed: 2,
    wheelPropagation: false
  };

  scrollbars: Array<PerfectScrollbar> = [];

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
    super();
  }

  // Should be called AfterViewInit in every component that has additional scrollbar container(s) (except the main one).
  init() {
    // Destroys all existing scrollbars.
    this.scrollbars.forEach(scrollbar => scrollbar.destroy());
    this.scrollbars = [];

    // Creates scrollbars for each scrollbar container.
    this.getScrollBarContainers()
      .forEach(scrollbar => this.scrollbars.push(new PerfectScrollbar(scrollbar, this.options)));

    // Updates existing scrollbars on NavigationEnd.
    this.router.events
      .pipe(
        takeUntil(this.lifecycle.onDestroy),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // Scrolls to top.
        this.getScrollBarContainers().forEach(scrollbar => scrollbar.scrollTop = 0);

        this.update();
      });
  }

  update() {
    // Updates existing scrollbars.
    setTimeout(() => {
      this.scrollbars.forEach(scrollbar => scrollbar.update());
    });
  }

  /**
   * Returns containers that need custom scrollbars.
   * @returns {Array<HTMLElement>} Array containing scrollbar containers.
   */
  private getScrollBarContainers(): Array<HTMLElement> {
    return Array.from(this.document.querySelectorAll(".app-scrollbar-container"));
  }
}
