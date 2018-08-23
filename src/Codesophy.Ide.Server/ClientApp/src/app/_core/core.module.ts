import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";

import { SharedModule } from "../_shared/shared.module";
import { throwIfAlreadyLoaded } from "./module-import-guard";

// Components.
import * as fromComponents from "./components";

// Containers.
// import * as fromContainers from './containers';

// Services.
import * as fromServices from "./services";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    // ...fromContainers.containers,
    ...fromComponents.components
  ],
  exports: [
    // ...fromContainers.containers,
    ...fromComponents.components
  ],
  entryComponents: [
    fromComponents.DialogComponent
  ],
  providers: [
    ...fromServices.services,
  ]
})
export class CoreModule {
  constructor(@Optional()
              @SkipSelf()
                parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
