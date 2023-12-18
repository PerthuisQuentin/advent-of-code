const { Grid } = require('../../../utils')

const MIRROR_A = '/'
const MIRROR_B = '\\'
const EMPTY = '.'
const SPLITTER_A = '|'
const SPLITTER_B = '-'

const LEFT = 'L'
const RIGHT = 'R'
const UP = 'U'
const DOWN = 'D'

const DIRECTIONS_TO_POSITION = {
	[LEFT]: (position) => ({ x: position.x - 1, y: position.y }),
	[RIGHT]: (position) => ({ x: position.x + 1, y: position.y }),
	[UP]: (position) => ({ x: position.x, y: position.y - 1 }),
	[DOWN]: (position) => ({ x: position.x, y: position.y + 1 })
}

const MIRRORS_REDIRECTIONS = {
	[MIRROR_A]: {
		[LEFT]: DOWN,
		[RIGHT]: UP,
		[UP]: RIGHT,
		[DOWN]: LEFT
	},
	[MIRROR_B]: {
		[LEFT]: UP,
		[RIGHT]: DOWN,
		[UP]: LEFT,
		[DOWN]: RIGHT
	}
}

const SPLITTERS_REDIRECTIONS = {
	[SPLITTER_A]: {
		[LEFT]: [UP, DOWN],
		[RIGHT]: [UP, DOWN],
		[UP]: [UP],
		[DOWN]: [DOWN]
	},
	[SPLITTER_B]: {
		[LEFT]: [LEFT],
		[RIGHT]: [RIGHT],
		[UP]: [LEFT, RIGHT],
		[DOWN]: [LEFT, RIGHT]
	}
}


const hashPosition = position => `${position.x}/${position.y}`

const parseMirrorsGrid = input => {
	const mirrors = new Grid(EMPTY)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			mirrors.setCell({ x, y }, cell)
		})
	})

	mirrors.setFixedBounds(true)
	return mirrors
}

const energizeRec = (mirrors, energizedMap, position, direction) => {
	if (mirrors.isOutsideBounds(position)) return
	let currentPosition = position
	let currentDirection = direction

	do {
		const hash = hashPosition(currentPosition)
		const energizedDirections = energizedMap.get(hash) || new Set()
		if (energizedDirections.has(currentDirection)) return

		energizedDirections.add(currentDirection)
		energizedMap.set(hash, energizedDirections)

		const cell = mirrors.getCell(currentPosition)
		if (cell === EMPTY) {
			currentPosition = DIRECTIONS_TO_POSITION[currentDirection](currentPosition)
		}
		else if (cell === MIRROR_A || cell === MIRROR_B) {
			currentDirection = MIRRORS_REDIRECTIONS[cell][currentDirection]
			currentPosition = DIRECTIONS_TO_POSITION[currentDirection](currentPosition)
		}
		else if (cell === SPLITTER_A || cell === SPLITTER_B) {
			const directions = SPLITTERS_REDIRECTIONS[cell][currentDirection]
			directions.forEach(direction => {
				const nextPosition = DIRECTIONS_TO_POSITION[direction](currentPosition)
				energizeRec(mirrors, energizedMap, nextPosition, direction)
			})
			return
		}
	} while (!mirrors.isOutsideBounds(currentPosition))
}

const getEnergizedMap = (mirrors, startPosition, startDirection) => {
	const energizedMap = new Map()
	energizeRec(mirrors, energizedMap, startPosition, startDirection)
	return energizedMap
}

const drawEnergizedMap = (mirrors, energizedMap) => {
	const copy = Grid.clone(mirrors)
	copy.forEach((_cell, position) => {
		const energized = energizedMap.get(hashPosition(position))
		copy.setCell(position, energized?.size ? '#' : '.')
	})
	console.log(copy.toString())
}

const getEnergizedTiles = (mirrors, startPosition, startDirection) => getEnergizedMap(mirrors, startPosition, startDirection).size

const getMostEnergizedTiles = (mirrors) => {
	const { minX, maxX, minY, maxY } = mirrors.getBounds()
	let energizedTilesList = []

	for (let x = minX; x <= maxX; x++) {
		energizedTilesList.push(getEnergizedTiles(mirrors, { x, y: minY }, DOWN))
		energizedTilesList.push(getEnergizedTiles(mirrors, { x, y: maxY }, UP))
	}

	for (let y = minY; y <= maxY; y++) {
		energizedTilesList.push(getEnergizedTiles(mirrors, { x: minX, y }, RIGHT))
		energizedTilesList.push(getEnergizedTiles(mirrors, { x: maxX, y }, LEFT))
	}

	return energizedTilesList.reduce((max, value) => Math.max(max, value))
}

const contestResponse = input => {
	const mirrors = parseMirrorsGrid(input)
	return getMostEnergizedTiles(mirrors)
}

module.exports = contestResponse