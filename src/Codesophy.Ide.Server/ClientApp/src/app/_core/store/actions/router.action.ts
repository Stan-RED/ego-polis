import { Action } from "@ngrx/store";
import { NavigationExtras } from "@angular/router";

export enum RouterActionTypes {
  NAVIGATE = "[Router] Navigate",
  BACK = "[Router] Back",
  FORWARD = "[Router] Forward",
}

export class Navigate implements Action {
  readonly type = RouterActionTypes.NAVIGATE;

  constructor(public payload: {
    path: any[];
    query?: object,
    extras?: NavigationExtras
  }) {
  }
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export type RouterActions = Navigate | Back | Forward;
