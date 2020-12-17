const Grid3D = require('./grid3D')

const ACTIVE = '#'
const INACTIVE = '.'

const contestResponse = input => {
	const grid = new Grid3D(INACTIVE)
	const size = input.length + (2 * 6)

	for (let z = -size; z <= size; z++) {
		for (let y = -size; y <= size; y++) {
			for (let x = -size; x <= size; x++) {
				grid.setCell({ x, y, z }, INACTIVE)
			}
		}
	}

	input.forEach((line, y) => {
		line.split('').forEach((cell, x) => {
			grid.setCell({ x, y, z: 0 }, cell)
		})
	});

	let previousGrid = grid

	for (let cycle = 1; cycle <= 6; cycle++) {
		const newGrid = Grid3D.clone(previousGrid)

		previousGrid.getPositionsList().forEach(position => {
			const cell = previousGrid.getCell(position)
			const neighbors = previousGrid.getNeighborsWithDiagonals(position)
			const activeNeighbors = neighbors.filter(neighbor => neighbor === ACTIVE).length

			if (cell === ACTIVE && activeNeighbors !== 2 && activeNeighbors !== 3) {
				newGrid.setCell(position, INACTIVE)

			} else if (cell === INACTIVE && activeNeighbors === 3) {
				newGrid.setCell(position, ACTIVE)
			}
		})

		previousGrid = newGrid
	}

	return previousGrid.count(ACTIVE)
}

module.exports = contestResponse