import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { PaoButtonToggleComponent } from './button-toggle.component';

@Component({
  selector: 'pao-button-toggle-group',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./button-toggle.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaoButtonToggleGroupComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() disabled?: boolean | string;
  @Input() vertical: boolean = false;
  @ContentChildren(PaoButtonToggleComponent) buttonComs!: QueryList<PaoButtonToggleComponent>;

  private modelValue: any;
  private onChangeFn!: (_: any) => void;

  constructor(private eleRef: ElementRef, private renderer2: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-button-toggle-group');
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() { }

  writeValue(obj: any): void {
    this.modelValue = obj;
    this.setButtonToggle();
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  /**
   * 设置按钮选中状态
   */
  setButtonToggle() {
  }
}