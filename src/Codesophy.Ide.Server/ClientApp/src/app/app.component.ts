import { Component, HostBinding } from "@angular/core";

import { ThemeService } from "./_core/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @HostBinding("class") get themeCssClass() {
    return this.theme.themeCssClass;
  }

  constructor(public theme: ThemeService) {
  }

  log(msg: string) {
    console.log(msg);
  }
}
