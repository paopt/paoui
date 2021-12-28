import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, Provider, forwardRef, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

let uniqueId = 0;

const CONTROL: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaoSlideToggleComponent),
  multi: true
};

@Component({
  selector: 'pao-slide-toggle',
  templateUrl: 'slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.less'],
  providers: [
    CONTROL
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'pao-slide-toggle',
    '[attr.id]': 'id',
    '[attr.tabIndex]': 'null',
    '[class.pao-primary]': 'color === "primary"',
    '[class.pao-accent]': 'color === "accent"',
    '[class.pao-warn]': 'color === "warn"',
    '[class.pao-slide-toggle-checked]': 'checked',
    '[class.pao-slide-toggle-before]': 'labelPosition === "before"',
    '[class.pao-slide-toggle-disabled]': 'disabled'
  }
})
export class PaoSlideToggleComponent implements OnInit, ControlValueAccessor{
  private _id = `pao-slide-toggle${++uniqueId}`;
  @Input() id = this._id;
  inputId = `${this.id || this._id}-input`;

  @Input() name: string | null = null;

  @Input() labelPosition: 'before' | 'after' = 'after';

  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input() tabIndex = 0;

  @Input()
  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
    console.log(this._disabled);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Input()
  set checked(value: boolean) {
    this._checked = coerceBooleanProperty(value);
  }
  get checked(): boolean {
    return this._checked;
  }
  private _checked = false;

  value!: boolean;

  private onChange = (value: any) => {};
  private onTouched = () => {};

  @ViewChild('input') input!: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor
  ) {}

  ngOnInit() { }

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this.onTouched();
        this.cdr.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }

  writeValue(obj: any): void {
    this.checked = obj;
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

  focus() {
    this.input.nativeElement.focus();
  }

  toggle() {
    this.checked = !this.checked;
    this.onChange(this.checked);
  }

  handleClick(event: Event) {
    event.stopPropagation();
    if (!this.disabled) {
      this.toggle();
    }
  }
  
  handleChange(event: Event) {
    event.stopPropagation();
  }
}