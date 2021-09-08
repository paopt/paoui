import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: '[pao-card-avatar]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.less']
})
export class PaoCardAvatarComponent {
  constructor(private renderer2: Renderer2, private eleRef: ElementRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-card-avatar');
  }
}