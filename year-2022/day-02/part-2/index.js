const ROCK = 'ROCK'
const PAPER = 'PAPER'
const SCISSORS = 'SCISSORS'

const WIN = 'WIN'
const DRAW = 'DRAW'
const LOSE = 'LOSE'

const LETTER_TO_SHAPE = {
	'A': ROCK,
	'B': PAPER,
	'C': SCISSORS,
	'X': LOSE,
	'Y': DRAW,
	'Z': WIN,
}

const LETTER_TO_ROUND_RESULT = {
	'X': LOSE,
	'Y': DRAW,
	'Z': WIN,
}

const ROUND_RESULT_SCORES = {
	[WIN]: 6,
	[DRAW]: 3,
	[LOSE]: 0
}

const SHAPE_SCORES = {
	[ROCK]: 1,
	[PAPER]: 2,
	[SCISSORS]: 3
}

const SHAPE_TO_PLAY = {
	[ROCK]: {
		[WIN]: PAPER,
		[DRAW]: ROCK,
		[LOSE]: SCISSORS
	},
	[PAPER]: {
		[WIN]: SCISSORS,
		[DRAW]: PAPER,
		[LOSE]: ROCK
	},
	[SCISSORS]: {
		[WIN]: ROCK,
		[DRAW]: SCISSORS,
		[LOSE]: PAPER
	}
}

const contestResponse = input => {
	const score = input
		.map(round => round.split(' '))
		.map(splittedRound => [
			LETTER_TO_SHAPE[splittedRound[0]],
			LETTER_TO_ROUND_RESULT[splittedRound[1]]
		])
		.map(roundInstructions => {
			const shapeToPlay = SHAPE_TO_PLAY[roundInstructions[0]][roundInstructions[1]]
			return ROUND_RESULT_SCORES[roundInstructions[1]] + SHAPE_SCORES[shapeToPlay]
		})
		.reduce((a, b) => a + b)

	return score
}

module.exports = contestResponse