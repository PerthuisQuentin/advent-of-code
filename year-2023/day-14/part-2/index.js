const { Grid } = require('../../../utils')

const ROUND_ROCK = 'O'
const SQUARE_ROCK = '#'
const EMPTY = '.'

const NORTH = 'N'
const SOUTH = 'S'
const EAST = 'E'
const WEST = 'W'

const ROTATION = [NORTH, WEST, SOUTH, EAST]

const TARGET_CYCLE = 1000000000

const NEXT_POSITION_BY_DIRECTION = {
	[NORTH]: ({ x, y }) => ({ x, y: y - 1 }),
	[SOUTH]: ({ x, y }) => ({ x, y: y + 1 }),
	[EAST]: ({ x, y }) => ({ x: x + 1, y }),
	[WEST]: ({ x, y }) => ({ x: x - 1, y }),
}

const parsePlatform = input => {
	const platform = new Grid(EMPTY)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			platform.setCell({ x, y }, cell)
		})
	})

	platform.setFixedBounds(true)
	return platform
}

const tiltPlatform = (platform, direction) => {
	const getNextPosition = NEXT_POSITION_BY_DIRECTION[direction]
	let somethingMoved

	do {
		somethingMoved = false

		platform.forEach((cell, position) => {
			if (cell !== ROUND_ROCK) return
			const nextPosition = getNextPosition(position)
			if (platform.isOutsideBounds(nextPosition)) return

			if (platform.getCell(nextPosition) === EMPTY) {
				platform.setCell(position, EMPTY)
				platform.setCell(nextPosition, cell)
				somethingMoved = true
			}
		})
	} while (somethingMoved)

	return platform
}

const rotatePlatform = platform => {
	let rotatingPlatform = platform

	ROTATION.forEach(direction => {
		rotatingPlatform = tiltPlatform(rotatingPlatform, direction)
	})

	return rotatingPlatform
}

const rotatePlatformUntilTarget = (platform, targetCycle) => {
	const cycleByPlatformHash = new Map()
	let currentPlatform = platform
	let currentPlatformHash = currentPlatform.toString()
	let cycle = 0

	while (cycle < targetCycle) {
		cycleByPlatformHash.set(currentPlatformHash, cycle)

		currentPlatform = rotatePlatform(currentPlatform)
		currentPlatformHash = currentPlatform.toString()
		cycle++

		if (cycleByPlatformHash.has(currentPlatformHash)) {
			const remainingCycle = targetCycle - cycle
			const loopLength = cycle - cycleByPlatformHash.get(currentPlatformHash)
			const remainingCycleAfterJump = remainingCycle % loopLength
			cycle = targetCycle - remainingCycleAfterJump
		}
	}

	return currentPlatform
}

const getTotalLoad = platform => {
	const height = platform.maxY - platform.minY + 1
	let totalWeight = 0

	platform.getAllPositionOf(ROUND_ROCK).forEach(position => {
		totalWeight += height - position.y
	})

	return totalWeight
}

const contestResponse = input => {
	const platform = parsePlatform(input)
	const platformAfterCycles = rotatePlatformUntilTarget(platform, TARGET_CYCLE)
	return getTotalLoad(platformAfterCycles)
}

module.exports = contestResponse