/**
 * @angular.
 */
import { NgModule } from "@angular/core";

/**
 * @material.
 */
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";

/**
 * App's.
 */

// Components.
// import * as fromComponents from './components';

// Directives.
import * as fromDirectives from "./directives";

// Guards.
// import * as fromGuards from './guards';

// Pipes.
// import * as fromPipes from './pipes';

// Modules for import and for export.
export const reexportedModules: any[] = [
  // TranslateModule
  MatCardModule,
  MatToolbarModule
];

@NgModule({
  imports: [
    ...reexportedModules,
  ],
  declarations: [
    // ...fromComponents.components,
    ...fromDirectives.directives,
    // ...fromPipes.pipes,
  ],
  exports: [
    // ...fromComponents.components,
    ...fromDirectives.directives,
    // ...fromPipes.pipes,
    ...reexportedModules,
  ],
  entryComponents: [],
  providers: [
    // ...fromPipes.pipes,
    // ...fromGuards.guards
  ]
})
export class SharedModule {
}
