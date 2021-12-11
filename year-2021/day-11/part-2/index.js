const Grid = require('../../../utils/grid')

const flash = (grid, position) => {
	grid.setCell(position, 0)

	grid.getNeighborsPositionWithDiagonals(position)
		.forEach(neighborPosition => {
			const neighbor = grid.getCell(neighborPosition)
			if (neighbor) {
				const newNeighbor = neighbor + 1
				grid.setCell(neighborPosition, newNeighbor)
				if (newNeighbor > 9) {
					flash(grid, neighborPosition)
				}
			}
		})
}

const makeStep = grid => {
	grid.forEach((value, position) => {
		grid.setCell(position, value + 1)
	})

	grid.forEach((value, position) => {
		if (value > 9) {
			flash(grid, position)
		}
	})
}

const contestResponse = input => {
	const grid = new Grid()

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			grid.setCell({ x, y }, Number(cell))
		})
	})

	grid.setFixedBounds(true)

	let step = 0

	while(grid.some(value => value !== 0)) {
		makeStep(grid)
		step++
	}

	return step
}

module.exports = contestResponse