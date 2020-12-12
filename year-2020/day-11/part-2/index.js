const Grid = require('../../../utils/grid')

const FLOOR = '.'
const EMPTY_SEAT = 'L'
const OCCUPIED_SEAT = '#'

const getFirstSeatInDirection = (grid, position, direction) => {
	const current = Object.assign({}, position)
	let cell

	do {
		current.x += direction.x
		current.y += direction.y
		cell = grid.getCell(current)
	} while (cell === FLOOR && !grid.isOutsideBounds(current))

	return cell
}

const getSeatsInSight = (grid, position) => {
	return [
		getFirstSeatInDirection(grid, position, { x: 1, y: 0 }),
		getFirstSeatInDirection(grid, position, { x: -1, y: 0 }),
		getFirstSeatInDirection(grid, position, { x: 0, y: 1 }),
		getFirstSeatInDirection(grid, position, { x: 0, y: -1 }),
		getFirstSeatInDirection(grid, position, { x: 1, y: 1 }),
		getFirstSeatInDirection(grid, position, { x: -1, y: -1 }),
		getFirstSeatInDirection(grid, position, { x: 1, y: -1 }),
		getFirstSeatInDirection(grid, position, { x: -1, y: 1 }),
	]
}

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
			const neighbors = getSeatsInSight(previousGrid, position)

			if (cell === EMPTY_SEAT) {
				const allNeighborsEmpty = !neighbors.some(neighbor => neighbor === OCCUPIED_SEAT)
				if (allNeighborsEmpty) {
					newGrid.setCell(position, OCCUPIED_SEAT)
					stable = false
				}
			} else if (cell === OCCUPIED_SEAT) {
				const occupiedCount = neighbors.filter(neighbor => neighbor === OCCUPIED_SEAT).length
				if (occupiedCount >= 5) {
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