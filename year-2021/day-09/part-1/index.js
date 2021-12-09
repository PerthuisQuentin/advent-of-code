const Grid = require('../../../utils/grid')

const findLowPoints = grid => {
	const lowPoints = []

	grid.forEach((depth, position) => {
		const neighbors = grid.getNeighbors(position)
		if (neighbors.every(neighborDepth => neighborDepth > depth)) {
			lowPoints.push(depth)
		}
	})

	return lowPoints
}

const contestResponse = input => {
	const grid = new Grid(9)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			grid.setCell({ x, y }, Number(cell))
		})
	})

	const lowPoints = findLowPoints(grid)

	const sumRiskLevels = lowPoints
		.reduce((total, depth) => total + depth + 1, 0)

	return sumRiskLevels
}

module.exports = contestResponse