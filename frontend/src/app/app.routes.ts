import { Routes } from '@angular/router';
import { LeagueComponent } from './components/league/league.component';
import { StandingsComponent } from './components/standings/standings.component';
import { MatchesComponent } from './components/matches/matches.component';

export const routes: Routes = [
	{ path: '', component: LeagueComponent },
	{ path: 'standings', component: StandingsComponent },
	{ path: 'matches', component: MatchesComponent }
];