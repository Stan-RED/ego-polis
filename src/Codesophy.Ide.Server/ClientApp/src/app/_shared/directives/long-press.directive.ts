import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";

/**
 * Allows to listen to long press, long pressing and related events.
 *
 * @example
 * <element
 *   appLongPress
 *   (longPress)="fn($event)"
 *   (longPressing)="fn($event)"
 *   (longPressEnd)="fn($event)"
 * >Content</element>
 */
@Directive({
  selector: "[appLongPress]"
})
export class LongPressDirective {
  @Input() longPressingAfter: number = 400;

  @Output() longPress: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnd: EventEmitter<any> = new EventEmitter();

  private isPressing: boolean;
  private isLongPressing: boolean;
  private timeout: any;
  private mouseX: number = 0;
  private mouseY: number = 0;

  @HostBinding("class.app-element-pressing")
  get press() {
    return this.isPressing;
  }

  @HostBinding("class.app-element-pressing-long")
  get pressLong() {
    return this.isLongPressing;
  }

  @HostListener("mousedown", ["$event"])
  onMouseDown(event: MouseEvent) {
    // Listens only lo left mouse clicks.
    if (event.which !== 1) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.pressingStart(event);
  }

  @HostListener("touchstart", ["$event"])
  onTouchStart(event) {
    this.pressingStart(event);
  }

  pressingStart(event: MouseEvent | TouchEvent) {
    this.isPressing = true;
    this.isLongPressing = false;

    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPress.emit(event);
      this.loop(event);
    }, this.longPressingAfter);

    this.loop(event);
  }

  loop(event: MouseEvent | TouchEvent) {
    if (this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }

  // It is possible user just wants to select some text.
  // In case start moving before long pressing fired - abort.
  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    if (this.isPressing && !this.isLongPressing) {
      const xThres = (event.clientX - this.mouseX) > 10;
      const yThres = (event.clientY - this.mouseY) > 10;
      if (xThres || yThres) {
        this.endPress();
      }
    }
  }

  @HostListener("touchmove", ["$event"])
  onTouchMove(event) {
    if (this.isPressing && !this.isLongPressing) {
      this.endPress();
    }
  }

  @HostListener("mouseup")
  @HostListener("touchend")
  onMouseUp() {
    this.endPress();
  }

  endPress() {
    clearTimeout(this.timeout);
    this.isLongPressing = false;
    this.isPressing = false;
    this.longPressEnd.emit(true);
  }
}
