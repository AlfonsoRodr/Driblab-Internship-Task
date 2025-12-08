import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { League } from '../models/league.model';
import { filterAndMapCompetitions, formatDate, mapStandings } from '../utilities/mapper';
import { Standings } from '../models/standings.model';
import { Match } from '../models/match.model';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	private selectedLeagueSubject = new BehaviorSubject<League>({
		country: '',
		leagueName: '',
		logo: '',
		leagueCode: ''
	});
	public selectedLeague$: Observable<League> = this.selectedLeagueSubject.asObservable();

	constructor(private http: HttpClient) {}

	public getAvailableLeagues(): Observable<League[]> {
		const headers = new HttpHeaders({ 'X-Auth-Token': environment.apiKey });
		return this.http.get<League[]>(`/api/v4/competitions`, { headers })
			.pipe(map(response => filterAndMapCompetitions(response)));
	}

	public setSelectedLeague(league: League): void {
		this.selectedLeagueSubject.next(league);
	}

	public getStandings(leagueCode: string): Observable<Standings[]> {
		const headers = new HttpHeaders({ 'X-Auth-Token': environment.apiKey });
		return this.http.get<Standings[]>(`/api/v4/competitions/${leagueCode}/standings`, { headers })
			.pipe(map(response => mapStandings(response)));
	}

	public getMatches(leagueCode: string, dateFrom: Date, dateTo: Date): Observable<Match[]> {
		const from = formatDate(dateFrom);
		const to = formatDate(dateTo);
		return this.http.get<Match[]>(`/api/v4/matches?competitions=${leagueCode}&dateFrom=${from}&dateTo=${to}`);
	}
}