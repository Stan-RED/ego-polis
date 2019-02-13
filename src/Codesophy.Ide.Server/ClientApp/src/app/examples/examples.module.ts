import { NgModule } from "@angular/core";

import { SharedModule } from "../_shared/shared.module";
import { ExamplesRoutingModule } from "./examples-routing.module";

import * as fromComponents from './components';
import * as fromContainers from "./containers";

@NgModule({
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  imports: [
    ExamplesRoutingModule,
    SharedModule
  ],
  entryComponents: [
    fromComponents.DialogComponent
  ],
})
export class ExamplesModule {
}
