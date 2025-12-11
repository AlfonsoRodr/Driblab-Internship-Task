import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DateSelector } from '../../../models/date.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { formatDate } from '../../../utilities/mapper';

@Component({
	selector: 'app-date-selection',
	standalone: true,
	imports: [CommonModule, DatePipe, FormsModule],
	templateUrl: './date-selection.component.html',
})
export class DateSelectionComponent implements OnInit {
	@Output() close = new EventEmitter<void>();
	@Output() dateSelected = new EventEmitter<DateSelector>();

	public selectedDateFrom: string = '';
  	public dateTo: Date | null = null;
  	public today: string = '';

	public isClosing = false;

	ngOnInit() {
		this.today = formatDate(new Date());
		this.setSelectedDateToday();
	}

	public setSelectedDateToday() {
		this.selectedDateFrom = this.today;
		this.calculateDateTo();
	}

	public calculateDateTo() {
		if (!this.selectedDateFrom) {
			this.dateTo = null;
			return;
		}
		const dateFromObj = new Date(this.selectedDateFrom);
		const dateToObj = new Date(dateFromObj);
		dateToObj.setDate(dateToObj.getDate() + 10);
		this.dateTo = dateToObj;
	}

	public applyDates() {
		if (this.selectedDateFrom && this.dateTo) {
			const dateFromObj = new Date(this.selectedDateFrom);

			this.dateSelected.emit({
				dateFrom: dateFromObj,
				dateTo: this.dateTo,
			});
			this.closeModal();
		}
  	}

  	public closeModal() {
    	this.isClosing = true;
		setTimeout(() => {
			this.close.emit();
			this.isClosing = false;
		}, 300);
  	}

	@HostListener('document:keydown', ['$event'])
	public handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.closeModal();
		}
	}
}