import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaoBadgeModule } from 'paoui/badge';
import { PaoButtonModule } from 'paoui/button';
import { PaoButtonToggleModule } from 'paoui/button-toggle';
import { PaoCardModule } from 'paoui/card';
import { PaoAutocompleteModule } from 'paoui/autocomplete';

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
