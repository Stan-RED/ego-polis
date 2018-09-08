import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { FeedComponent } from "./feed/feed.component";

const routes: Route[] = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      breadcrumb: "Dashboard"
    },
  },
  {
    path: "feed",
    component: FeedComponent,
    data: {
      breadcrumb: "Feed"
    },
  },
  {
    path: "examples",
    loadChildren: "./examples/examples.module#ExamplesModule",
    data: {
      breadcrumb: "Examples"
    },
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  }
//    TODO: 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
