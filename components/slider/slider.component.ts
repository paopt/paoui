import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  NgZone,
  Provider,
  forwardRef,
  ViewChild,
  Attribute,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  coerceBooleanProperty,
  NumberInput,
  BooleanInput,
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  UP_ARROW,
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
} from '@angular/cdk/keycodes';

import { PaoColor } from '../core/type';

let uniqueId = 0;

const CONTROL: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaoSliderComponent),
  multi: true,
};

@Component({
  selector: 'pao-slider',
  exportAs: 'paoSlider',
  templateUrl: 'slider.component.html',
  styleUrls: ['./slider.component.less'],
  providers: [CONTROL],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': 'id',
    '[attr.name]': 'name',
    '[tabIndex]': 'tabIndex',
    'class': 'pao-slider',
    '[class.pao-primary]': 'color === "primary"',
    '[class.pao-accent]': 'color === "accent"',
    '[class.pao-warn]': 'color === "warn"',
    '[class.pao-slider-disabled]': 'disabled',
    '[class.pao-slider-thumbLabel]': 'thumbLabel',
    '[class.pao-slider-active]': 'value > 0',
  },
})
export class PaoSliderComponent implements ControlValueAccessor, OnDestroy, AfterViewInit {
  @Input() id = `pai-slider-${++uniqueId}`;

  @Input() name: string | null = null;

  @Input() color: PaoColor = 'primary';

  @Input() displayWith!: (value: number) => string | number;

  @Input()
  set min(value: number) {
    this._min = coerceNumberProperty(value, this._min);
    if (this.value === null) {
      this.value = this._min;
    }
    this._percent = this._calculatePercent(this.value);
    this.cdr.markForCheck();
  }
  get min(): number {
    return this._min;
  }
  private _min: number = 0;

  @Input()
  set max(value: number) {
    this._max = coerceNumberProperty(value, this._max);
    this._percent = this._calculatePercent(this.value);
    this.cdr.markForCheck();
  }
  get max() {
    return this._max;
  }
  private _max = 100;

  @Input()
  set step(value: number) {
    this._step = coerceNumberProperty(value, this._step);
    if (this._step % 1 !== 0) {
      this._roundDecimal = this._step.toString().split('.').pop()!.length;
    }
  }
  get step(): number {
    return this._step;
  }
  private _step = 1;
  private _roundDecimal!: number;

  @Input()
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Input()
  set thumbLabel(value: boolean) {
    this._thumbLabel = coerceBooleanProperty(value);
  }
  get thumdLabel(): boolean {
    return this._thumbLabel;
  }
  private _thumbLabel = false;

  @Input()
  set value(value: number) {
    if (value !== this._value) {
      let val = coerceNumberProperty(value);
      if (this._roundDecimal && val !== this.min && val !== this.max) {
        val = parseFloat(val.toFixed(this._roundDecimal));
      }
      this._value = val;
      this._percent = this._calculatePercent(this._value);
      console.log(this.percent);
      this.cdr.markForCheck();
    }
  }
  get value(): number {
    if (this._value === null) {
      return this.min;
    }
    return this.min;
  }
  private _value: number = 0;

  get percent(): number {
    return this._clamp(this._percent);
  }
  private _percent = 0;

  get displayValue(): string | number {
    if (this.displayWith) {
      return this.displayWith(this.value);
    }
    if (this._roundDecimal && this.value && this.value % 1 !== 0) {
      return this.value.toFixed(this._roundDecimal);
    }
    return this.value || 0;
  }

  @Output() input = new EventEmitter();
  @Output() change = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  @ViewChild('sliderWrapper') sliderWrapper!: ElementRef;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => any = () => {};

  tabIndex: number = 0;

  private _isSliding = false;
  private _startSlide!: number | null;

  constructor(
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    @Attribute('tabindex') tabIndex: string
  ) {
    this.tabIndex = parseFloat(tabIndex) || 0;
    // 注册事件
    this.ngZone.runOutsideAngular(() => {
      const ele = this.elementRef.nativeElement;
      ele.addEventListener('focus', this._focus);
      ele.addEventListener('blur', this._blur);
      ele.addEventListener('keydown', this._onKeyDown);
      ele.addEventListener('keyup', this._onKeyUp);

      ele.addEventListener('mousedown', this._onMouseDown);
    });
  }

  ngAfterViewInit(): void {
    this.focusMonitor
      .monitor(this.elementRef.nativeElement, true)
      .subscribe((focusOrigin) => {
        if (!focusOrigin) {
          this._onTouched();
        }
      });
  }

  ngOnDestroy(): void {
    const target: HTMLElement = this.elementRef.nativeElement;
    this.focusMonitor.stopMonitoring(target);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private _onKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }

    this._isSliding = true;

    const keyCode = event.keyCode;
    const oldValue = this.value;

    if (keyCode === DOWN_ARROW || keyCode === LEFT_ARROW) {
      this._increment(-1);
    }

    if (keyCode === UP_ARROW || keyCode === RIGHT_ARROW) {
      this._increment(1);
    }

    if (oldValue !== this.value) {
      this.input.emit(this.value);
      this.change.emit(this.value);
      this.valueChange.emit(this.value);
      this._onChange(this.value);
    }
  }

  private _onKeyUp = () => {
    this._isSliding = false;
  }

  private _updateValue = (event: MouseEvent) => {
    const x = event.clientX;
    const rect = this.sliderWrapper.nativeElement.getBoundingClientRect();
    const percent = this._clamp((x - rect.left) / rect.width);
    if (percent === 0) {
      this.value = this.min;
    } else if (percent === 1) {
      this.value = this.max;
    } else {
      const exactValue = this.min + percent * (this.max - this.min);
      const closetValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
      this.value = this._clamp(closetValue, this.min, this.max);
    }
  }

  private _onMouseDown = (event: MouseEvent) => {
    if (this.disabled || this._isSliding) {
      return;
    }

    this._isSliding = true;

    this._updateValue(event);

    this._startSlide = this.value;
    this.cdr.detectChanges();

    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  }

  private _onMouseMove = (event: MouseEvent) => {
    if (this._isSliding) {
      const oldValue = this.value;
      this._updateValue(event);
      if (oldValue !== this.value) {
       this.input.emit(this.value);
     }
    }
  }

  private _onMouseUp = (event: MouseEvent) => {
    if (this._isSliding) {
      if (this.value !== this._startSlide) {
        this._onChange(this.value);
        this.change.emit(this.value);
        this.valueChange.emit(this.value);
      }
      
      this._isSliding = false;
      this._startSlide = null;

      // 删除事件
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    }
  }

  private _focus = () => {
    this.elementRef.nativeElement.focus();
  }

  private _blur = () => {
    this.elementRef.nativeElement.blur();
  }

  private _increment(nums: number) {
    this.value = this._clamp(this.value + nums * this.step, this.min, this.max);
  }

  private _clamp(value: number, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
  }

  private _calculatePercent(value: number | null) {
    return ((value || 0) - this.min) / (this.max - this.min);
  }

  getTrackBackgroundStyle() {
    return {
      'transform': `scale3d(${1-this.percent}, 1, 1)`
    };
  }

  getTrackFillStyle() {
    return {
      'transform': `scale3d(${this.percent}, 1, 1)`
    };
  }

  getThumbStyle() {
    return {

    };
  }

  static ngAcceptInputType_min: NumberInput;
  static ngAcceptInputType_max: NumberInput;
  static ngAcceptInputType_step: NumberInput;
  static ngAcceptInputType_value: NumberInput;
  static ngAcceptInputType_tabIndex: NumberInput;
  static ngAcceptInputType_invert: BooleanInput;
  static ngAcceptInputType_thumbLabel: BooleanInput;
  static ngAcceptInputType_vertical: BooleanInput;
}
