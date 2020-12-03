const Chalk = require('chalk')

const IntCode = require('../../intCode')
const Grid = require('../../../utils/grid')

const UNKNOWN = ' '
const EMPTY = '.'
const WALL = '#'
const DROID = 'D'
const OXYGEN = 'O'

const NORTH = 1
const SOUTH = 2
const WEST = 3
const EAST = 4

const HIT_WALL = 0
const HAS_MOVED = 1
const FIND_OXYGEN = 2

const COLOR_PARSERS = {
	[UNKNOWN]: Chalk.bgBlack,
	[EMPTY]: Chalk.bgWhite,
	[WALL]: Chalk.bgRed,
	[DROID]: Chalk.bgBlue,
	[OXYGEN]: Chalk.bgGreen
}

const colorPixel = cell => {
	const parser = COLOR_PARSERS[cell]
	return parser ? parser(cell): cell
}

class Droid {
	constructor(program) {
		this.intCode = new IntCode(program)
		this.grid = new Grid(UNKNOWN)
		this.setDroidPosition({ x: 0, y: 0 })
		this.setOxygenPosition(null)
		this.grid.setCell(this.droidPosition, DROID)
	}

	setDroidPosition(position) {
		this.droidPosition = position
	}

	setOxygenPosition(position) {
		this.oxygenPosition = position
	}

	searchOxygen() {
		let explorationResult
		do {
			explorationResult = this.exploreAnUnknownCell()
		} while (explorationResult)
	}

	getPathToOxygen() {
		return this.getPath({ x: 0, y: 0 }, this.oxygenPosition)
	}

	exploreAnUnknownCell() {
		const position = this.getNearestUnknown()
		if (!position) return false
		const path = this.getPath(this.droidPosition, position)

		for (let step of path) {
			const direction = this.getDirection(this.droidPosition, step)
			this.moveDroid(direction, step)
		}

		return true
	}

	moveDroid(direction, position) {
		this.intCode.addInput(direction)
		this.intCode.run()
		const result = this.intCode.getLastOutput()

		if (result === HIT_WALL) {
			this.grid.setCell(position, WALL)

		} else if (result === HAS_MOVED) {
			this.grid.setCell(position, DROID)
			this.grid.setCell(this.droidPosition, this.getContentAtDroidPosition())
			this.setDroidPosition(position)
		} else if (result === FIND_OXYGEN) {
			this.setOxygenPosition(position)
			this.grid.setCell(position, DROID)
			this.grid.setCell(this.droidPosition, this.getContentAtDroidPosition())
			this.setDroidPosition(position)
		}
	}

	getContentAtDroidPosition() {
		if (this.oxygenPosition === null) return EMPTY
		if (this.droidPosition.x === this.oxygenPosition.x && this.droidPosition.y === this.oxygenPosition.y) return OXYGEN
		else return EMPTY
	}

	getDirection(from, to) {
		const x = from.x - to.x
		const y = from.y - to.y

		if (x !== 0 && y !== 0) throw new Error('Not in line')
		if (x === 0 && y === 0) throw new Error('Same position')

		if (x !== 0) {
			return x > 0 ? WEST : EAST
		} else if (y !== 0) {
			return y > 0 ? NORTH : SOUTH
		}
	}

	hashPosition(position) {
		return `${position.x}/${position.y}`
	}

	getNearestUnknown() {
		const positionsAnalysed = {}
		let positionsToAnalyse = [this.droidPosition]

		while (positionsToAnalyse.length > 0) {
			const newPositionsToAnalyse = []

			for (let positionAnalysed of positionsToAnalyse) {
				for (let position of this.grid.getNeighborsPosition(positionAnalysed)) {
					const hash = this.hashPosition(position)
					if (positionsAnalysed[hash]) continue
					else positionsAnalysed[hash] = true

					const cell = this.grid.getCell(position)
					if (cell === UNKNOWN) return position

					if (cell === EMPTY || cell === DROID) newPositionsToAnalyse.push(position)
				}
			}

			positionsToAnalyse = newPositionsToAnalyse
		}
	}

	buildPath(from, to, parents) {
		const path = [to]
		let current = to

		while (current.x !== from.x || current.y !== from.y) {
			const parent = parents[this.hashPosition(current)]
			path.push(parent)
			current = parent
		}

		return path.reverse().slice(1)
	}

	getPath(from, to) {
		const positionsAnalysed = {}
		const parents = {}
		let positionsToAnalyse = [from]

		while (positionsToAnalyse.length > 0) {
			const newPositionsToAnalyse = []

			for (let positionAnalysed of positionsToAnalyse) {
				for (let position of this.grid.getNeighborsPosition(positionAnalysed)) {
					const hash = this.hashPosition(position)
					if (positionsAnalysed[hash]) continue
					else positionsAnalysed[hash] = true

					parents[hash] = positionAnalysed

					if (position.x === to.x && position.y === to.y) {
						return this.buildPath(from, to, parents)
					}

					const cell = this.grid.getCell(position)
					if (cell === EMPTY || cell === DROID) newPositionsToAnalyse.push(position)
				}
			}

			positionsToAnalyse = newPositionsToAnalyse
		}
	}

	gridToColorString() {
		return this.grid.toParsedString(colorPixel)
	}
}

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	const droid = new Droid(program)

	droid.searchOxygen()

	const path = droid.getPathToOxygen()

	return path.length
}

module.exports = contestResponse