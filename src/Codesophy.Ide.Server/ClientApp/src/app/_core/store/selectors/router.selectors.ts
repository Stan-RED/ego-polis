import { createSelector } from "@ngrx/store";

import * as fromNgrxRouter from "@ngrx/router-store";

import * as fromFeature from "../reducers";
import * as fromRouter from "../reducers/router.reducer";

export const selectRouterState = createSelector(
  fromFeature.selectRouterFeatureState,
  (state: fromNgrxRouter.RouterReducerState<fromRouter.RouterStateUrl>) => state && state.state
);

export const selectRouter: fromRouter.RouterStateSelectors = {
  url: createSelector(selectRouterState, fromRouter.selectors.url),
  queryParams: createSelector(selectRouterState, fromRouter.selectors.queryParams),
  params: createSelector(selectRouterState, fromRouter.selectors.params),
  lastSegment: createSelector(selectRouterState, fromRouter.selectors.lastSegment),
  data: createSelector(selectRouterState, fromRouter.selectors.data),
  firstChildUrl: createSelector(selectRouterState, fromRouter.selectors.firstChildUrl)
};
