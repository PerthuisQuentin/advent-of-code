const CircleGame = require('../circleGame')

const contestResponse = input => {
	const list = input[0].split('').map(Number)
	const moves = Number(input[1])

	const game = new CircleGame(list)
	game.doMoves(moves)

	return game.getPart1Result()
}

module.exports = contestResponse