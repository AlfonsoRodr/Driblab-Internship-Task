import { League } from "../models/league.model";
import { Match } from "../models/match.model";
import { Standings } from "../models/standings.model";

export function filterAndMapCompetitions(response: any): League[] {
	return response.competitions
		.filter((comp: any) => comp.type === 'LEAGUE')
		.map((comp: any): League => ({
			country: comp.area.code,
			flag: comp.area.flag,
			leagueName: comp.name,
			leagueCode: comp.code,
			logo:comp.emblem
		})
	);
}

export function mapStandings(response: any): Standings[] {
	const table = response.standings[0].table ?? [];
	return table.map((standing: any): Standings => ({
		position: standing.position,
		team: {
			name: standing.team.name,
			tla: standing.team.tla,
			logo: standing.team.crest
		},
		playedGames: standing.playedGames,
		won: standing.won,
		draw: standing.draw,
		lost: standing.lost,
		points: standing.points,
		goalsFor: standing.goalsFor,
		goalsAgainst: standing.goalsAgainst,
		goalDifference: standing.goalDifference
	}));
}

export function mapMatches(response: any): Match[] {
	return response.matches.map((match: any): Match => ({
		homeTeam: {
			name: match.homeTeam.shortName,
			tla: match.homeTeam.tla,
			logo: match.homeTeam.crest
		},
		awayTeam: {
			name: match.awayTeam.shortName,
			tla: match.awayTeam.tla,
			logo: match.awayTeam.crest
		},
		duration: match.score.duration,
		fullTime: {
			home: match.score.fullTime.home,
			away: match.score.fullTime.away
		},
		halfTime: {
			home: match.score.halfTime.home,
			away: match.score.halfTime.away
		},
		refereeName: match.referees[0].name
	}));
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}