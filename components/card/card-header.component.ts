import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'pao-card-header',
  template: `
    <ng-content></ng-content>
    <div class="pao-card-header-text">
      <ng-content select="pao-card-title"></ng-content>
      <ng-content select="pao-card-subtitle"></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaoCardHeaderComponent {
  constructor(private renderer2: Renderer2, private eleRef: ElementRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-card-header');
  }
}