import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { League } from '../models/league.model';
import { filterAndMapCompetitions, formatDate, mapMatches, mapStandings } from '../utilities/mapper';
import { Standings } from '../models/standings.model';
import { Match } from '../models/match.model';
import { DateSelector } from '../models/date.model';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	private selectedLeagueSubject = new BehaviorSubject<League>({
		country: '',
		flag: '',
		leagueName: '',
		logo: '',
		leagueCode: ''
	});
	public selectedLeague$: Observable<League> = this.selectedLeagueSubject.asObservable();

	private dateRangeSubject = new BehaviorSubject<DateSelector>({
        dateFrom: new Date(),
        dateTo: new Date(new Date().setDate(new Date().getDate() + 10))
    });
    public dateRange$ = this.dateRangeSubject.asObservable();
	public apiUrl = '/api/v4/competitions';
	private headers = new HttpHeaders({ 'X-Auth-Token': environment.apiKey });

	constructor(private http: HttpClient) {}

	public getAvailableLeagues(): Observable<League[]> {
		return this.http.get<League[]>(`${this.apiUrl}`, { headers: this.headers })
			.pipe(map(response => filterAndMapCompetitions(response)));
	}

	public setSelectedLeague(league: League): void {
		this.selectedLeagueSubject.next(league);
	}

	public setDateRange(dates: DateSelector): void {
        this.dateRangeSubject.next(dates);
    }

	public getStandings(leagueCode: string): Observable<Standings[]> {
		return this.http.get<Standings[]>(`${this.apiUrl}/${leagueCode}/standings`, { headers: this.headers })
			.pipe(map(response => mapStandings(response)));
	}

	public getMatches(leagueCode: string, dateFrom: Date, dateTo: Date): Observable<Match[]> {
		const from = formatDate(dateFrom);
		const to = formatDate(dateTo);
		return this.http.get<Match[]>(`/api/v4/matches?competitions=${leagueCode}&dateFrom=${from}&dateTo=${to}`, { headers: this.headers })
			.pipe(map(response => mapMatches(response)));
	}
}