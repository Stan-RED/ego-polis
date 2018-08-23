/**
 * @angular.
 */
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

/**
 * @material.
 */
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
  FormsModule,

  MatButtonModule,
  MatToolbarModule,
  MatSelectModule,
  MatTabsModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCardModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSlideToggleModule
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
