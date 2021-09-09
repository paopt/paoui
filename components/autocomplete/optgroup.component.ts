import {
  Component,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
  ChangeDetectionStrategy,
  Renderer2,
  Input,
  ContentChildren,
  QueryList,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { PaoOptionComponent } from './option.component';

@Component({
  selector: 'pao-optgroup',
  template: `
    <span class="pao-optgroup-label">{{label}}</span>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaoOptgroupComponent implements OnChanges{
  @Input() label!: string;
  @ContentChildren(PaoOptionComponent) options!: QueryList<PaoOptionComponent>;

  constructor(private eleRef: ElementRef, private renderer2: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-optgroup');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.label) {
      this.cdr.markForCheck();
    }
  }
}