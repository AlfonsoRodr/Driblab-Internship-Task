import { Team } from "./team.model"

export type Score = {
	home: number,
	away: number
}

export type Match = {
	date: Date,
	homeTeam: Team,
	awayTeam: Team,
	duration: string,
	fullTime: Score,
	halfTime: Score,
	refereeName: string
}