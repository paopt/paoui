import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PaoBadgeModule } from 'pui/badge';
import { PaoButtonModule } from 'pui/button';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaoBadgeModule,
    PaoButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
