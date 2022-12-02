const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'

const LETTER_TO_SHAPE = {
	'A': ROCK,
	'B': PAPER,
	'C': SCISSORS,
	'X': ROCK,
	'Y': PAPER,
	'Z': SCISSORS,
}

const SHAPE_SCORES = {
	[ROCK]: 1,
	[PAPER]: 2,
	[SCISSORS]: 3
}

const ROUND_SCORES = {
	[ROCK]: {
		[ROCK]: 3,
		[PAPER]: 0,
		[SCISSORS]: 6
	},
	[PAPER]: {
		[ROCK]: 6,
		[PAPER]: 3,
		[SCISSORS]: 0
	},
	[SCISSORS]: {
		[ROCK]: 0,
		[PAPER]: 6,
		[SCISSORS]: 3
	}
}

const contestResponse = input => {
	const score = input
		.map(round => round.split(' '))
		.map(splittedRound => [
			LETTER_TO_SHAPE[splittedRound[0]],
			LETTER_TO_SHAPE[splittedRound[1]]
		])
		.map(roundShapes => ROUND_SCORES[roundShapes[1]][roundShapes[0]] + SHAPE_SCORES[roundShapes[1]])
		.reduce((a, b) => a + b)

	return score
}

module.exports = contestResponse