const { Grid } = require('../../../utils')

const EMPTY = '.'
const GALAXY = '#'

const EXPANSION_FACTOR = 1000000

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

const getEmptyRows = universe => {
	const emptyRows = new Set()

	for (let x = universe.minX; x <= universe.maxX; x++) {
		const row = Object.values(universe.getRow(x))
		const isEmpty = row.every(cell => cell === EMPTY)
		if (isEmpty) emptyRows.add(x)
	}

	return emptyRows
}

const getEmptyColumns = universe => {
	const emptyColumns = new Set()

	for (let y = universe.minY; y <= universe.maxY; y++) {
		const column = Object.values(universe.getColumn(y))
		const isEmpty = column.every(cell => cell === EMPTY)
		if (isEmpty) emptyColumns.add(y)
	}

	return emptyColumns
}

const getExpandedGalaxy = (galaxy, emptyRows, emptyColumns) => {
	let emptyXCount = 0
	let emptyYCount = 0

	for (let x = 0; x < galaxy.x; x++) {
		if (emptyRows.has(x)) emptyXCount++
	}

	for (let y = 0; y < galaxy.y; y++) {
		if (emptyColumns.has(y)) emptyYCount++
	}

	return {
		x: galaxy.x + emptyXCount * (EXPANSION_FACTOR - 1),
		y: galaxy.y + emptyYCount * (EXPANSION_FACTOR - 1)
	}
}

const getExpandedGalaxies = (universe) => {
	const galaxies = universe.getAllPositionOf(GALAXY)
	const emptyRows = getEmptyRows(universe)
	const emptyColumns = getEmptyColumns(universe)
	return galaxies.map(galaxy => getExpandedGalaxy(galaxy, emptyRows, emptyColumns))
}

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
	const expandedGalaxies = getExpandedGalaxies(universe)
	const pairs = getGalaxiesPairs(expandedGalaxies)

	return pairs
		.map(({ galaxy1, galaxy2 }) => getManhattanDistance(galaxy1, galaxy2))
		.reduce((sum, current) => sum + current)
}

module.exports = contestResponse