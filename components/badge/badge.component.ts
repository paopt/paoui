import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ViewEncapsulation,
	Input,
	OnChanges,
	SimpleChanges,
	ElementRef,
	ChangeDetectorRef,
	Renderer2
} from '@angular/core';
import { PaoBadgeColor, PaoBadgePosition, PaoBadgeSize } from './type';

@Component({
	selector: '[paoBadge]',
	template: `
		<ng-content></ng-content>
		<span class="pao-badge-content" *ngIf="!paoBadgeHidden" [class.disabled]="paoBadgeDisabled">{{paoBadge}}</span>
	`,
	host: {
		'[class.pao-badge-small]': "paoBadgeSize === 'small'",
		'[class.pao-badge-medium]': "paoBadgeSize === 'medium'",
		'[class.pao-badge-large]': "paoBadgeSize === 'large'",
		'[class.pao-badge-primary]': "paoBadgeColor === 'primary'",
		'[class.pao-badge-accent]': "paoBadgeColor === 'accent'",
		'[class.pao-badge-warn]': "paoBadgeColor === 'warn'",
		'[class.pao-badge-overlap]': 'paoBadgeOverlap',
	},
	styleUrls: ['./badge.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class PaoBadgeComponent implements OnInit, OnChanges {
	@Input() paoBadge: string | number | null = null;
	@Input() paoBadgeOverlap = false;
	@Input() paoBadgeDisabled = false;
	@Input() paoBadgeHidden = false;
	@Input() paoBadgeColor?: PaoBadgeColor = 'primary';
	@Input() paoBadgeSize: PaoBadgeSize = 'medium';
	@Input() paoBadgePosition: PaoBadgePosition = 'above after';

	cls = '';

	constructor(
		private eleRef: ElementRef,
		private cdr: ChangeDetectorRef,
		private renderer2: Renderer2
	) {
		this.renderer2.addClass(this.eleRef.nativeElement, 'pao-badge');
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.paoBadgePosition) {
			this.setBadgePosition();
		}
	}

	ngOnInit() {
		this.setBadgePosition();
	}

	setBadgePosition() {
		this.paoBadgePosition.split(' ').forEach(v => {
			this.renderer2.addClass(this.eleRef.nativeElement, 'pao-badge-' + v);
		});
		this.cdr.markForCheck();
	}
}