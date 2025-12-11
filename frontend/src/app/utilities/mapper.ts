import { League } from '../models/league.model';
import { Match } from '../models/match.model';
import { Standings } from '../models/standings.model';

/**
 * Filters competitions by league type and maps them to a League object format.
 * @param response - The API response object containing a competitions array
 * @returns An array of League objects containing filtered and mapped competition data
 */
export function filterAndMapCompetitions(response: any): League[] {
	return response.competitions
		.filter((comp: any) => comp.type === 'LEAGUE')
		.map(
			(comp: any): League => ({
				country: comp.area.code,
				flag: comp.area.flag,
				leagueName: comp.name,
				leagueCode: comp.code,
				logo: comp.emblem,
			})
		);
}

/**
 * Maps the API response for standings into a structured array of Standings objects.
 *
 * @param response - The API response containing standings data.
 * @returns An array of Standings objects with relevant team and match statistics.
 */
export function mapStandings(response: any): Standings[] {
	const table = response.standings[0].table ?? [];
	return table.map(
		(standing: any): Standings => ({
			position: standing.position,
			team: {
				name: standing.team.name,
				tla: standing.team.tla,
				logo: standing.team.crest,
			},
			playedGames: standing.playedGames,
			won: standing.won,
			draw: standing.draw,
			lost: standing.lost,
			points: standing.points,
			goalsFor: standing.goalsFor,
			goalsAgainst: standing.goalsAgainst,
			goalDifference: standing.goalDifference,
		})
	);
}

/**
 * Maps the API response to an array of Match objects.
 *
 * @param response - The API response containing match data.
 * @returns An array of Match objects or an empty array if the response is invalid.
 */
export function mapMatches(response: any): Match[] {
	if (!response || !Array.isArray(response.matches)) {
		return [];
	}

	return response.matches.map(
		(match: any): Match => ({
			date: match.utcDate ?? 'NA',
			homeTeam: {
				name: match.homeTeam?.shortName ?? 'N/A',
				tla: match.homeTeam?.tla ?? '',
				logo: match.homeTeam?.crest ?? '',
			},
			awayTeam: {
				name: match.awayTeam?.shortName ?? 'N/A',
				tla: match.awayTeam?.tla ?? '',
				logo: match.awayTeam?.crest ?? '',
			},
			duration: match.score?.duration ?? '90M',
			fullTime: {
				home: match.score?.fullTime?.home ?? null,
				away: match.score?.fullTime?.away ?? null,
			},
			halfTime: {
				home: match.score?.halfTime?.home ?? null,
				away: match.score?.halfTime?.away ?? null,
			},
			refereeName: match.referees?.[0]?.name ?? 'TBD',
		})
	);
}

/**
 * Formats a Date object into a string in the format YYYY-MM-DD.
 *
 * @param date - The Date object to be formatted.
 * @returns A string representing the date in the format YYYY-MM-DD.
 */
export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}