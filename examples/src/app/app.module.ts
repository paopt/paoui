import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PaoBadgeModule } from 'pui/badge';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaoBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
