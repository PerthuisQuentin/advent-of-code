class MemoryGame {
	constructor(input) {
		this.memory = {}
		this.turn = 1
		this.lastSpoken = null
		this.loadInput(input)
	}

	say(n) {
		if (this.lastSpoken !== null) {
			this.memory[this.lastSpoken] = this.turn - 1
		}
		this.lastSpoken = n
		this.turn++
	}

	loadInput(input) {
		input[0]
			.split(',')
			.map(Number)
			.forEach(n => this.say(n))
	}

	doTurn() {
		if (this.memory[this.lastSpoken] === undefined) {
			this.say(0)
		} else {
			this.say((this.turn - 1) - this.memory[this.lastSpoken])
		}
	}

	doTurnUntil(stopTurn) {
		while (this.turn < stopTurn) this.doTurn()
	}
}

const contestResponse = input => {
	const memoryGame = new MemoryGame(input)
	memoryGame.doTurnUntil(30000001)
	return memoryGame.lastSpoken
}

module.exports = contestResponse