import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { League } from '../../models/league.model';
import { Match } from '../../models/match.model';

@Component({
	selector: 'app-matches',
	standalone: true,
	templateUrl: './matches.component.html',
})
export class MatchesComponent implements OnInit {
	public currentLeague!: League;
	public matches: Match[] = [];
	public errorMessage = '';

	public dateFrom: Date = new Date();
	public dateTo: Date = new Date(new Date().setDate(new Date().getDate() + 1));

	constructor(private service: MainService) {}

	ngOnInit() {
		this.service.selectedLeague$.subscribe((response) => {
			this.currentLeague = response;
		});

		this.service.getMatches(this.currentLeague.leagueCode, this.dateFrom, this.dateTo).subscribe({
			next: (response) => this.matches = response,
			error: (_) => this.errorMessage = 'Error loading the matches from the api'
		});
	}
}