import { Component } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

export interface SidebarContextItem {
  label: string;
  route: string;
}

export interface SidebarRootItem {
  icon: string;
  action?: () => void;
  badge?: number;
  badgeDescription?: string;
  children?: Array<SidebarContextItem>;
  tooltip?: string;
}

@Component({
  selector: "app-sidebar",
  animations: [
    trigger(
      "enterAnimation", [
        transition(":enter", [
          style({width: 0}),
          animate("300ms", style({width: "*"}))
        ]),
        transition(":leave", [
          style({width: "*"}),
          animate("300ms", style({width: 0}))
        ])
      ]
    )
  ],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  rootItems: Array<SidebarRootItem> = [
    {
      icon: "fa-envelope-open",
      badge: 18,
      tooltip: "Inbox messages",
      children: [
        {
          label: "Item 1",
          route: "#"
        },
        {
          label: "Item 2",
          route: "#"
        }
      ]
    },
    {
      icon: "fa-tasks",
      badge: 2,
      tooltip: "Tasks",
      children: [
        {
          label: "Task 1",
          route: "#"
        },
        {
          label: "Task 2",
          route: "#"
        }
      ]
    },
    {
      icon: "fa-desktop",
      tooltip: "Monitor current state",
      action: () => alert(`Monitor current state action.`)
    },
    {
      icon: "fa-code-branch",
      tooltip: "Discover variations",
      action: () => alert(`Discover variations action.`)
    },
    {
      icon: "fa-shield-alt",
      tooltip: "Guard state",
      action: () => alert(`Guard state action.`)
    },
    {
      icon: "fa-server",
      tooltip: "Server",
      action: () => alert(`Server action.`)
    }
  ];

  isSideNavOpened = false;
  rootItem: SidebarRootItem;

  isActive(index: number) {
    return this.isSideNavOpened && this.rootItems[index] === this.rootItem;
  }

  toggleSidebar(item: SidebarRootItem) {
    const hasItemChanged: boolean = this.rootItem !== item;

    if (hasItemChanged) {
      this.rootItem = item;

      if (item.children) {
        this.isSideNavOpened = true;
      }
    } else {
      this.isSideNavOpened = !this.isSideNavOpened;
    }

    if (item.action) {
      this.isSideNavOpened = false;

      // setTimeout in order to run action after side nav closed.
      setTimeout(() => item.action());
    }
  }
}
