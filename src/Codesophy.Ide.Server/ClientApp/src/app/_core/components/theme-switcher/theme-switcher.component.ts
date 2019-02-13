import { Component } from "@angular/core";
import { MatSelectChange } from "@angular/material";

import { ThemeService } from "../../services";

@Component({
  selector: "app-theme-switcher",
  templateUrl: "./theme-switcher.component.html",
  styleUrls: ["./theme-switcher.component.scss"]
})
export class ThemeSwitcherComponent {
  constructor(public theme: ThemeService) {
  }

  onThemeChange(event: MatSelectChange) {
    this.theme.change(event.value);
  }
}
