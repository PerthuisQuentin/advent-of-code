const Grid = require('../../../utils/grid')

const EMPTY = '.'
const TREE = '#'

const contestResponse = input => {
	const grid = new Grid(EMPTY)

	input.forEach((line, y) => {
		line.split('').forEach((element, x) => {
			grid.setCell({ x, y }, element)
		})
	})

	const gridBounds = grid.getBounds()
	const position = { x: 0, y: 0 }

	let treeCount = 0

	while (position.y < gridBounds.maxY) {
		position.y++
		position.x = (position.x + 3) % (gridBounds.maxX + 1)
		const cellContent = grid.getCell(position)

		if (cellContent === TREE) treeCount++
	}

	return treeCount
}

module.exports = contestResponse