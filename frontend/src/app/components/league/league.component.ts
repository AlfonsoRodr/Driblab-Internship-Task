import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { League } from '../../models/league.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-league',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.Default,
	templateUrl: './league.component.html'
})
export class LeagueComponent implements OnInit {
	public allLeagues: League[] = [];
	public errorMessage = '';

	constructor(private service: MainService, private router: Router) {}

	ngOnInit() {
		this.service.getAvailableLeagues().subscribe({
			next: (response) => this.allLeagues = response,
			error: (_) => this.errorMessage = 'An error occur trying to fetch the data from the api'
		});
	}

	public selectLeague(league: League) {
		this.service.setSelectedLeague(league);
		this.router.navigate(['standings']);
	}
}