import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaoButtonToggleComponent } from './button-toggle.component';

@Component({
  selector: 'pao-button-toggle-group',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./button-toggle.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.pao-button-toggle-group-vertical]': 'vertical',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaoButtonToggleGroupComponent),
      multi: true
    }
  ]
})
export class PaoButtonToggleGroupComponent implements ControlValueAccessor, AfterContentInit, OnDestroy {
  @Input() disabled: boolean | string = false;
  @Input() vertical: boolean = false;
  @ContentChildren(PaoButtonToggleComponent) buttonComs!: QueryList<PaoButtonToggleComponent>;

  private modelValue: any;
  private onChangeFn = (_: any) => {};
  private destory$ = new Subject<void>();

  constructor(private eleRef: ElementRef, private renderer2: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-button-toggle-group');
  }

  ngAfterContentInit() {
    this.buttonComs.forEach(com => {
      com.onSelect.pipe(
        takeUntil(this.destory$)
      ).subscribe(v => {
        this.onChangeFn(v);
        this.setCheckButton(v);
        this.cdr.markForCheck();
      });
    });
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }

  writeValue(obj: any): void {
    this.modelValue = obj;
    this.setCheckButton(obj);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.buttonComs.forEach(com => {
      com.disabled = isDisabled;
    });
    if (!isDisabled) {
      this.setCheckButton(this.modelValue);
    }
    this.cdr.markForCheck();
  }

  setCheckButton(value: any) {
    if (this.buttonComs) {
      this.buttonComs.forEach(com => {
        if (com.value === value && !com.disabled) {
          com.checked = true;
        } else {
          com.checked = false;
        }
      });
    }
  }
}