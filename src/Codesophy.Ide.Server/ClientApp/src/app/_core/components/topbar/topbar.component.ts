import { Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent {
  // TODO: Search as separate component in case we stick with focus-onhover behavior.
  @ViewChild("searchInputEl") searchInputEl: ElementRef;

  mouseleave() {
    this.searchInputEl.nativeElement.blur();
  }

  mouseenter() {
    this.searchInputEl.nativeElement.focus();
  }
}
