import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeagueComponent } from '../../app/components/league/league.component';
import { MainService } from '../../app/services/main.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { League } from '../../app/models/league.model';

describe('League Component Unit Tests', () => {
	let component: LeagueComponent;
	let fixture: ComponentFixture<LeagueComponent>;

	let mainServiceMock: any;
	let routerMock: any;

	const mockLeagues: League[] = [
		{
			country: 'ES',
			flag: 'flag.png',
			leagueName: 'La Liga',
			leagueCode: 'LL',
			logo: 'logo.png',
		},
		{
			country: 'EN',
			flag: 'flag.png',
			leagueName: 'Premier League',
			leagueCode: 'PL',
			logo: 'logo.png',
		},
	];

	beforeEach(() => {
		mainServiceMock = {
			getAvailableLeagues: jasmine.createSpy('getAvailableLeagues'),
			setSelectedLeague: jasmine.createSpy('setSelectedLeague'),
		};

		routerMock = {
			navigate: jasmine.createSpy('navigate'),
		};

		TestBed.configureTestingModule({
			imports: [LeagueComponent],
			providers: [
				{ provide: MainService, useValue: mainServiceMock },
				{ provide: Router, useValue: routerMock },
			],
		});

		fixture = TestBed.createComponent(LeagueComponent);
		component = fixture.componentInstance;
	});

	it('should load leagues on init', () => {
		mainServiceMock.getAvailableLeagues.and.returnValue(of(mockLeagues));

		fixture.detectChanges();

		expect(component.allLeagues).toEqual(mockLeagues);
		expect(component.errorMessage).toBe('');
	});

	it('should set errorMessage if getAvailableLeagues fails', () => {
		mainServiceMock.getAvailableLeagues.and.returnValue(
			throwError(() => new Error('API Error'))
		);

		fixture.detectChanges();

		expect(component.allLeagues).toEqual([]);
		expect(component.errorMessage).toBe('An error occur trying to fetch the data from the api');
	});

	it('should select league and navigate to standings', () => {
		const league = mockLeagues[0];

		component.selectLeague(league);

		expect(mainServiceMock.setSelectedLeague).toHaveBeenCalledWith(league);
		expect(routerMock.navigate).toHaveBeenCalledWith(['standings']);
	});
});