import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-go-back-button',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Default,
	templateUrl: './go-back-button.component.html',
})
export class GoBackButtonComponent {
	@Output() previousPageFunc = new EventEmitter<void>();

	public goBack() {
		this.previousPageFunc.emit();
	}
}