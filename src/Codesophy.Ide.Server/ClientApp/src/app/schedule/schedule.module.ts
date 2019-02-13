import { NgModule } from "@angular/core";

import { SharedModule } from "../_shared/shared.module";
import { ScheduleRoutingModule } from "./schedule-routing.module";

// Components.
import * as fromComponents from './components';

// Containers.
import * as fromContainers from "./containers";

// Pipes.
import * as fromPipes from "./pipes";

// Guards.
// import * as fromGuards from './guards';

// Services.
import * as fromServices from './services';

@NgModule({
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromPipes.pipes,
  ],
  imports: [
    ScheduleRoutingModule,
    SharedModule,
  ],
  entryComponents: [fromComponents.entryComponents],
  providers: [
    ...fromPipes.pipes,
  ]
})
export class ScheduleModule {
  static forRoot() {
    return {
      ngModule: ScheduleModule,
      providers: [
        // ...fromGuards.guards,
        ...fromServices.services,
      ]
    };
  }
}
