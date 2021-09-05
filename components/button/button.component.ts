import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  Input
} from '@angular/core';

import { PaoButtonColor } from './type';

@Component({
  selector: `
    button[pao-button],
    button[pao-raised-button],
    button[pao-stroked-button],
    button[pao-flat-button],
    button[pao-icon-button],
    button[pao-fab],
    button[pao-mini-fab],
  `,
  template: `
    <span><ng-content></ng-content></span>
  `,
  styleUrls: ['./button.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.pao-button-primary]': 'color === "primary"',
    '[class.pao-button-accent]': 'color === "accent"',
    '[class.pao-button-warn]': 'color === "warn"'
  }
})
export class PaoButtonComponent implements OnInit, OnChanges {
  @Input() disabled?: boolean | string;
  @Input() color?: PaoButtonColor;

  constructor(
    private eleRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer2: Renderer2) {
      this.renderer2.addClass(this.eleRef.nativeElement, 'pao-button');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      this.setDisabled();
    }
  }

  ngOnInit() {
  }

  setDisabled() {
    if (this.disabled || typeof this.disabled === 'string') {
      this.renderer2.setAttribute(this.eleRef.nativeElement, 'disabled', 'true');
    } else {
      this.renderer2.removeAttribute(this.eleRef.nativeElement, 'disabled');
    }
    this.cdr.markForCheck();
  }
}