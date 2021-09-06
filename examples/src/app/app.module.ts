import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PaoBadgeModule } from 'pui/badge';
import { PaoButtonModule } from 'pui/button';
import { PaoButtonToggleModule } from 'pui/button-toggle';
import { FormsModule } from '_@angular_forms@12.2.1@@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaoBadgeModule,
    PaoButtonModule,
    PaoButtonToggleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
