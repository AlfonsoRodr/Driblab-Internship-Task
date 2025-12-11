import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { League } from '../../models/league.model';
import { Match } from '../../models/match.model';
import { LoadingModalComponent } from "../modals/loading-modal/loading-modal.component";
import { DatePipe } from '@angular/common';
import { GoBackButtonComponent } from "../go-back-button/go-back-button.component";
import { Router } from '@angular/router';

@Component({
	selector: 'app-matches',
	standalone: true,
	templateUrl: './matches.component.html',
 	imports: [LoadingModalComponent, DatePipe, GoBackButtonComponent],
})
export class MatchesComponent implements OnInit {
	public currentLeague!: League;
	public matches: Match[] = [];
	public errorMessage = '';

	public isLoading = true;

	private readonly PAGE_SIZE = 10;
	private currentIndex = 0;
	public displayedMatches: Match[] = [];

	public dateFrom: Date = new Date();
	public dateTo: Date = new Date();

	constructor(private service: MainService, private router: Router) {}

	ngOnInit() {
		this.errorMessage = '';

		this.service.dateRange$.subscribe((dates) => {
			this.dateFrom = dates.dateFrom;
			this.dateTo = dates.dateTo;
		});

		this.service.selectedLeague$.subscribe((response) => {
			this.currentLeague = response;
			this.loadMatches();
		});
	}

	private loadMatches() {
		this.isLoading = true;
		this.errorMessage = '';
		this.reset();
		this.service.getMatches(this.currentLeague.leagueCode, this.dateFrom, this.dateTo).subscribe({
			next: (response) => {
				this.isLoading = false;
				this.matches = response;
				this.loadMoreMatches();
			},
			error: (_) => {
				this.isLoading = false;
				this.errorMessage = 'Error loading the matches from the api';
			}
		});
	}

	public loadMoreMatches() {
		const nextIndex = this.currentIndex + this.PAGE_SIZE;
		const followingMatches = this.matches.slice(this.currentIndex, nextIndex);

		this.displayedMatches = [...this.displayedMatches, ...followingMatches];
		this.currentIndex = nextIndex;
	}

	public hasMore() {
		return this.currentIndex < this.matches.length;
	}

	private reset() {
        this.matches = [];
        this.displayedMatches = [];
        this.currentIndex = 0;
    }

	public goBack() {
		this.router.navigate(['standings']);
	}
}