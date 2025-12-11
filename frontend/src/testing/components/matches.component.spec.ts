import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesComponent } from '../../app/components/matches/matches.component';
import { MainService } from '../../app/services/main.service';
import { Router } from '@angular/router';
import { ReplaySubject, of, throwError } from 'rxjs';
import { League } from '../../app/models/league.model';
import { Match } from '../../app/models/match.model';

describe('Matches Component Unit Tests', () => {
	let component: MatchesComponent;
	let fixture: ComponentFixture<MatchesComponent>;

	let mainServiceMock: any;
	let routerMock: any;

	let selectedLeagueSubject: ReplaySubject<League>;
	let dateRangeSubject: ReplaySubject<{ dateFrom: Date; dateTo: Date }>;

	const mockLeague: League = {
		country: 'ES',
		flag: 'flag.png',
		leagueName: 'La Liga',
		leagueCode: 'LL',
		logo: 'logo.png',
	};

	const mockDateRange = {
		dateFrom: new Date('2024-01-01'),
		dateTo: new Date('2024-01-10'),
	};

	const mockMatches: Match[] = Array.from({ length: 15 }, (_, i) => ({
		date: new Date(`2024-01-${String(i + 1).padStart(2, '0')}`),
		homeTeam: { name: `Home${i}`, tla: `H${i}`, logo: '' },
		awayTeam: { name: `Away${i}`, tla: `A${i}`, logo: '' },
		duration: '90M',
		fullTime: { home: i, away: i },
		halfTime: { home: 0, away: 0 },
		refereeName: 'Ref',
	}));

	beforeEach(() => {
		selectedLeagueSubject = new ReplaySubject<League>(1);
		dateRangeSubject = new ReplaySubject<{ dateFrom: Date; dateTo: Date }>(1);

		mainServiceMock = {
			selectedLeague$: selectedLeagueSubject.asObservable(),
			dateRange$: dateRangeSubject.asObservable(),
			getMatches: jasmine.createSpy('getMatches'),
		};

		routerMock = {
			navigate: jasmine.createSpy('navigate'),
		};

		TestBed.configureTestingModule({
			imports: [MatchesComponent],
			providers: [
				{ provide: MainService, useValue: mainServiceMock },
				{ provide: Router, useValue: routerMock },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchesComponent);
		component = fixture.componentInstance;

		// Emitimos valores iniciales antes de detectChanges
		dateRangeSubject.next(mockDateRange);
		selectedLeagueSubject.next(mockLeague);
	});

	it('should set league and dates on init and load matches', () => {
		mainServiceMock.getMatches.and.returnValue(of([]));

		fixture.detectChanges();

		expect(component.currentLeague).toEqual(mockLeague);
		expect(component.dateFrom).toEqual(mockDateRange.dateFrom);
		expect(component.dateTo).toEqual(mockDateRange.dateTo);
		expect(mainServiceMock.getMatches).toHaveBeenCalledWith(
			'LL',
			mockDateRange.dateFrom,
			mockDateRange.dateTo
		);
	});

	it('should load matches successfully and paginate', () => {
		mainServiceMock.getMatches.and.returnValue(of(mockMatches));

		fixture.detectChanges();

		expect(component.matches.length).toBe(15);
		expect(component.displayedMatches.length).toBe(10);
		expect(component.hasMore()).toBeTrue();

		component.loadMoreMatches();
		expect(component.displayedMatches.length).toBe(15);
		expect(component.hasMore()).toBeFalse();
	});

	it('should set errorMessage if getMatches fails', () => {
		mainServiceMock.getMatches.and.returnValue(throwError(() => new Error('API Error')));

		fixture.detectChanges();

		expect(component.isLoading).toBeFalse();
		expect(component.errorMessage).toBe('Error loading the matches from the api');
	});

	it('should go back to standings', () => {
		component.goBack();
		expect(routerMock.navigate).toHaveBeenCalledWith(['standings']);
	});

	it('should reset matches correctly', () => {
		component.matches = [...mockMatches];
		component.displayedMatches = [...mockMatches.slice(0, 5)];
		component.loadMoreMatches();
		component['reset']();
		expect(component.matches).toEqual([]);
		expect(component.displayedMatches).toEqual([]);
		expect(component['currentIndex']).toBe(0);
	});
});