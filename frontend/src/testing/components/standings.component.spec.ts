import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandingsComponent } from '../../app/components/standings/standings.component';
import { MainService } from '../../app/services/main.service';
import { Router } from '@angular/router';
import { of, ReplaySubject, throwError } from 'rxjs';
import { League } from '../../app/models/league.model';
import { Standings } from '../../app/models/standings.model';

describe('Standings Component Unit Tests', () => {
    let component: StandingsComponent;
    let fixture: ComponentFixture<StandingsComponent>;

    let mainServiceMock: any;
    let routerMock: any;

    let selectedLeagueSubject: ReplaySubject<League>;

    const mockLeague: League = {
        country: 'ES',
        flag: 'flag.png',
        leagueName: 'La Liga',
        leagueCode: 'LL',
        logo: 'logo.png',
    };

    beforeEach(() => {
        selectedLeagueSubject = new ReplaySubject<League>(1);

        mainServiceMock = {
            selectedLeague$: selectedLeagueSubject.asObservable(),
            getStandings: jasmine.createSpy('getStandings'),
            setDateRange: jasmine.createSpy('setDateRange'),
        };

        routerMock = {
            navigate: jasmine.createSpy('navigate'),
        };

        TestBed.configureTestingModule({
            imports: [StandingsComponent],
            providers: [
                { provide: MainService, useValue: mainServiceMock },
                { provide: Router, useValue: routerMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(StandingsComponent);
        component = fixture.componentInstance;

        selectedLeagueSubject.next(mockLeague);
    });

    it('should load standings on init (success)', () => {
        const standingsMock: Standings[] = [
            {
                position: 1,
                team: { name: 'FCB', tla: 'FCB', logo: 'crest.png' },
                playedGames: 20,
                won: 15,
                draw: 3,
                lost: 2,
                points: 48,
                goalsFor: 50,
                goalsAgainst: 20,
                goalDifference: 30,
            },
        ];

        mainServiceMock.getStandings.and.returnValue(of(standingsMock));

        fixture.detectChanges();

        expect(mainServiceMock.getStandings).toHaveBeenCalledWith('LL');
        expect(component.standings).toEqual(standingsMock);
    });

    it('should set errorMessage on getStandings error', () => {
        mainServiceMock.getStandings.and.returnValue(throwError(() => new Error('API Error')));

        fixture.detectChanges();

        expect(component.errorMessage).toBe('Error loading the standings from the api');
    });

    it('should set date range and navigate to matches when date is selected', () => {
        const mockDates = {
            dateFrom: new Date('2024-01-01'),
            dateTo: new Date('2024-01-10'),
        };

        component.openModal = true;

        component.handleDateSelection(mockDates);

        expect(mainServiceMock.setDateRange).toHaveBeenCalledWith(mockDates);
        expect(component.openModal).toBeFalse();
        expect(routerMock.navigate).toHaveBeenCalledWith(['matches']);
    });

    it('should open the modal when seeMatches is called', () => {
        component.openModal = false;

        component.seeMatches();

        expect(component.openModal).toBeTrue();
    });

    it('should navigate to home when goBack is called', () => {
        component.goBack();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });
});