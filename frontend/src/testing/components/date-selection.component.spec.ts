import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DateSelectionComponent } from '../../app/components/modals/date-selection/date-selection.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('Date Selection Component Unit Tests', () => {
	let component: DateSelectionComponent;
	let fixture: ComponentFixture<DateSelectionComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [DateSelectionComponent, DatePipe, FormsModule],
		});

		fixture = TestBed.createComponent(DateSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should initialize today and set selected date', () => {
		const today = component.today;
		expect(today).toBeTruthy();
		expect(component.selectedDateFrom).toBe(today);
		expect(component.dateTo).toBeTruthy();
	});

	it('should calculate dateTo based on selectedDateFrom', () => {
		component.selectedDateFrom = '2024-01-01';
		component.calculateDateTo();
		expect(component.dateTo).toEqual(new Date('2024-01-11'));
	});

	it('should set dateTo to null if selectedDateFrom is empty', () => {
		component.selectedDateFrom = '';
		component.calculateDateTo();
		expect(component.dateTo).toBeNull();
	});

	it('should emit dateSelected with correct values', () => {
		spyOn(component.dateSelected, 'emit');
		spyOn(component, 'closeModal');

		component.selectedDateFrom = '2024-01-01';
		component.dateTo = new Date('2024-01-11');

		component.applyDates();

		expect(component.dateSelected.emit).toHaveBeenCalledWith({
			dateFrom: new Date('2024-01-01'),
			dateTo: new Date('2024-01-11'),
		});
		expect(component.closeModal).toHaveBeenCalled();
	});

	it('should NOT emit dateSelected if selectedDateFrom or dateTo is missing', () => {
		spyOn(component.dateSelected, 'emit');

		component.selectedDateFrom = '';
		component.dateTo = null;

		component.applyDates();

		expect(component.dateSelected.emit).not.toHaveBeenCalled();
	});

	it('should call closeModal on Escape key press', () => {
		spyOn(component, 'closeModal');

		const event = new KeyboardEvent('keydown', { key: 'Escape' });
		component.handleEscape(event);

		expect(component.closeModal).toHaveBeenCalled();
	});
});