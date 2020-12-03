const Chalk = require('chalk')

const IntCode = require('../../intCode')
const Grid = require('../../../utils/grid')

const EMPTY = 0
const WALL = 1
const BLOCK = 2
const PADDLE = 3
const BALL = 4

const NEUTRAL = 0
const LEFT = -1
const RIGHT = 1

const COLOR_PARSERS = {
	[EMPTY]: Chalk.bgBlack,
	[WALL]: Chalk.bgRed,
	[BLOCK]: Chalk.bgYellow,
	[PADDLE]: Chalk.bgBlue,
	[BALL]: Chalk.bgGreen
}

const colorPixel = cell => {
	const parser = COLOR_PARSERS[cell]
	return parser ? parser(cell): cell
}

class BreakOut {
	constructor(program) {
		this.intCode = new IntCode(program)
		this.grid = new Grid()
		this.setBallPosition({ x: 0, y: 0 })
		this.setPaddlePosition({ x: 0, y: 0 })
		this.setScore(0)
		this.initGame()
	}

	initGame() {
		this.intCode.run()
		this.readOutputs()
	}

	readOutputs() {
		const outputs = this.intCode.getOutputs()

		for (let i = 0; i < outputs.length; i += 3) {
			const x = outputs[i]
			const y = outputs[i + 1]
			const content = outputs[i + 2]

			if (x === -1 && y === 0) {
				this.setScore(content)
			} else {
				this.grid.setCell({ x, y }, content)

				if (content === BALL) this.setBallPosition({ x, y })
				else if (content === PADDLE) this.setPaddlePosition({ x, y })
			}
		}

		this.intCode.clearOutputs()
	}

	run() {

		// if (!this.intCode.stoped) setTimeout(() => {
		// 	this.nextTick()
		// 	this.run()
		// }, 2000)

		while (!this.intCode.stoped) this.nextTick()
	}

	nextTick() {
		this.intCode.addInput(this.getPaddleDirection())
		this.intCode.run()
		this.readOutputs()
	}

	getPaddleDirection() {
		if (this.ballPosition.x < this.paddlePosition.x) {
			return LEFT
		} else if (this.ballPosition.x > this.paddlePosition.x) {
			return RIGHT
		} else {
			return NEUTRAL
		}
	}

	getScore() {
		return this.score
	}

	setBallPosition(position) {
		this.ballPosition = position
	}

	setPaddlePosition(position) {
		this.paddlePosition = position
	}

	setScore(value) {
		this.score = value
	}

	toColorString() {
		return this.grid.toParsedString(colorPixel)
	}
}

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	const breakOut = new BreakOut(program)

	breakOut.run()
	const finalScore = breakOut.getScore()

	return finalScore
}

module.exports = contestResponse