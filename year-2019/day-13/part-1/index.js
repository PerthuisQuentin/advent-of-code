const Chalk = require('chalk')

const IntCode = require('../../intCode')
const Grid = require('../../../utils/grid')

const EMPTY = 0
const WALL = 1
const BLOCK = 2
const PADDLE = 3
const BALL = 4

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

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	const grid = new Grid()
	const intCode = new IntCode(program)

	intCode.run()
	const outputs = intCode.getOutputs()

	for (let i = 0; i < outputs.length; i += 3) {
		const x = outputs[i]
		const y = outputs[i + 1]
		const content = outputs[i + 2]
		grid.setCell({ x, y }, content)
	}

	const blockCount = grid.count(BLOCK)

	return blockCount
}

module.exports = contestResponse