import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output
} from "@angular/core";

import { move } from "../../../_shared/utils";
import { MenuItem } from "../../../_shared/models";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  @Input() menuItems: Array<MenuItem>;

  @Output() menuItemsReorder = new EventEmitter<Array<MenuItem>>();
  @Output() hideChildLevel = new EventEmitter<any>();
  @Output() showChildLevel = new EventEmitter<Array<MenuItem>>();

  height: number = 25;
  position: { [key: number]: { x: number, y: number } } = {};
  isDraggable: Array<boolean>;

  private isChildVisible: boolean = false;
  private movedBlocks: number = 0;
  private movingItemIndex: number = 0;
  private prevY: number = undefined;

  ngOnInit() {
    this.isDraggable = this.menuItems.map(_ => false);
  }

  closeChildren() {
    this.hideChildLevel.emit();
    this.isChildVisible = false;
  }

  click(index: number) {
    if(this.isChildVisible) {
      this.closeChildren();
    } else {
      if (this.menuItems[index].action) {
        this.menuItems[index].action();
      } else if (this.menuItems[index].children) {
        this.showChildLevel.emit(this.menuItems[index].children);
        this.isChildVisible = true;
      }
    }
  }

  longPress(index: number) {
    this.isDraggable[index] = true;
    this.closeChildren();
  }

  dragStart(el: HTMLElement, index: number) {
    this.movingItemIndex = index;
  }

  drop(el: HTMLElement, index: number) {
    // Resets position.
    this.position[index] = {y: 0, x: 0};

    this.movedBlocks = 0;
    this.movingItemIndex = 0;
    this.prevY = undefined;
    this.isDraggable = this.menuItems.map(_ => false);
  }

  movingOffset(event: { x: number, y: number }, index: number) {
    // Disallows moving the first item to the top.
    if (this.movingItemIndex === 0 && event.y < this.prevY) {
      return;
    }

    // Disallows moving the last item to the bottom.
    if (this.movingItemIndex === this.menuItems.length - 1 && event.y > this.prevY) {
      return;
    }

    const prevMovedBlocks: number = this.movedBlocks;

    this.movedBlocks = Math.floor(Math.abs(event.y) / this.height);

    if(event.y < 0) {
      this.movedBlocks = this.movedBlocks * -1;
    }

    if (this.movedBlocks !== prevMovedBlocks) {
      const newIndex = this.movingItemIndex + (this.movedBlocks - prevMovedBlocks);

      this.menuItems = move(this.menuItems, this.movingItemIndex, newIndex);
      this.menuItemsReorder.emit(this.menuItems);
      this.movingItemIndex = newIndex;

      this.isDraggable = this.menuItems.map((x, i) => i === newIndex);
    }

    this.prevY = event.y;
  }
}
