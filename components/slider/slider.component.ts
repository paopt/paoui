import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  NgZone,
  Renderer2,
  Provider,
  forwardRef,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  coerceBooleanProperty,
  NumberInput,
  BooleanInput,
} from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

import { PaoColor } from '../core/type';

let uniqueId = 0;

const CONTROL: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaoSliderComponent),
  multi: true
}

@Component({
  selector: 'pao-slider',
  exportAs: 'paoSlider',
  templateUrl: 'slider.component.html',
  styleUrls: ['./slider.component.less'],
  providers: [
    CONTROL
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': 'id',
    '[attr.name]': 'name',
    '[attr.tabIndex]': 'tabIndex',
    'class': 'pao-slider',
    '[class.pao-primary]': 'color === "primary"',
    '[class.pao-accent]': 'color === "accent"',
    '[class.pao-warn]': 'color === "warn"',
    '[class.pao-slider-disabled]': 'disabled',
    '[class.pao-slider-vertical]': 'vertical',
    '[class.pao-slider-invert]': 'invert',
    '[class.pao-slider-thumbLabel]': 'thumbLabel',
    '[class.pao-slider-active]': 'value > 0'
  },
})
export class PaoSliderComponent
  implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit {
  @Input() id = `pai-slider-${++uniqueId}`;

  @Input() name: string | null = null;

  @Input() color: PaoColor = 'primary';

  @Input() min: number = 0;

  @Input() max: number = 100;

  @Input() step: number = 1;

  @Input() tickInterval: number = 0;

  @Input() tabIndex: number = 0;

  @Input() displayWith: (value: number) => string | number = (value) => value;

  @Input()
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Input()
  set invert(value: boolean) {
    this._invert = coerceBooleanProperty(value);
  }
  get invert(): boolean {
    return this._invert;
  }
  private _invert = false;

  @Input()
  set thumbLabel(value: boolean) {
    this._thumbLabel = coerceBooleanProperty(value);
  }
  get thumdLabel(): boolean {
    return this._thumbLabel;
  }
  private _thumbLabel = false;

  @Input()
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }
  get vertical() {
    return this._vertical;
  }
  private _vertical = false;

  @Input()
  set value(val: number) {
    this._value = val;
  }
  get value(): number {
    return this._value;
  }
  private _value: number = 0;

  @Output() change = new EventEmitter();
  @Output() input = new EventEmitter();

  @ViewChild('thumb') thumbEleRef!: ElementRef;
  @ViewChild('track') trackEleRef!: ElementRef;
  @ViewChild('ball') ballEleRef!: ElementRef;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => any = () => {};

  private isDragging = false;
  private startX: number = 0;
  private thumbX: number = 0;
  private hasFocus = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private renderer2: Renderer2
  ) {
  }

  ngOnInit() {
  }

  /**
   * 绑定事件
   */
  ngAfterViewInit(): void {
    this.thumbX = this.thumbEleRef.nativeElement.getBoundingClientRect().left;
    // 焦点监听
    this.focusMonitor
      .monitor(this.elementRef.nativeElement, true)
      .subscribe((focusOrigin) => {
        if (focusOrigin) {
          this.hasFocus = true;
        } else {
          this.hasFocus = false;
          this.onTouched();
        }
      });

    // 注册事件
    this.ngZone.runOutsideAngular(() => {
      this.elementRef.nativeElement.addEventListener('click', this._onClick);
      this.ballEleRef.nativeElement.addEventListener('mousedown', this._onMousedown);
      document.addEventListener('mousemove', this._onMousemove);
      document.addEventListener('mouseup', this._onMouseup);
      document.addEventListener('keydown', this._onKeydown);
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
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /**
   * 处理mousedown事件， 拖动开始
   * @param event 
   */
  private _onMousedown = (event: MouseEvent) => {
    event.stopPropagation();
    this.isDragging = true;
    this.startX = event.clientX;
  }

  /**
   * 处理mousemove事件, 拖动中
   * @param event 
   */
  private _onMousemove = (event: MouseEvent) => {
    if (this.isDragging) {
      const dis = event.clientX - this.startX;
      this.startX = event.clientX;
      const rect = this.thumbEleRef.nativeElement.getBoundingClientRect();
      const distance = rect.left - this.thumbX + dis;
      const percent = (distance / rect.width);
      console.log(percent);
      this.updateValue(percent);
    //   console.log(this.value);
    //   // let percent = (this.value / this.max) * 100;
    // this.thumbEleRef.nativeElement.style.transform = `translateX(${percent}%)`;
    // this.onChange(this.value);
    // this.value = Math.ceil((this.max * percent) / this.step) * this.step;
    }
  }

  /**
   * 处理mouseup事件， 拖动结束
   * @param event 
   */
  private _onMouseup = (event: any) => {
    this.isDragging = false;
  }

  /**
   * 处理点击事件
   * @param event 
   */
  private _onClick = (event: MouseEvent) => {
    const rect = this.trackEleRef.nativeElement.getBoundingClientRect();
    const { width, left } = rect;
    const percent = (event.clientX - left) / width;
    this.updateValue(percent);
  }

  /**
   * 获得焦点时，处理键盘事件
   * @param event 
   */
  private _onKeydown = (event: KeyboardEvent) => {
    if (!this.hasFocus) {
      return;
    }

    const keyCode = event.keyCode;

    // value减少一步
    if (keyCode === DOWN_ARROW || keyCode === LEFT_ARROW) {
      this.value -= this.step;
    }
    
    // value增加一步
    if (keyCode === UP_ARROW || keyCode === RIGHT_ARROW) {
      this.value += this.step;
    }
    this.updateSliderThumb();
  }

  /**
   * 根据百分比计算当前值
   * @param percent 
   */
  private updateValue(percent: number) {
    this.value = Math.round((this.max * percent) / this.step) * this.step;
    this.updateSliderThumb();
  }

  /**
   * 根据value值，更新滑块位置
   */
  private updateSliderThumb() {
    this.value = Math.max(this.min, this.value);
    this.value = Math.min(this.max, this.value);
    let percent = (this.value / this.max) * 100;
    this.thumbEleRef.nativeElement.style.transform = `translateX(${percent}%)`;
    this.onChange(this.value);
    this.cdr.markForCheck();
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
