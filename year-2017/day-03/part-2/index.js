const Grid = require('../../../utils/grid')

function* positions() {
	let pos = { x: 0, y: 0 }
	let i = 1
	let dir
	let step = 1

	while(true) {
		dir = step % 2 === 1 ? 1 : -1

		for (let y = 0; y < step; y++) {
			pos.x += dir
			yield pos
		}
		for (let y = 0; y < step; y++) {
			pos.y -= dir
			yield pos
		}

		step++
	}
}

const contestResponse = input => {
	const max = Number(input[0])
	const grid = new Grid(0)

	grid.setCell({ x: 0, y: 0 }, 1)

	const iterator = positions(0);

	let value = 1

	while (value < max) {
		const position = iterator.next().value
		const neighbors = grid.getNeighborsWithDiagonals(position)
		const sum = neighbors.reduce((a, b) => a + b)
		grid.setCell(position, sum)
		value = sum
	}

	console.log(grid.toParsedString(x => `\t${x}`))

	return value
}

module.exports = contestResponse