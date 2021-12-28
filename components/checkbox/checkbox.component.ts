import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  forwardRef,
  Provider,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { PaoColor } from './type';

let nextUniqueId = 0;
const CHECKBOX_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PaoCheckboxComponent),
    multi: true
};

@Component({
  selector: 'pao-checkbox',
  exportAs: 'paoCheckbox',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['./checkbox.component.less'],
  providers: [
    CHECKBOX_ACCESSOR
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'pao-checkbox',
    '[id]': 'id',
    '[class.pao-primary]': 'color === "primary"',
    '[class.pao-accent]': 'color === "accent"',
    '[class.pao-warn]': 'color === "warn"',
    '[class.pao-checkbox-checked]': 'checked',
    '[class.pao-checkbox-disabled]': 'disabled',
    '[class.pao-checkbox-indeterminate]': 'indeterminate',
    '[class.pao-checkbox-label-before]': 'labelPosition === "before"'
  }
})
export class PaoCheckboxComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() color: PaoColor = 'primary';

  // 选中
  @Input()
  set checked(val: boolean) {
    if (this.checked !== val) {
      this._checked = val;
    }
  }
  get checked(): boolean {
    return this._checked;
  }
  private _checked = false;

  // 禁用
  @Input()
  set disabled(val: any) {
    const newValue = coerceBooleanProperty(val);
    if (newValue !== this.disabled) {
      this._disabled = val;
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  // 未决状态
  @Input()
  set indeterminate(val: boolean) {
    const newValue = coerceBooleanProperty(val);
    if (newValue !== this.indeterminate) {
      this._indeterminate = val;
      this.indeterminateChange.emit(this.indeterminate);
    }
    this.syncIndeterminate();
  }
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  private _indeterminate = false;

  private _uniqueId = `pao-checkbox-${++nextUniqueId}`;
  @Input() id = this._uniqueId;
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }

  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() name: string | null = null;
  @Input() value: string | null = null;

  @Input()
  set tabIndex(value: number) {
    this._tabIndex = value != null ? coerceNumberProperty(value) : 0;
  }
  get tabIndex(): number {
    return this.disabled ? -1 : this._tabIndex;
  }
  private _tabIndex: number = 0;

  @Output() change = new EventEmitter<boolean>();
  @Output() indeterminateChange = new EventEmitter<boolean>();

  // 设置隐藏input，无障碍访问
  @ViewChild('input') inputElement!: ElementRef;

  onChangeFn: (_: any) => void = () => {}
  onTouchedFn: () => void = () => {};

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private focusMonitor: FocusMonitor
  ) {}

  ngOnInit() { }

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this.onTouchedFn();
        this.cdr.markForCheck();
      }
    })
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }

  writeValue(obj: any): void {
    this.checked = !!obj;
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

  toggle() {
    this.checked = !this.checked;
  }

  /**
   * input click事件，阻止冒泡，防止label上click事件触发两次
   * @param event 
   */
  handleClick(event: Event) {
    event.stopPropagation();

    if (!this.disabled) {
      // 处理未决状态
      if (this.indeterminate) {
        this.indeterminate = false;
        this.indeterminateChange.emit(this.indeterminate);
        this.syncIndeterminate();
      }

      // 处理check状态
      this.toggle();
      this.change.emit(this.checked);
      this.onChangeFn(this.checked);
    }
  }

  /**
   * input change事件，阻止冒泡
   * @param event 
   */
  handleChange(event: Event) {
    event.stopPropagation();
  }

  /**
   * 设置未决状态
   */
  syncIndeterminate() {
    if (this.inputElement) {
      this.inputElement.nativeElement.indeterminate = this.indeterminate;
    }
  }

  /**
   * 获取焦点
   */
  focus() {
    this.inputElement.nativeElement.foucs();
  }
}