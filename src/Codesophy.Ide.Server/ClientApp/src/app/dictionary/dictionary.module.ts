import { NgModule } from "@angular/core";

import { SharedModule } from "../_shared/shared.module";
import { DictionaryRoutingModule } from "./dictionary-routing.module";

// Components.
// import * as fromComponents from './components';

// Containers.
import * as fromContainers from "./containers";

// Pipes.
import * as fromPipes from "./pipes";

@NgModule({
  declarations: [
    ...fromContainers.containers,
    // ...fromComponents.components,
    ...fromPipes.pipes,
  ],
  imports: [
    DictionaryRoutingModule,
    SharedModule,
  ],
  providers: [
    ...fromPipes.pipes,
  ]
})
export class DictionaryModule {
}
