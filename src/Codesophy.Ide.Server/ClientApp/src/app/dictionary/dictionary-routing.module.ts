import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromContainers from "./containers";

export const ROUTES: Routes = [
  {
    path: "",
    component: fromContainers.DictionaryComponent,
  },
  {
    // WORK: Guard
    path: ":id",
    component: fromContainers.TermComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule {
}
