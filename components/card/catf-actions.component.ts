import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'pao-card-actions',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaoCardActionsComponent {
  constructor(private renderer2: Renderer2, private eleRef: ElementRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-card-actions');
  }
}