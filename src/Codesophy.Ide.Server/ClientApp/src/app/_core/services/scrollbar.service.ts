import PerfectScrollbar from "perfect-scrollbar";
import { AfterViewInit, Inject, Injectable, OnDestroy } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

/**
 * Service for 3d-party https://github.com/utatti/perfect-scrollbar
 */
@Injectable()
export class ScrollbarService implements OnDestroy {
  options: PerfectScrollbar.Options = {
    wheelSpeed: 2,
    wheelPropagation: false
  };

  scrollbars: Array<PerfectScrollbar> = [];
  subscription: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.update());
  }

  update() {
    // Scrolls to top.
    this.getScrollBarContainers().forEach(scrollbar => scrollbar.scrollTop = 0);

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
