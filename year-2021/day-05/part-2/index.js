const Grid = require('../../../utils/grid')

const EMPTY_CELL = 0

const fillRow = (grid, line) => {
	let { x1, x2 } = line
	let min = x1 < x2 ? x1 : x2
	let max = x1 < x2 ? x2 : x1

	for (let i = min; i <= max; i++) {
		const position = { x: i, y: line.y1 }
		grid.setCell(position, grid.getCell(position) + 1)
	}
}

const fillColumn = (grid, line) => {
	let { y1, y2 } = line
	let min = y1 < y2 ? y1 : y2
	let max = y1 < y2 ? y2 : y1

	for (let i = min; i <= max; i++) {
		const position = { x: line.x1, y: i }
		grid.setCell(position, grid.getCell(position) + 1)
	}
}

const fillDiagonal = (grid, line) => {
	let { x1, x2, y1, y2 } = line
	let deltaX = x1 < x2 ? 1 : -1
	let deltaY = y1 < y2 ? 1 : -1
	let delta = Math.abs(x1 - x2)

	for (let i = 0; i <= delta; i++) {
		const position = {
			x: x1 + (i * deltaX),
			y: y1 + (i * deltaY)
		}
		grid.setCell(position, grid.getCell(position) + 1)
	}
}

const fillLine = (grid, line) => {
	if (line.x1 === line.x2) {
		fillColumn(grid, line)
	} else if (line.y1 === line.y2) {
		fillRow(grid, line)
	} else {
		fillDiagonal(grid, line)
	}
}

const contestResponse = input => {
	const lines = input
		.map(line => {
			const points = line.split(' -> ')
			const [x1, y1] = points[0].split(',').map(Number)
			const [x2, y2] = points[1].split(',').map(Number)
			return { x1, y1, x2, y2 }
		})

	const grid = new Grid(EMPTY_CELL)

	lines.forEach(line => {
		fillLine(grid, line)
	})

	let count = 0

	grid.forEach(cell => {
		if (cell > 1) count ++
	})

	return count
}

module.exports = contestResponse