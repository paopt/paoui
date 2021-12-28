import { Injectable, ɵComponentType, Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PaoBottomSheetConfig, PAO_BOTTOM_SHEET_DATA } from './type';
import { PaoBottomSheetRef } from './bottom-sheet-ref';

@Injectable({providedIn: 'root'})
export class PaoBottomSheetService<T> {
  private paoBottomSheetRef!: PaoBottomSheetRef;

  constructor(private overlay: Overlay, private parentInjector: Injector) { }

  dismiss(data: any) {
    if (this.paoBottomSheetRef) {
      this.paoBottomSheetRef.dismiss(data);
    }
  }

  open(component: ɵComponentType<T>, config: PaoBottomSheetConfig = {}) {
    const position = this.overlay.position()
      .global()
      .centerHorizontally()
      .bottom('10px');
    const overlayRef = this.overlay.create({
      positionStrategy: position,
      ...config
    });
    this.paoBottomSheetRef = new PaoBottomSheetRef(overlayRef);
    const injector = this.getInjector(config.data);
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);
  }

  getInjector(data?: any) {
    return Injector.create({
      providers: [
        {
          provide: PAO_BOTTOM_SHEET_DATA,
          useValue: data
        },
        {
          provide: PaoBottomSheetRef,
          useValue: this.paoBottomSheetRef
        }
      ],
      parent: this.parentInjector
    });
  }
}