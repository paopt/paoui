import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PaoBadgeModule } from 'pui/badge';
import { PaoButtonModule } from 'pui/button';
import { PaoButtonToggleModule } from 'pui/button-toggle';
import { PaoCardModule } from 'pui/card';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PaoBadgeModule,
    PaoButtonModule,
    PaoButtonToggleModule,
    PaoCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
