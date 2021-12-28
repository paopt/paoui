import { NgModule, ModuleWithProviders } from "@angular/core";
import { PAO_BOTTOM_SHEET_DEFAULT_CONFIG, defaultBottomSheetConfig } from './type';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [],
})
export class PaoBottomSheetModule {
  public static forRoot(config = defaultBottomSheetConfig): ModuleWithProviders<PaoBottomSheetModule> {
    return {
      ngModule: PaoBottomSheetModule,
      providers: [
        {
          provide: PAO_BOTTOM_SHEET_DEFAULT_CONFIG,
          useValue: { ...defaultBottomSheetConfig, ...config } 
        }
      ]
    };
  }
}
