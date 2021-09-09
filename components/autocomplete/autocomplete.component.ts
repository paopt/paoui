import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  ViewChild,
  SimpleChanges,
  OnChanges
} from '@angular/core';

import { PaoOptionComponent } from './option.component';
import { PaoOptgroupComponent } from './optgroup.component';

@Component({
  selector: 'pao-autocomplete',
  exportAs: 'paoAutoComplete',
  template: `
    <div class="pao-autocomplete-panel" #panel (click)="handleClick($event)">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./autocomplete.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaoAutocompleteComponent implements OnChanges {
  @Input() panelClass: string = '';
  @Input() panelWidth: string = '';
  @Input() panelMaxHeight?: string;
  @Input() displayWith?: (_: any) => any;

  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();
  @Output() optionSelected = new EventEmitter<any>();

  @ContentChildren(PaoOptionComponent) options!: QueryList<PaoOptionComponent>;
  @ContentChildren(PaoOptgroupComponent) groups!: QueryList<PaoOptgroupComponent>;

  @ViewChild('panel') panel!: ElementRef;

  isOpen: boolean = false;

  constructor(private eleRef: ElementRef, private renderer2: Renderer2, private cdr: ChangeDetectorRef) {
    this.renderer2.addClass(this.eleRef.nativeElement, 'pao-autocomplete');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.panelClass) {
      this.renderer2.addClass(this.eleRef.nativeElement, this.panelClass || '');
    }
    if (changes.panelMaxHeight) {
      this.renderer2.setStyle(this.eleRef.nativeElement, 'max-height', this.panelMaxHeight);
    }
    if (changes.panelWidth) {
      this.setWidth(this.panelWidth);
    }
  }

  setWidth(width: string) {
    if (width) {
      this.renderer2.setStyle(this.panel.nativeElement, 'width', width);
    }
  }

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.groups?.length) {
      for (const group of this.groups) {
        const selected = this.selectOption(group.options, target);
        if (selected) {
          return;
        }
      }
    }

    if (this.options?.length) {
      this.selectOption(this.options, target);
    }
  }

  selectOption(options: QueryList<PaoOptionComponent>, ele: HTMLElement) {
    if (options) {
      const selected = options.find(opt => opt.eleRef.nativeElement.contains(ele));
      if (selected) {
        let value: any;
        if (this.displayWith) {
          value = this.displayWith(selected.value);
        } else {
          value = selected.value
        }
        this.optionSelected.next(value);
      }
      return selected;
    }
    return null;
  }
}