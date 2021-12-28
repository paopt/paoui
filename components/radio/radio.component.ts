import {
  Component,
  OnInit,
  Input,
  Output,
  Inject,
  Optional,
  ElementRef,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import {
  PaoRadioGroupComponent,
  RADIO_GROUP_TOKEN,
} from './radio-group.component';
import { PaoColor, PaoLabelPosition } from './type';
import { RadioService } from './radio.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';

let nextUniqueId = 0;

@Component({
  selector: 'pao-radio-button',
  exportAs: 'paoRadioButton',
  templateUrl: 'radio.component.html',
  styleUrls: ['./radio.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
     'class': 'pao-radio-button',
    '[attr.id]': 'id',
    '[class.pao-primary]': 'color === "primary"',
    '[class.pao-accent]': 'color === "accent"',
    '[class.pao-warn]': 'color === "warn"',
    '[class.pao-radio-disabled]': 'disabled',
    '[class.pao-radio-checked]': 'checked',
    '[class.pao-radio-label-before]': 'labelPosition === "before"'
  },
})
export class PaoRadioComponent implements OnInit, OnDestroy, AfterViewInit {
  private _id = `pao-radio-${nextUniqueId++}`;
  @Input() id = this._id;
  inputId = `${this.id || this._id}-input`;

  @Input() name!: string;

  // radio主题
  @Input()
  set color(value: PaoColor) {
    this._color = value;
  }
  get color() {
    // color要保证有值
    return this._color || this.radioGroup?.color || 'primary';
  }
  private _color: PaoColor = 'primary';

  // 禁用
  @Input()
  set disabled(value: any) {
    const newValue = coerceBooleanProperty(value);
    this._disabled = newValue;
  }
  get disabled(): boolean {
    return this._disabled || this.radioGroup?.disabled;
  }
  private _disabled: boolean = false;

  @Input()
  set labelPosition(value: PaoLabelPosition) {
    this._labelPosition = value === 'before' ? 'before' : 'after';
  }
  get labelPosition() {
    return this._labelPosition || this.radioGroup?.labelPosition || 'after';
  }
  private _labelPosition: PaoLabelPosition = 'after';

  // 选中状态
  @Input()
  set checked(value: boolean) {
    this._checked = value;
    // 更新其他radio
    if (this._checked) {
      this.radioService.subject.next({
        id: this.id,
        name: this.name
      });
    }
  }
  get checked() {
    return this._checked;
  }
  private _checked: boolean = false;

  @Input()
  set value(value: any) {
    this._value = value;
    this.checked = this.value === this.radioGroup?.value;
  }
  get value() {
    return this._value;
  }
  private _value: any;

  @Input() tabIndex = 0;

  @Output() change = new EventEmitter<any>();
  private destory$ = new Subject();

  constructor(
    @Optional()
    @Inject(RADIO_GROUP_TOKEN)
    private radioGroup: PaoRadioGroupComponent,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private radioService: RadioService,
    private focusMonitor: FocusMonitor
  ) {}

  ngOnInit() {
    this.radioService.subject.pipe(
      takeUntil(this.destory$)
    ).subscribe(data => {
      if (this.id !== data.id && this.name === data.name) {
        this.checked = false;
      }
    });

    if (this.radioGroup) {
      this.name = this.radioGroup.name;
    }
  }

  ngAfterViewInit() {
    this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(focusOrigin => {
      if (!focusOrigin && this.radioGroup) {
        this.radioGroup.onTouchedFn();
      }
    });
  }
  
  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }

  markForCheck() {
    this.cdr.markForCheck();
  }

  focus() {
    this.elementRef.nativeElement.focus();
  }

  handleChange(event: Event) {
    event.stopPropagation();
  }

  handleClick(event: Event) {
    if (this.disabled) {
      return;
    }
    event.stopPropagation();
    this.checked = true;
    this.change.emit(this.value);
    if (this.radioGroup) {
      this.radioGroup.value = this.value;
      this.radioGroup.onChangeFn(this.value);
      this.radioGroup.change.emit(this.value);
    }
  }
}
