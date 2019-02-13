import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromContainers from "./containers";

export const ROUTES: Routes = [
  // {
  //   path: "",
    // component: fromContainers.ScheduleComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
