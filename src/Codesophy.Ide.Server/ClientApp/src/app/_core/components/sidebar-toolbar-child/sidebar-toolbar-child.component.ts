import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { SidebarToolbarChild, SidebarToolbarChildItem } from "../sidebar/sidebar.component";

@Component({
  selector: "app-sidebar-toolbar-child",
  templateUrl: "./sidebar-toolbar-child.component.html",
  styleUrls: [
    "./sidebar-toolbar-child.component.scss",
    "../sidebar/sidebar-panel.component.scss"
  ]
})
export class SidebarToolbarChildComponent {
  @Input() item: SidebarToolbarChild;

  constructor(private router: Router) {
  }

  trigger(item: SidebarToolbarChildItem) {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
