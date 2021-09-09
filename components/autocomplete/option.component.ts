import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  Renderer2,
  Input
} from '@angular/core';

@Component({
  selector: 'pao-option',
  template: `
    <span><ng-content></ng-content></span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaoOptionComponent {
  @Input() value: any;

  constructor(public eleRef: ElementRef, private renderer2: Renderer2) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-option');
  }
}