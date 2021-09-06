import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'pao-button-toggle',
  exportAs: 'paoButtonToggle',
  template: `
    <button class="pao-button-toggle-button" (click)="handleClick()">
      <span class="pao-button-toggle-content">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styleUrls: ['./button-toggle.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.pao-button-toggle-checked]': 'checked && !disabled'
  }
})
export class PaoButtonToggleComponent implements OnChanges {
  @Input() value: any;
  @Input() checked?: boolean | string;
  @Input() disabled?: boolean | string;

  @Output() onSelect = new EventEmitter<any>();

  constructor(private eleRef: ElementRef, private renderer2: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-button-toggle');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled || changes.checked) {
      this.setButtonStatus();
    }
  }

  setButtonStatus() {
    if (typeof this.disabled === 'string') {
      this.disabled = true;
    }
    if (typeof this.checked === 'string') {
      this.checked = true;
    }
    this.cdr.markForCheck();
  }

  handleClick() {
    if (!this.disabled) {
      this.onSelect.emit(this.value);
    }
  }
}