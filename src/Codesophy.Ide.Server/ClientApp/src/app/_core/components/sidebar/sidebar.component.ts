import { Component, Type } from "@angular/core";

import { SearchComponent } from "../search/search.component";

export interface SidebarToolbarChildItem {
  label: string;
  route: string;

  description?: string;
}

export interface SidebarToolbarChild {
  items?: Array<SidebarToolbarChildItem>;
  description?: string;
  component?: Type<any>
}

// TODO: badge > 99 ? badge = 99 ?
export interface SidebarToolbarItem {
  icon: string;
  action?: () => void;
  badge?: number;
  badgeDescription?: string;
  children?: SidebarToolbarChild;
  tooltip?: string;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  rootItems: Array<SidebarToolbarItem> = [
    {
      icon: "fa-search",
      tooltip: "Search",
      children: {
        component: SearchComponent
      },
    },
    {
      icon: "fa-envelope-open",
      badge: 18,
      tooltip: "Inbox messages",
      children: {
        items: [
          {
            label: "Dashboard",
            route: "/dashboard",
            description: "Click to navigate"
          },
          {
            label: "Examples",
            route: "/examples",
            description: "Click to navigate"
          },
          {
            label: "Feed",
            route: "/feed",
            description: "Click to navigate"
          }
        ],
        description: "App links"
      }
    },
    {
      icon: "fa-tasks",
      badge: 2,
      tooltip: "Tasks",
      children: {
        items: [
          {
            label: "Task 1",
            route: "/"
          },
          {
            label: "Task 2",
            route: "/"
          }
        ],
        description: "App tasks"
      }
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
  rootItem: SidebarToolbarItem;

  isActive(index: number) {
    return this.isSideNavOpened && this.rootItems[index] === this.rootItem;
  }

  toggleSidebar(item: SidebarToolbarItem) {
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
