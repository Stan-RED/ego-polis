import { Action } from "@ngrx/store";

export enum CoreActionTypes {
  APP_START = "[Core] App Start",
}

export class AppStart implements Action {
  readonly type = CoreActionTypes.APP_START;
}

export type CoreAction =
  | AppStart
  ;
