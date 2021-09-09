import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { PaoAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { PaoAutocompleteComponent } from './autocomplete.component';
import { PaoOptgroupComponent } from './optgroup.component';
import { PaoOptionComponent } from './option.component';

@NgModule({
  imports: [
    OverlayModule,
    PortalModule
  ],
  exports: [
    PaoAutocompleteTriggerDirective,
    PaoAutocompleteComponent,
    PaoOptgroupComponent,
    PaoOptionComponent
  ],
  declarations: [
    PaoAutocompleteTriggerDirective,
    PaoAutocompleteComponent,
    PaoOptgroupComponent,
    PaoOptionComponent
  ],
  providers: [],
})
export class PaoAutocompleteModule { }
