import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Location } from "@angular/common";
import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { RouterActionTypes } from "../actions";
import * as routerActions from "../actions/router.action";

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private location: Location) {
  }

  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType<routerActions.Navigate>(routerActions.RouterActionTypes.NAVIGATE),
    map(action => action.payload),
    tap(({path, query: queryParams, extras}) => {
      this.router.navigate(path, {queryParams, ...extras});
    })
  );

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.pipe(
    ofType<routerActions.Back>(RouterActionTypes.BACK),
    tap(() => this.location.back())
  );

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.pipe(
    ofType<routerActions.Forward>(RouterActionTypes.FORWARD),
    tap(() => this.location.forward())
  );
}
