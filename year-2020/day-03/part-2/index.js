const Grid = require('../../../utils/grid')

const EMPTY = '.'
const TREE = '#'

const SLOPES = [
	{ x: 1, y: 1 },
	{ x: 3, y: 1 },
	{ x: 5, y: 1 },
	{ x: 7, y: 1 },
	{ x: 1, y: 2 }
]

const contestResponse = input => {
	const grid = new Grid(EMPTY)

	input.forEach((line, y) => {
		line.split('').forEach((element, x) => {
			grid.setCell({ x, y }, element)
		})
	})

	const gridBounds = grid.getBounds()
	let position
	let treeCount
	let treeCounts = []

	for (slope of SLOPES) {
		position = { x: 0, y: 0 }
		treeCount = 0

		while (position.y < gridBounds.maxY) {
			position.y += slope.y
			position.x = (position.x + slope.x) % (gridBounds.maxX + 1)
			const cellContent = grid.getCell(position)
	
			if (cellContent === TREE) treeCount++
		}

		treeCounts.push(treeCount)
	}

	return treeCounts.reduce((a, b) => a * b)
}

module.exports = contestResponse