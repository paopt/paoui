import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  QueryList,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  Provider,
  forwardRef,
  InjectionToken,
  ContentChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { PaoRadioComponent } from './radio.component';
import { PaoColor, PaoLabelPosition } from './type';

// 注册表单
const RADIO_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaoRadioGroupComponent),
  multi: true
}

export const RADIO_GROUP_TOKEN = new InjectionToken<PaoRadioGroupComponent>('pao-radio-group');

let nextUniqueId = 0;

@Component({
  selector: 'pao-radio-group',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./radio.component.less'],
  host: {
    'class': 'pao-radio-group',
    '[attr.tanIndex]': 'null'
  },
  providers: [
    RADIO_VALUE_ACCESSOR,
    {
      provide: RADIO_GROUP_TOKEN,
      useExisting: PaoRadioGroupComponent
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaoRadioGroupComponent implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit {
  // 主题
  @Input() color: PaoColor = 'primary';

  // label位置
  @Input()
  set labelPosition(value: PaoLabelPosition) {
    this._labelPosition = value === 'before' ? 'before' : 'after';
    this.markRadiosForCheck();
  }
  get labelPosition(): PaoLabelPosition {
    return this._labelPosition;
  }
  private _labelPosition: PaoLabelPosition = 'after';

  // 用于radios分组
  @Input()
  set name(value: string) {
    this._name = value;
    this.setRadiosName();
  }
  get name() {
    return this._name;
  }
  private _name: string = `pao-radio-group-${nextUniqueId++}`;

  // radios分组的值
  @Input()
  set value(val: any) {
    if (val !== this._value) {
      this._value = val;
      this.setRadiosChecked();
    }
  }
  get value() {
    return this._value;
  }
  private _value: any;

  // 禁用
  @Input()
  set disabled(value: any) {
    const newValue = coerceBooleanProperty(value);
    this._disbaled = newValue;
    this.markRadiosForCheck();
  }
  get disabled() {
    return this._disbaled;
  }
  private _disbaled: boolean = false;

  @Output() change = new EventEmitter<any>();

  // radio列表
  @ContentChildren(PaoRadioComponent) radios!: QueryList<PaoRadioComponent>;

  public onChangeFn: (value: any) => void = () => {};
  public onTouchedFn: () => void = () => {};

  constructor(private elementRef: ElementRef, private focusMonitor: FocusMonitor, private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this.onTouchedFn();
      }
    });
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * 设置radio name
   */
  setRadiosName() {
    if (this.radios) {
      for (let radio of this.radios) {
        radio.name = this.name;
        radio.markForCheck();
      }
    }
  }

  /**
   * 设置radio选中状态
   */
  setRadiosChecked() {
    if (this.radios) {
      for (let radio of this.radios) {
        radio.checked = radio.value === this.value;
        radio.markForCheck();
      }
    }
  }

  /**
   * 对radio进行变更检查
   */
  markRadiosForCheck() {
    if (this.radios) {
      for (let radio of this.radios) {
        radio.markForCheck();
      }
    }
  }
}