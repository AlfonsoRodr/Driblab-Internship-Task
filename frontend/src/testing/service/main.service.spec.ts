import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MainService } from '../../app/services/main.service';
import { environment } from '../../environments/environment';
import { League } from '../../app/models/league.model';
import { Standings } from '../../app/models/standings.model';
import { Match } from '../../app/models/match.model';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('Main Service Unit Tests', () => {
	let service: MainService;
	let httpMock: HttpTestingController;

	const apiUrl = '/api/v4/competitions';

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [MainService, provideHttpClient(withFetch()), provideHttpClientTesting()],
		});
		service = TestBed.inject(MainService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should get and map available leagues', () => {
		const mockResponse = {
			competitions: [
				{
					type: 'LEAGUE',
					area: { code: 'ES', flag: 'flag.png' },
					name: 'La Liga',
					code: 'ESP',
					emblem: 'logo.png',
				},
			],
		};

		service.getAvailableLeagues().subscribe((leagues: League[]) => {
			expect(leagues.length).toBe(1);
			expect(leagues[0].leagueCode).toBe('ESP');
			expect(leagues[0].leagueName).toBe('La Liga');
		});

		const req = httpMock.expectOne(apiUrl);
		expect(req.request.method).toBe('GET');
		expect(req.request.headers.get('X-Auth-Token')).toBe(environment.apiKey);
		req.flush(mockResponse);
	});

	it('should update selectedLeague$', () => {
		const mockLeague: League = {
			country: 'ES',
			flag: 'flag.png',
			leagueName: 'La Liga',
			leagueCode: 'ESP',
			logo: 'logo.png',
		};

		let result: League | undefined;

		service.selectedLeague$.subscribe((league) => {
			result = league;
		});

		service.setSelectedLeague(mockLeague);

		expect(result!.leagueCode).toBe('ESP');
	});

	it('should update dateRange$', () => {
		const dates = {
			dateFrom: new Date('2025-01-01'),
			dateTo: new Date('2025-01-10'),
		};

		let result: any;

		service.dateRange$.subscribe((r) => (result = r));

		service.setDateRange(dates);

		expect(result.dateFrom).toEqual(dates.dateFrom);
		expect(result.dateTo).toEqual(dates.dateTo);
	});

	it('should get and map standings', () => {
		const mockResponse = {
			standings: [
				{
					table: [
						{
							position: 1,
							team: { name: 'FC Barcelona', tla: 'FCB', crest: 'logo.png' },
							playedGames: 20,
							won: 15,
							draw: 3,
							lost: 2,
							points: 48,
							goalsFor: 45,
							goalsAgainst: 20,
							goalDifference: 25,
						},
					],
				},
			],
		};

		service.getStandings('ESP').subscribe((s: Standings[]) => {
			expect(s.length).toBe(1);
			expect(s[0].team.name).toBe('FC Barcelona');
			expect(s[0].points).toBe(48);
		});

		const req = httpMock.expectOne(`${apiUrl}/ESP/standings`);
		expect(req.request.method).toBe('GET');
		expect(req.request.headers.get('X-Auth-Token')).toBe(environment.apiKey);
		req.flush(mockResponse);
	});

	it('should get and map matches', () => {
		const mockResponse = {
			matches: [
				{
					utcDate: '2025-02-10',
					homeTeam: { shortName: 'Barça', tla: 'FCB', crest: 'logo1.png' },
					awayTeam: { shortName: 'Madrid', tla: 'RMA', crest: 'logo2.png' },
					score: {
						duration: 'REGULAR',
						fullTime: { home: 2, away: 1 },
						halfTime: { home: 1, away: 1 },
					},
					referees: [{ name: 'Ref A' }],
				},
			],
		};

		const from = new Date('2025-02-01');
		const to = new Date('2025-02-15');

		service.getMatches('ESP', from, to).subscribe((m: Match[]) => {
			expect(m.length).toBe(1);
			expect(m[0].homeTeam.name).toBe('Barça');
			expect(m[0].fullTime.home).toBe(2);
		});

		const expectedFrom = from.toISOString().split('T')[0];
		const expectedTo = to.toISOString().split('T')[0];

		const req = httpMock.expectOne(
			`/api/v4/matches?competitions=ESP&dateFrom=${expectedFrom}&dateTo=${expectedTo}`
		);

		expect(req.request.method).toBe('GET');
		expect(req.request.headers.get('X-Auth-Token')).toBe(environment.apiKey);
		req.flush(mockResponse);
	});
});