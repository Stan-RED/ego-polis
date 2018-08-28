import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { SidebarContext, SidebarContextItem } from "../sidebar/sidebar.component";

@Component({
  selector: "app-sidebar-context",
  templateUrl: "./sidebar-context.component.html",
  styleUrls: ["./sidebar-context.component.scss"]
})
export class SidebarContextComponent {
  @Input() contextItem: SidebarContext;

  constructor(private router: Router) {}

  trigger(item: SidebarContextItem) {
    this.router.navigate([item.route]);
  }
}
