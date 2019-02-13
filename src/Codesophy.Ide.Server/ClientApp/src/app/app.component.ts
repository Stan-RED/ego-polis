import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild
} from "@angular/core";

import { ScrollbarService, ThemeService } from "./_core/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild("scrollbarContainer", {read: ElementRef}) scrollbarContainer: ElementRef;

  @HostBinding("class") get themeCssClass() {
    return this.theme.themeCssClass;
  }

  constructor(public theme: ThemeService, private scrollbar: ScrollbarService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.scrollbar.init();
  }

  log(msg: string) {
    console.log(msg);
  }

  scroll() {
    this.scrollbar.contentScrollTop$.next(this.scrollbarContainer.nativeElement.scrollTop);
  }
}
