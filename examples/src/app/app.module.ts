import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaoBadgeModule } from 'paoui/badge';
import { PaoButtonModule } from 'paoui/button';
import { PaoButtonToggleModule } from 'paoui/button-toggle';
import { PaoCardModule } from 'paoui/card';
import { PaoAutocompleteModule } from 'paoui/autocomplete';
import { PaoCheckboxModule } from 'paoui/checkbox';
import { PaoRadioModule } from 'paoui/radio';

import { AppComponent } from './app.component';
import { PaoSlideToggleModule } from 'paoui/slide-toggle/slide-toggle.module';
import { PaoSliderModule } from 'paoui/slider';

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
    PaoAutocompleteModule,
    PaoCheckboxModule,
    PaoRadioModule,
    PaoSlideToggleModule,
    PaoSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
