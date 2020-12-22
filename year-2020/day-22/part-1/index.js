const parseInput = input => {
	const index = input.findIndex(line => line === ';')

	return {
		deck1: input.slice(1, index).map(Number),
		deck2: input.slice(index + 2).map(Number)
	}
}

const doRound = game => {
	const value1 = game.deck1.shift()
	const value2 = game.deck2.shift()

	if (value1 > value2) {
		game.deck1.push(value1, value2)
	} else if (value2 > value1) {
		game.deck2.push(value2, value1)
	} else {
		throw new Error('aie')
	}
}

const getWinnerDeck = game => {
	while (game.deck1.length > 0 && game.deck2.length > 0) doRound(game)

	if (game.deck1.length > 0) return game.deck1
	else if (game.deck2.length > 0) return game.deck2
}

const computeResult = winnerDeck => winnerDeck.reduce((result, value, i) => result + (value * (winnerDeck.length - i)), 0)

const contestResponse = input => {
	const game = parseInput(input)
	const winnerDeck = getWinnerDeck(game)

	return computeResult(winnerDeck)
}

module.exports = contestResponse