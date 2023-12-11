const { Grid } = require('../../../utils')

const EMPTY = '.'
const GALAXY = '#'

const parseUniverse = input => {
	const universe = new Grid(EMPTY)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			universe.setCell({ x, y }, cell)
		})
	})

	universe.setFixedBounds(true)
	return universe
}

const expandUniverseRows = universe => {
	const expandedUniverse = new Grid(EMPTY)
	let newX = 0

	for (let x = universe.minX; x <= universe.maxX; x++) {
		const row = Object.values(universe.getRow(x))
		const isEmpty = row.every(cell => cell === EMPTY)

		row.forEach((cell, y) => {
			expandedUniverse.setCell({ x: newX, y }, cell)
		})
		newX++

		if (isEmpty) {
			row.forEach((cell, y) => {
				expandedUniverse.setCell({ x: newX, y }, cell)
			})
			newX++
		}
	}

	expandedUniverse.setFixedBounds(true)
	return expandedUniverse
}


const expandUniverseColumns = universe => {
	const expandedUniverse = new Grid(EMPTY)
	let newY = 0

	for (let y = universe.minY; y <= universe.maxY; y++) {
		const column = Object.values(universe.getColumn(y))
		const isEmpty = column.every(cell => cell === EMPTY)

		column.forEach((cell, x) => {
			expandedUniverse.setCell({ y: newY, x }, cell)
		})
		newY++

		if (isEmpty) {
			column.forEach((cell, x) => {
				expandedUniverse.setCell({ y: newY, x }, cell)
			})
			newY++
		}
	}

	expandedUniverse.setFixedBounds(true)
	return expandedUniverse
}

const expandUniverse = universe => expandUniverseRows(expandUniverseColumns(universe))

const getGalaxiesPairs = (galaxies) => {
	const pairs = []

	for (let i = 0; i < galaxies.length; i++) {
		for (let j = i + 1; j < galaxies.length; j++) {
			pairs.push({
				galaxy1: galaxies[i],
				galaxy2: galaxies[j]
			})
		}
	}

	return pairs

}

const getManhattanDistance = (position1, position2) => {
	return Math.abs(position1.x - position2.x) + Math.abs(position1.y - position2.y)
}

const contestResponse = input => {
	const universe = parseUniverse(input)
	const expandedUniverse = expandUniverse(universe)
	const galaxies = expandedUniverse.getAllPositionOf(GALAXY)
	const pairs = getGalaxiesPairs(galaxies)

	return pairs
		.map(({ galaxy1, galaxy2 }) => getManhattanDistance(galaxy1, galaxy2))
		.reduce((sum, current) => sum + current)
}

module.exports = contestResponse