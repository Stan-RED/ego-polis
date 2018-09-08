/**
 * @angular.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

/**
 * @ngrx.
 */
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";

import { AngularDraggableModule } from "angular2-draggable";

/**
 * App's.
 */
import { CoreModule } from "./_core/core.module";
import { SharedModule } from "./_shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FeedComponent } from "./feed/feed.component";

import {
  CustomRouterStateSerializer,
  effects,
  metaReducers,
  reducers,
} from "./_core/store";

import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FeedComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    // AngularDraggableModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument({maxAge: 50}),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
