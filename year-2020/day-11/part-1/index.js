const Grid = require('../../../utils/grid')

const FLOOR = '.'
const EMPTY_SEAT = 'L'
const OCCUPIED_SEAT = '#'

const contestResponse = input => {
	const grid = new Grid(FLOOR)
	
	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			grid.setCell({ x, y }, cell)
		})
	})

	grid.setFixedBounds(true)

	let previousGrid = grid
	let stable = false

	while(!stable) {
		const newGrid = Grid.clone(previousGrid)
		stable = true

		previousGrid.forEach((cell, position) => {
			const neighbors = previousGrid.getNeighborsWithDiagonals(position)

			if (cell === EMPTY_SEAT) {
				const allNeighborsEmpty = !neighbors.some(neighbor => neighbor === OCCUPIED_SEAT)
				if (allNeighborsEmpty) {
					newGrid.setCell(position, OCCUPIED_SEAT)
					stable = false
				}
			} else if (cell === OCCUPIED_SEAT) {
				const occupiedCount = neighbors.filter(neighbor => neighbor === OCCUPIED_SEAT).length
				if (occupiedCount >= 4) {
					newGrid.setCell(position, EMPTY_SEAT)
					stable = false
				}
			}
		})

		previousGrid = newGrid
	}

	return previousGrid.count(OCCUPIED_SEAT)
}

module.exports = contestResponse