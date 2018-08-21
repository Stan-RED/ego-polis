import { Component, HostBinding, Input } from "@angular/core";

import { MenuItem } from "../../../_shared/models";

@Component({
  selector: "app-menu-main",
  templateUrl: "./menu-main.component.html",
  styleUrls: ["./menu-main.component.scss"],
})
export class MenuMainComponent {
  @HostBinding("class.app-menu-main-right") @Input() isMenuOnTheRight: boolean = false;

  menuItems: Array<MenuItem> = [
    {
      label: `Menu item with children`,
      children: [
        {label: `I'm the children # 1`},
        {label: `I'm the children # 2`},
        {label: `I'm the children # 3`},
        {label: `I'm the children # 4`},
        {label: `I'm the children # 5`}
      ]
    },
    {
      label: `Menu item just with action`,
      action: () => {
        alert(`I'm just an action.`)
      }
    },
    {label: `Menu item # 3`},
    {label: `Menu item # 4`},
    {label: `Menu item # 5`}
  ];

  childMenuItems: Array<MenuItem>;

  isChildLevelVisible: boolean = false;

  hideChildLevel() {
    this.isChildLevelVisible = false;
  }

  menuItemsReorder(event) {
    console.log(`Old menu order`, this.menuItems);
    console.log(`New menu order`, event);
  }

  showChildLevel(event: Array<MenuItem>) {
    this.childMenuItems = event;
    this.isChildLevelVisible = true;
  }
}
