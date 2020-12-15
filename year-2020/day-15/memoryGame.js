class MemoryGame {
	constructor(input) {
		this.memory = new Map()
		this.turn = 1
		this.lastSpoken = null
		this.loadInput(input)
	}

	say(n) {
		if (this.lastSpoken !== null) {
			this.memory.set(this.lastSpoken, this.turn - 1)
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
		if (this.memory.has(this.lastSpoken)) {
			this.say((this.turn - 1) - this.memory.get(this.lastSpoken))
		} else {
			this.say(0)
		}
	}

	doTurnUntil(stopTurn) {
		while (this.turn < stopTurn) this.doTurn()
	}
}

module.exports = MemoryGame