const { Grid } = require('../../../utils')

const ROUND_ROCK = 'O'
const SQUARE_ROCK = '#'
const EMPTY = '.'

const parsePlateform = input => {
	const platform = new Grid(EMPTY)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			platform.setCell({ x, y }, cell)
		})
	})

	platform.setFixedBounds(true)
	return platform
}

const rollToTheNorth = platform => {
	const plateformCopy = Grid.clone(platform)
	let somethingMoved

	do {
		somethingMoved = false

		plateformCopy.forEach((cell, position) => {
			if (cell !== ROUND_ROCK) return
			const northPosition = { x: position.x, y: position.y - 1 }
			if (plateformCopy.isOutsideBounds(northPosition)) return

			if (plateformCopy.getCell(northPosition) === EMPTY) {
				plateformCopy.setCell(position, EMPTY)
				plateformCopy.setCell(northPosition, cell)
				somethingMoved = true
			}
		})
	} while (somethingMoved)

	return plateformCopy
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
	const platform = parsePlateform(input)
	const tiltedPlatform = rollToTheNorth(platform)

	return getTotalLoad(tiltedPlatform)
}

module.exports = contestResponse