import { ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";

import * as fromNgrxRouter from "@ngrx/router-store";

import * as fromCore from "./core.reducer";
import * as fromRouter from "./router.reducer";

import { environment } from "../../../../environments/environment";

export { CustomRouterStateSerializer } from "./router.reducer";

export interface State {
  core: fromCore.CoreState;
  router: fromNgrxRouter.RouterReducerState<fromRouter.RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer,
  router: fromNgrxRouter.routerReducer,
};

export const selectCoreState = createFeatureSelector<fromCore.CoreState>("core");
export const selectRouterFeatureState = createFeatureSelector<fromNgrxRouter.RouterReducerState<fromRouter.RouterStateUrl>>("router");

// Meta Reducers.
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state, action) {
    console.log("state", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = environment.production
  ? []
  : [
    logger
    // storeFreeze,
  ];
