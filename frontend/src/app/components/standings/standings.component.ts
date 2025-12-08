import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { League } from '../../models/league.model';
import { Standings } from '../../models/standings.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-standings',
	standalone: true,
	templateUrl: './standings.component.html'
})
export class StandingsComponent implements OnInit {
	public currentLeague!: League;
	public standings: Standings[] = [];
	public errorMessage = '';

	constructor(private service: MainService, private router: Router) {}

	ngOnInit() {
		this.service.selectedLeague$.subscribe((response) => {
			this.currentLeague = response;
		});

		this.service.getStandings(this.currentLeague.leagueCode).subscribe({
			next: (response) => this.standings = response,
			error: (_) => this.errorMessage = 'Error loading the standings from the api'
		});
	}

	public seeMatches() {
		this.router.navigate(['matches']);
	}
}