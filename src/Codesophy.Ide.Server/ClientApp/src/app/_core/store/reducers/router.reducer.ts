import { head } from "lodash-es";
import { ActivatedRouteSnapshot, Data, Params, RouterStateSnapshot } from "@angular/router";

import * as fromNgrxRouter from "@ngrx/router-store";

export interface RouterStateUrl {
  // Full url.
  url: string;

  // `?param=value`
  queryParams: Params;

  // `/:id`
  params: Params;

  lastSegment: string;

  data: Data;

  firstChildUrl: string;

  fragment: string;
}

export class CustomRouterStateSerializer
  implements fromNgrxRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const {url} = routerState;
    const lastSegment = url
      .split("/")
      .slice()
      .reverse()[0];
    const {queryParams} = routerState.root;
    const {fragment} = routerState.root;
    let firstChildUrl;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const {params, data} = state;

    // firstChildUrl.
    if (routerState.root.firstChild && routerState.root.firstChild.url.length) {
      firstChildUrl = head(routerState.root.firstChild.url).path;
    }

    return {url, fragment, queryParams, params, lastSegment, data, firstChildUrl};
  }
}

export interface RouterStateSelectors {
  url: (state: RouterStateUrl) => RouterStateUrl["url"];
  queryParams: (state: RouterStateUrl) => RouterStateUrl["queryParams"];
  params: (state: RouterStateUrl) => RouterStateUrl["params"];
  lastSegment: (state: RouterStateUrl) => RouterStateUrl["lastSegment"];
  data: (state: RouterStateUrl) => RouterStateUrl["data"];
  firstChildUrl: (state: RouterStateUrl) => RouterStateUrl["firstChildUrl"];
  fragment: (state: RouterStateUrl) => RouterStateUrl["fragment"];
}

export const selectors: RouterStateSelectors = {
  url: state => state && state.url,
  queryParams: state => state && state.queryParams,
  params: state => state && state.params,
  lastSegment: state => state && state.lastSegment,
  data: state => state && state.data,
  firstChildUrl: state => state && state.firstChildUrl,
  fragment: state => state && state.fragment,
};
