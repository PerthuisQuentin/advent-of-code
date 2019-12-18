const Chalk = require('chalk')

const IntCode = require('../../intCode')
const Grid = require('../../grid')

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
const NEW_LINE = '\n'

const FORWARD = 'F'
const LEFT = 'L'
const RIGHT = 'R'

const ASCII_TO_SYMBOL = {
	[ASCII_SCAFFOLD]: SCAFFOLD,
	[ASCII_SPACE]: SPACE,
	[ASCII_DROID_UP]: DROID_UP,
	[ASCII_DROID_DOWN]: DROID_DOWN,
	[ASCII_DROID_LEFT]: DROID_LEFT,
	[ASCII_DROID_RIGHT]: DROID_RIGHT,
	[ASCII_NEW_LINE]: NEW_LINE
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

const DIRECTIONS = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 }
]

const DROID_TO_DIRECTION_INDEX = {
	[DROID_UP]: 0,
	[DROID_RIGHT]: 1,
	[DROID_DOWN]: 2,
	[DROID_LEFT]: 3
}

const DIRECTION_INDEX_TO_DROID = {
	0: DROID_UP,
	1: DROID_RIGHT,
	2: DROID_DOWN,
	3: DROID_LEFT
}

const colorPixel = cell => {
	const parser = COLOR_PARSERS[cell]
	return parser ? parser(cell): cell
}

const addPositions = (positionA, positionB) => ({
	x: positionA.x + positionB.x,
	y: positionA.y + positionB.y
})

const getNewDirection = (grid, droidPosition) => {
	const cell = grid.getCell(droidPosition)
	const directionIndex = DROID_TO_DIRECTION_INDEX[cell]

	const atLeftIndex = (directionIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length
	const atRightIndex = (directionIndex + 1) % DIRECTIONS.length
	const atLeft = DIRECTIONS[atLeftIndex]
	const atRight = DIRECTIONS[atRightIndex]
	const cellAtLeft = grid.getCell(addPositions(droidPosition, atLeft))
	const cellAtRight = grid.getCell(addPositions(droidPosition, atRight))

	if (cellAtLeft === SCAFFOLD && cellAtRight !== SCAFFOLD) {
		return { rotation: LEFT, position: atLeft, droid: DIRECTION_INDEX_TO_DROID[atLeftIndex] }
	} else if (cellAtLeft !== SCAFFOLD && cellAtRight === SCAFFOLD) {
		return { rotation: RIGHT, position: atRight, droid: DIRECTION_INDEX_TO_DROID[atRightIndex] }
	} else {
		return false
	}
}

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	const intCode = new IntCode(program)
	const grid = new Grid(NOTHING)

	intCode.run()
	const gridData = intCode.getLastOutputs()
	let position = { x: 0, y: 0 }
	let droidPosition = { x: 0, y: 0 }

	for (let i in gridData) {
		const asciiCode = gridData[i]
		const symbol = ASCII_TO_SYMBOL[asciiCode]
		if (!symbol) throw new Error(`Unknown value : ${asciiCode}`)

		if (symbol === DROID_UP || symbol === DROID_DOWN || symbol === DROID_LEFT || symbol === DROID_DOWN) {
			droidPosition.x = position.x
			droidPosition.y = position.y
		}

		if (asciiCode === ASCII_NEW_LINE) {
			position.y++
			position.x = 0
		} else {
			grid.setCell(position, symbol)
			position.x++
		}
	}

	console.log(grid.toParsedString(colorPixel))

	const path = []
	let direction

	do {
		direction = getNewDirection(grid, droidPosition)

		if (direction) {
			grid.setCell(droidPosition, direction.droid)
			path.push(direction.rotation)
			let nextPosition
			let nextCell

			do {
				nextPosition = addPositions(droidPosition, direction.position)
				nextCell = grid.getCell(nextPosition)
				if (nextCell === SCAFFOLD) {
					grid.setCell(droidPosition, SCAFFOLD)
					grid.setCell(nextPosition, direction.droid)
					droidPosition = nextPosition
					path.push(FORWARD)
				}
			} while (nextCell === SCAFFOLD)
		}

	} while (direction)

	console.log(grid.toParsedString(colorPixel))

	console.log(path.join(','))

	return 4
}

module.exports = contestResponse