import { NgModule } from '@angular/core';
import { PaoCardAvatarComponent } from './card-avatar.component';
import { PaoCardContentComponent } from './card-content.component';
import { PaoCardHeaderComponent } from './card-header.component';
import { PaoCardImageComponent } from './card-image.component';
import { PaoCardSubtitleComponent } from './card-subtitle.component';
import { PaoCardTitleComponent } from './card-title.component';

import { PaoCardComponent } from './card.component';
import { PaoCardActionsComponent } from './catf-actions.component';

@NgModule({
  imports: [],
  exports: [
    PaoCardComponent,
    PaoCardAvatarComponent,
    PaoCardContentComponent,
    PaoCardHeaderComponent,
    PaoCardImageComponent,
    PaoCardTitleComponent,
    PaoCardSubtitleComponent,
    PaoCardActionsComponent
  ],
  declarations: [
    PaoCardComponent,
    PaoCardAvatarComponent,
    PaoCardContentComponent,
    PaoCardHeaderComponent,
    PaoCardImageComponent,
    PaoCardTitleComponent,
    PaoCardSubtitleComponent,
    PaoCardActionsComponent
  ],
  providers: [],
})
export class PaoCardModule { }
