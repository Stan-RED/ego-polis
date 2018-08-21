import { LongPressDirective } from "./long-press.directive";
import { AngularDraggableDirective } from "./draggable/angular-draggable.directive";

export const directives: any[] = [
  AngularDraggableDirective,
  LongPressDirective
];

export * from "./long-press.directive";
export * from "./draggable/angular-draggable.directive";
