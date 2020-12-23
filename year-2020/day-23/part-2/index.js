const CircleGame = require('../circleGame')

const contestResponse = input => {
	const list = input[0].split('').map(Number)

	const game = new CircleGame(list, 1000000)
	game.doMoves(10000000)

	return game.getPart2Result()
}

module.exports = contestResponse