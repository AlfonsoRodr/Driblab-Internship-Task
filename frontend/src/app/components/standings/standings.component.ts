import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { League } from '../../models/league.model';
import { Standings } from '../../models/standings.model';
import { Router } from '@angular/router';
import { DateSelectionComponent } from "../modals/date-selection/date-selection.component";
import { DateSelector } from '../../models/date.model';
import { GoBackButtonComponent } from "../go-back-button/go-back-button.component";

@Component({
	selector: 'app-standings',
	standalone: true,
	templateUrl: './standings.component.html',
 	imports: [DateSelectionComponent, GoBackButtonComponent]
})
export class StandingsComponent implements OnInit {
	public currentLeague!: League;
	public standings: Standings[] = [];
	public errorMessage = '';

	public openModal = false;

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

	public handleDateSelection(dates: DateSelector) {
        this.service.setDateRange(dates);
		this.openModal = false;
		this.router.navigate(['matches']);
    }

	public seeMatches() {
		this.openModal = true;
	}

	public goBack() {
		this.router.navigate(['/']);
	}
}