const parseInput = input => {
	const index = input.findIndex(line => line === '')

	return {
		deck1: input.slice(1, index).map(Number),
		deck2: input.slice(index + 2).map(Number)
	}
}

const hashGame = game => `${game.deck1.join(':')}-${game.deck2.join(':')}`

let n = 1

const doRound = (game, gameMemory) => {
	const hash = hashGame(game)
	if (gameMemory.has(hash)) return { canContinue: false, winner: 'player1' }
	gameMemory.add(hash)

	const value1 = game.deck1.shift()
	const value2 = game.deck2.shift()

	let winner

	if ((game.deck1.length >= value1) && (game.deck2.length >= value2)) {
		const subGame = {
			deck1: game.deck1.slice(0, value1),
			deck2: game.deck2.slice(0, value2)
		}
		winner = runGame(subGame).winner
	} else {
		if (value1 > value2) winner = 'player1'
		else if (value2 > value1) winner = 'player2'
		else throw new Error('same cards')
	}

	if (winner === 'player1') {
		game.deck1.push(value1, value2)
		return { canContinue: game.deck2.length > 0, winner }
	} else if (winner === 'player2') {
		game.deck2.push(value2, value1)
		return { canContinue: game.deck1.length > 0, winner }
	} else {
		throw new Error('no winner ?')
	}
}

const runGame = game => {
	const gameMemory = new Set()
	let result

	do { result = doRound(game, gameMemory) } while (result.canContinue)

	return result
}

const computeResult = (game, winner) => {
	const winnerDeck = winner === 'player1' ? game.deck1 : game.deck2
	return winnerDeck.reduce((result, value, i) => result + (value * (winnerDeck.length - i)), 0)
}

const contestResponse = input => {
	const game = parseInput(input)
	const result = runGame(game)

	return computeResult(game, result.winner)
}

module.exports = contestResponse