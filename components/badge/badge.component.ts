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
	selector: '[pao-badge]',
	template: `

	`,
	styleUrls: ['./badge.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class PaoBadgeComponent implements OnInit, OnChanges {
	@Input() paoBadge: string | number | null = null;
	@Input() paoBadgeOverlap = false;
	@Input() paoBadgeDisabled = false;
	@Input() paoBadgeHidden = false;
	@Input() paoBadgeColor?: PaoBadgeColor;
	@Input() paoBadgeSize: PaoBadgeSize = 'medium';
	@Input() paoBadgePosition: PaoBadgePosition = 'above after';

	constructor(
		private eleRef: ElementRef,
		private cdr: ChangeDetectorRef,
		renderer2: Renderer2
	) { }

	ngOnChanges(changes: SimpleChanges) {}

	ngOnInit() { }
}