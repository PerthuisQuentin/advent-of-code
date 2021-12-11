const Grid = require('../../../utils/grid')

const flash = (grid, position) => {
	let flashCount = 1

	grid.setCell(position, 0)

	grid.getNeighborsPositionWithDiagonals(position)
		.forEach(neighborPosition => {
			const neighbor = grid.getCell(neighborPosition)
			if (neighbor) {
				const newNeighbor = neighbor + 1
				grid.setCell(neighborPosition, newNeighbor)
				if (newNeighbor > 9) {
					flashCount += flash(grid, neighborPosition)
				}
			}
		})

	return flashCount
}

const makeStep = grid => {
	let flashCount = 0

	grid.forEach((value, position) => {
		grid.setCell(position, value + 1)
	})

	grid.forEach((value, position) => {
		if (value > 9) {
			flashCount += flash(grid, position)
		}
	})

	return flashCount
}

const contestResponse = input => {
	const grid = new Grid()

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			grid.setCell({ x, y }, Number(cell))
		})
	})

	grid.setFixedBounds(true)

	let flashCount = 0

	for (let i = 0; i < 100; i++) {
		flashCount += makeStep(grid)
	}

	return flashCount
}

module.exports = contestResponse