const Chalk = require('chalk')

const IntCode = require('../../intCode')
const Grid = require('../../../utils/grid')

const ASCII_SCAFFOLD = 35
const ASCII_SPACE = 46
const ASCII_DROID_UP = 94
const ASCII_DROID_DOWN = 118
const ASCII_DROID_LEFT = 60
const ASCII_DROID_RIGHT = 62
const ASCII_NEW_LINE = 10

const NOTHING = ' '
const SCAFFOLD = '#'
const SPACE = '.'
const DROID_UP = '^'
const DROID_DOWN = 'v'
const DROID_LEFT = '<'
const DROID_RIGHT = '>'

const ASCII_TO_SYMBOL = {
	[ASCII_SCAFFOLD]: SCAFFOLD,
	[ASCII_SPACE]: SPACE,
	[ASCII_DROID_UP]: DROID_UP,
	[ASCII_DROID_DOWN]: DROID_DOWN,
	[ASCII_DROID_LEFT]: DROID_LEFT,
	[ASCII_DROID_RIGHT]: DROID_RIGHT
}

const COLOR_PARSERS = {
	[NOTHING]: Chalk.bgBlue,
	[SPACE]: Chalk.bgWhite,
	[SCAFFOLD]: Chalk.bgGreen,
	[DROID_UP]: Chalk.bdRed,
	[DROID_DOWN]: Chalk.bdRed,
	[DROID_LEFT]: Chalk.bdRed,
	[DROID_RIGHT]: Chalk.bdRed
}

const colorPixel = cell => {
	const parser = COLOR_PARSERS[cell]
	return parser ? parser(cell): cell
}

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	const intCode = new IntCode(program)
	const grid = new Grid(NOTHING)

	intCode.run()
	const gridData = intCode.getLastOutputs()
	let position = { x: 0, y: 0 }

	for (let i in gridData) {
		const asciiCode = gridData[i]

		if (asciiCode === ASCII_NEW_LINE) {
			position.y++
			position.x = 0
		} else {
			const symbol = ASCII_TO_SYMBOL[asciiCode]
			if (!symbol) throw new Error(`Unknown value : ${asciiCode}`)
			grid.setCell(position, symbol)
			position.x++
		}
	}

	const intersections = grid.getAllPositionOf(SCAFFOLD)
		.filter(position => (
			grid.getCell({ x: position.x - 1, y: position.y }) === SCAFFOLD &&
			grid.getCell({ x: position.x + 1, y: position.y }) === SCAFFOLD &&
			grid.getCell({ x: position.x, y: position.y - 1 }) === SCAFFOLD &&
			grid.getCell({ x: position.x, y: position.y + 1 }) === SCAFFOLD
		))

	const result = intersections
		.map(position => position.x * position.y)
		.reduce((result, current) => result + current, 0)

	return result
}

module.exports = contestResponse