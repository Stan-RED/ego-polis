import { Component, HostBinding } from "@angular/core";
import { MatSelectChange } from "@angular/material";

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

  onThemeChange(event: MatSelectChange) {
    this.theme.change(event.value);
  }

  log(msg: string) {
    console.log(msg);
  }
}
