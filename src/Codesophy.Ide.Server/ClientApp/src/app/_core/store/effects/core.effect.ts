import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";

import { CoreActionTypes } from "../actions";
import * as coreAction from "../actions/core.action";

@Injectable()
export class CoreEffects {
  constructor(private actions$: Actions) {
  }

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new coreAction.AppStart())
  );

  @Effect()
  appStart = this.actions$.pipe(
    ofType<coreAction.AppStart>(CoreActionTypes.APP_START),
    tap(_ => {

    }),
    switchMap(action => {
      const actions: Action[] = [];

      // actions.push(new action());

      return actions;
    })
  );
}
