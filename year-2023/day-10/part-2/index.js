const { Grid } = require('../../../utils')

const EMPTY = '.'
const START = 'X'
const VERTICAL_STRAIGHT = '│'
const HORIZONTAL_STRAIGHT = '─'
const TOP_LEFT_CORNER = '┌'
const TOP_RIGHT_CORNER = '┐'
const BOTTOM_LEFT_CORNER = '└'
const BOTTOM_RIGHT_CORNER = '┘'

const PIPES = [VERTICAL_STRAIGHT, HORIZONTAL_STRAIGHT, TOP_LEFT_CORNER, TOP_RIGHT_CORNER, BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER]

const INSIDE_BORDER_PIPES = [VERTICAL_STRAIGHT, TOP_LEFT_CORNER, TOP_RIGHT_CORNER]

const TOP = 'T'
const BOTTOM = 'B'
const LEFT = 'L'
const RIGHT = 'R'

const OUTSIDE = 'O'
const INSIDE = 'I'

const CHARACTERS_TABLE = {
	'.' : EMPTY,
	'|' : VERTICAL_STRAIGHT,
	'-' : HORIZONTAL_STRAIGHT,
	'L' : BOTTOM_LEFT_CORNER,
	'J' : BOTTOM_RIGHT_CORNER,
	'7' : TOP_RIGHT_CORNER,
	'F' : TOP_LEFT_CORNER,
	'S' : START,
}

const CONNECTIONS_COUPLES = {
	[TOP]: BOTTOM,
	[BOTTOM]: TOP,
	[LEFT]: RIGHT,
	[RIGHT]: LEFT,
}

const PIPE_CONNECTIONS = {
	[VERTICAL_STRAIGHT]: [TOP, BOTTOM],
	[HORIZONTAL_STRAIGHT]: [LEFT, RIGHT],
	[TOP_LEFT_CORNER]: [RIGHT, BOTTOM],
	[TOP_RIGHT_CORNER]: [LEFT, BOTTOM],
	[BOTTOM_LEFT_CORNER]: [TOP, RIGHT],
	[BOTTOM_RIGHT_CORNER]: [TOP, LEFT],
}

class PipeGrid extends Grid {
	getNeighborPipes(pipe) {
		const neighborPipes = {}

		const topPosition = { x: pipe.position.x, y: pipe.position.y - 1 }
		const topCell = this.getCell(topPosition)
		if (topCell !== EMPTY)neighborPipes[TOP] = new Pipe(topCell, topPosition)

		const bottomPosition = { x: pipe.position.x, y: pipe.position.y + 1 }
		const bottomCell = this.getCell(bottomPosition)
		if (bottomCell !== EMPTY) neighborPipes[BOTTOM] = new Pipe(bottomCell, bottomPosition)

		const leftPosition = { x: pipe.position.x - 1, y: pipe.position.y }
		const leftCell = this.getCell(leftPosition)
		if (leftCell !== EMPTY) neighborPipes[LEFT] = new Pipe(leftCell, leftPosition)

		const rightPosition = { x: pipe.position.x + 1, y: pipe.position.y }
		const rightCell = this.getCell(rightPosition)
		if (rightCell !== EMPTY) neighborPipes[RIGHT] = new Pipe(rightCell, rightPosition)

		return neighborPipes
	}

	getNeighborConnectablePipes(pipe) {
		const connections = pipe.getConnections()
		const neighborPipes = this.getNeighborPipes(pipe)

		return connections
			.map(direction => ({ direction, neighborPipe: neighborPipes[direction] }))
			.filter(({ direction, neighborPipe }) => neighborPipe && neighborPipe.getConnections().includes(CONNECTIONS_COUPLES[direction]))
			.map(({ neighborPipe }) => neighborPipe)
	}
}

class Pipe {
	constructor(type, position) {
		this.type = type
		this.position = position
	}

	isSame(pipe) {
		return this.type === pipe.type && this.position.x === pipe.position.x && this.position.y === pipe.position.y
	}

	getConnections() {
		return PIPE_CONNECTIONS[this.type]
	}

	canConnect(pipe) {
		const pipeConnections = pipe.getConnections().map(direction => CONNECTIONS_COUPLES[direction])
		return this.getConnections().some(direction => pipeConnections.includes(direction))
	}
}

const parsePipeGrid = input => {
	const pipeGrid = new PipeGrid(EMPTY)
	const lines = input.map(line => line.split('').map(char => CHARACTERS_TABLE[char]))

	lines.forEach((row, y) => {
		row.forEach((cell, x) => {
			pipeGrid.setCell({ x, y }, cell)
		})
	})

	pipeGrid.setFixedBounds(true)
	return pipeGrid
}

const determineStartPipe = (pipeGrid, startPosition) => {
	return PIPES.find(pipeType => {
		const pipe = new Pipe(pipeType, startPosition)
		const connectablePipes = pipeGrid.getNeighborConnectablePipes(pipe)
		return connectablePipes.length === 2
	})
}

const getStartingPipe = pipeGrid => {
	const startPosition = pipeGrid.getAllPositionOf(START)[0]
	const startType = determineStartPipe(pipeGrid, startPosition)
	return new Pipe(startType, startPosition)
}

const buildPipeLoop = pipeGrid => {
	const startPipe = getStartingPipe(pipeGrid)
	pipeGrid.setCell(startPipe.position, startPipe.type)
	const pipeLoop = [startPipe]
	let previousPipe
	let currentPipe = startPipe

	do {
		const connectablePipes = pipeGrid.getNeighborConnectablePipes(currentPipe)
		const nextPipe = connectablePipes.find(pipe => !previousPipe || !pipe.isSame(previousPipe))

		previousPipe = currentPipe
		currentPipe = nextPipe

		pipeLoop.push(currentPipe)
	} while (!currentPipe.isSame(startPipe))

	pipeLoop.pop()
	return pipeLoop
}

const hashPosition = position => `${position.x}/${position.y}`

const getPipeLoopMap = pipeLoop => {
	const pipeLoopMap = new Map()
	pipeLoop.forEach(pipe => pipeLoopMap.set(hashPosition(pipe.position), pipe))
	return pipeLoopMap
}

const clearPipeGrid = (pipeGrid, pipeLoopMap) => {
	const clearedPipeGrid = Grid.clone(pipeGrid)

	clearedPipeGrid.forEach((_cell, position) => {
		if (!pipeLoopMap.has(hashPosition(position))) {
			clearedPipeGrid.setCell(position, EMPTY)
		}
	})

	return clearedPipeGrid
}

// Simplified raycasting method for point in a polygon
const isInside = (clearPipeGrid, pipeLoopMap, position) => {
	if (pipeLoopMap.has(hashPosition(position))) return false

	let pipeCrossedTimes = 0
	let currentPosition = { ...position }

	while(!clearPipeGrid.isOutsideBounds(currentPosition)) {
		const pipe = pipeLoopMap.get(hashPosition(currentPosition))
		if (pipe && INSIDE_BORDER_PIPES.includes(pipe.type)) {
			pipeCrossedTimes++
		}
		currentPosition.x -= 1
	}

	return pipeCrossedTimes % 2 === 1
}

const fillPipeGrid = (clearPipeGrid, pipeLoopMap) => {
	const filledPipeGrid = Grid.clone(clearPipeGrid)

	filledPipeGrid.forEach((_cell, position) => {
		const inside = isInside(clearPipeGrid, pipeLoopMap, position)
		const isPipe = pipeLoopMap.has(hashPosition(position))
		if (!isPipe) filledPipeGrid.setCell(position, inside ? INSIDE : OUTSIDE)
	})

	return filledPipeGrid
}

const contestResponse = input => {
	const pipeGrid = parsePipeGrid(input)
	const pipeLoop = buildPipeLoop(pipeGrid)
	const pipeLoopMap = getPipeLoopMap(pipeLoop)
	const clearedPipeGrid = clearPipeGrid(pipeGrid, pipeLoopMap)
	const filledPipeGrid = fillPipeGrid(clearedPipeGrid, pipeLoopMap)

	return filledPipeGrid.count(INSIDE)
}

module.exports = contestResponse