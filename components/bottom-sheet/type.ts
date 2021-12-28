import { InjectionToken } from '@angular/core';

export interface PaoBottomSheetConfig {
  hasBackdrop?: boolean;
  disableClose?: boolean;
  data?: any;
  backdropClass?: string;
  panelClass?: string;
}

export const defaultBottomSheetConfig: PaoBottomSheetConfig = {
  hasBackdrop: true,
  disableClose: false
}

export const PAO_BOTTOM_SHEET_DEFAULT_CONFIG = new InjectionToken<PaoBottomSheetConfig>('paobottomsheet defualt config');
export const PAO_BOTTOM_SHEET_DATA = new InjectionToken<any>('bottom sheet data');