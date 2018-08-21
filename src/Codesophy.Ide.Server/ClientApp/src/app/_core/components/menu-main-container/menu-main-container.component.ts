import {
  Component,
  HostBinding,
  Input,
  ViewChild
} from "@angular/core";

import { AngularDraggableDirective } from "../../../_shared/directives";
import { MenuMainComponent } from "../menu-main/menu-main.component";

export enum MenuMainPosition {
  Left,
  Right
}

@Component({
  selector: "app-menu-main-container",
  templateUrl: "./menu-main-container.component.html",
  styleUrls: ["./menu-main-container.component.scss"]
})
export class MenuMainContainerComponent {
  // Bounds not to cross when dragging.
  @Input() bounds: HTMLElement;

  // Draggable directive to reset position on MenuMainPosition change.
  @ViewChild(AngularDraggableDirective) draggable: AngularDraggableDirective;

  // Main menu to close opened children on drag start.
  @ViewChild(MenuMainComponent) menuMain: MenuMainComponent;

  @HostBinding("class.app-menu-main-container-right")
  get isOnTheRight() {
    return this.isContainerOnTheRight();
  }

  containerHandlePosition: { x: number, y: number };
  isContainerHandleDraggable = false;

  private containerPosition = MenuMainPosition.Left;
  private prevContainerHandleX: number;
  private stickToTheEdgeOn: number;

  isContainerOnTheRight() {
    return this.containerPosition === MenuMainPosition.Right;
  }

  containerHandleLongPress() {
    this.isContainerHandleDraggable = true;
  }

  containerHandleDragStart(el: HTMLElement) {
    // TODO: Provide window?
    if (window === undefined) {
      throw new Error(`'window' is undefined`);
    }
    this.stickToTheEdgeOn = window.innerWidth * 0.85 - el.offsetWidth / 2;

    if (this.menuMain) {
      this.menuMain.hideChildLevel();
    }
  }

  containerHandleDrop(el: HTMLElement) {
    this.containerHandlePosition = {x: 0, y: 0};
    this.isContainerHandleDraggable = false;
    this.stickToTheEdgeOn = undefined;
  }

  containerHandleMovingOffset(event: { x: number, y: number }) {
    if (event.x > this.prevContainerHandleX && event.x > this.stickToTheEdgeOn) {
      this.containerPosition = MenuMainPosition.Right;
      this.draggable.resetPosition();
    } else if (event.x < this.prevContainerHandleX && event.x < -this.stickToTheEdgeOn) {
      this.containerPosition = MenuMainPosition.Left;
      this.draggable.resetPosition();
    }

    this.prevContainerHandleX = event.x;
  }
}
