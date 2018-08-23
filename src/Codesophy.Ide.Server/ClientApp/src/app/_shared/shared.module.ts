/**
 * @angular.
 */
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @material.
 */
import { MatNativeDateModule } from "@angular/material";

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
  ReactiveFormsModule,

  MatNativeDateModule,

  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
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
