import { EventEmitter } from '@angular/core';
import { OverlayRef} from '@angular/cdk/overlay';

export class PaoBottomSheetRef {
  private dismissed = new EventEmitter<any>();
  private opened = new EventEmitter<any>();

  constructor(private overlayRef: OverlayRef) {
    this.opened.next();
  }

  dismiss(data?: any) {
    if (this.isVisible()) {
      this.overlayRef.dispose();
      this.dismissed.next(data);
    }
  }

  afterDismissed(): EventEmitter<any> {
    return this.dismissed;
  }

  afterOpened(): EventEmitter<any> {
    return this.opened;
  }

  isVisible() {
    return this.overlayRef && this.overlayRef.overlayElement;
  }
}