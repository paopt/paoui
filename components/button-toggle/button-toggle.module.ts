import { NgModule } from '@angular/core';

import { PaoButtonToggleGroupComponent } from './button-toggle-group.component';
import { PaoButtonToggleComponent } from './button-toggle.component';

@NgModule({
  imports: [],
  exports: [PaoButtonToggleComponent, PaoButtonToggleGroupComponent],
  declarations: [PaoButtonToggleComponent, PaoButtonToggleGroupComponent],
  providers: [],
})
export class PaoButtonToggleModule { }
