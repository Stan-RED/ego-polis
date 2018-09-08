import { AfterViewInit, Component, HostBinding, OnInit } from "@angular/core";

import { ScrollbarService, ThemeService } from "./_core/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, AfterViewInit {
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
}
