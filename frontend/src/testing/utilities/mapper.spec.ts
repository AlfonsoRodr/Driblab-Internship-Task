import { filterAndMapCompetitions, mapStandings, mapMatches, formatDate } from '../../app/utilities/mapper';
import { League } from '../../app/models/league.model';
import { Standings } from '../../app/models/standings.model';
import { Match } from '../../app/models/match.model';

describe('Mapper Unit Tests', () => {
	describe('filterAndMapCompetitions', () => {
		it('should filter only LEAGUE competitions and map them correctly', () => {
			const response = {
				competitions: [
					{
						type: 'LEAGUE',
						area: { code: 'ES', flag: 'flag.png' },
						name: 'La Liga',
						code: 'LL',
						emblem: 'logo.png',
					},
					{
						type: 'CUP',
						area: { code: 'EN', flag: 'flag2.png' },
						name: 'FA Cup',
						code: 'FA',
						emblem: 'cup.png',
					},
				],
			};

			const result: League[] = filterAndMapCompetitions(response);

			expect(result.length).toBe(1);
			expect(result[0]).toEqual({
				country: 'ES',
				flag: 'flag.png',
				leagueName: 'La Liga',
				leagueCode: 'LL',
				logo: 'logo.png',
			});
		});
	});

	describe('mapStandings', () => {
		it('should map standings correctly', () => {
			const response = {
				standings: [
					{
						table: [
							{
								position: 1,
								team: { name: 'FC Barcelona', tla: 'FCB', crest: 'logo.png' },
								playedGames: 20,
								won: 15,
								draw: 3,
								lost: 2,
								points: 48,
								goalsFor: 60,
								goalsAgainst: 20,
								goalDifference: 40,
							},
						],
					},
				],
			};

			const result: Standings[] = mapStandings(response);

			expect(result.length).toBe(1);
			expect(result[0].team.name).toBe('FC Barcelona');
			expect(result[0].goalDifference).toBe(40);
		});

		it('should return empty array if table is missing', () => {
			const response = { standings: [{}] };
			const result = mapStandings(response);

			expect(result.length).toBe(0);
		});
	});

	describe('mapMatches', () => {
		it('should return empty array if response is invalid', () => {
			expect(mapMatches(null)).toEqual([]);
			expect(mapMatches({})).toEqual([]);
		});

		it('should map matches correctly', () => {
			const response = {
				matches: [
					{
						utcDate: '2024-01-01',
						homeTeam: { shortName: 'Barça', tla: 'FCB', crest: 'barca.png' },
						awayTeam: { shortName: 'Madrid', tla: 'RMA', crest: 'madrid.png' },
						score: {
							duration: 'REGULAR',
							fullTime: { home: 2, away: 1 },
							halfTime: { home: 1, away: 1 },
						},
						referees: [{ name: 'Mateu Lahoz' }],
					},
				],
			};

			const result: Match[] = mapMatches(response);

			expect(result.length).toBe(1);
			expect(result[0].homeTeam.name).toBe('Barça');
			expect(result[0].fullTime.home).toBe(2);
			expect(result[0].refereeName).toBe('Mateu Lahoz');
		});

		it('should use default values when fields are missing', () => {
			const response = { matches: [{}] };

			const result = mapMatches(response);

			expect(result[0].homeTeam.name).toBe('N/A');
			expect(result[0].duration).toBe('90M');
			expect(result[0].refereeName).toBe('TBD');
		});
	});

	describe('formatDate', () => {
		it('should format date as YYYY-MM-DD', () => {
			const date = new Date('2024-05-10T12:00:00Z');
			const formatted = formatDate(date);
			expect(formatted).toBe('2024-05-10');
		});
	});
});