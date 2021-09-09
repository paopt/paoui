import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaoBadgeModule } from 'pui/badge';
import { PaoButtonModule } from 'pui/button';
import { PaoButtonToggleModule } from 'pui/button-toggle';
import { PaoCardModule } from 'pui/card';
import { PaoAutocompleteModule } from 'pui/autocomplete';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PaoBadgeModule,
    PaoButtonModule,
    PaoButtonToggleModule,
    PaoCardModule,
    PaoAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
