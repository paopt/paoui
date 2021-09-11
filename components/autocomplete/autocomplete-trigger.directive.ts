import { Directive, Input, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Overlay, OverlayRef, } from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';

import { PaoAutocompleteComponent } from './autocomplete.component';

@Directive({ selector: 'input[paoAutocomplete]' })
export class PaoAutocompleteTriggerDirective implements OnInit {
  @Input() paoAutocomplete!: PaoAutocompleteComponent;
  
  overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private eleRef: ElementRef, private renderer2: Renderer2) { }

  ngOnInit() {
    if (this.paoAutocomplete) {
      this.paoAutocomplete.optionSelected.subscribe(value => {
        this.renderer2.setProperty(this.eleRef.nativeElement, 'value', value);
        this.closePanel();
      });
    }
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.paoAutocomplete.isOpen) {
      this.openPanel();
    }
  }

  @HostListener('document:click', ['$event'])
  handleBodyClick(event: MouseEvent) {
    this.closePanel();
  }

  openPanel() {
    const position = this.overlay.position()
      .flexibleConnectedTo(this.eleRef.nativeElement)
      .withPositions(
        [
          {
            overlayX: 'start',
            overlayY: 'top',
            originX: 'start',
            originY: 'bottom'
          }
        ]
      );
    this.overlayRef = this.overlay.create({
      positionStrategy: position,
      // scrollStrategy: this.overlay.scrollStrategies.block()
    });
    this.overlayRef.attach(new DomPortal(this.paoAutocomplete.panel));
    this.paoAutocomplete.isOpen = true;
    this.paoAutocomplete.opened.next();
    const width = this.eleRef.nativeElement.offsetWidth + 'px';
    this.paoAutocomplete.setWidth(width);
  }

  closePanel() {
    this.overlayRef.detach();
    this.paoAutocomplete.isOpen = false;
    this.paoAutocomplete.closed.next();
  }

  /**
   * 计算位置
   */
  computePosition() {

  }
}