const MemoryGame = require('../memoryGame')

const contestResponse = input => {
	const memoryGame = new MemoryGame(input)
	memoryGame.doTurnUntil(2021)
	return memoryGame.lastSpoken
}

module.exports = contestResponse