const DOT = '#'
const EMPTY = '.'

const Grid = require('../../../utils/grid')

const fold = (grid, instruction) => {
	const foldedGrid = new Grid(EMPTY)

	grid.forEach((cell, position) => {
		if (cell === EMPTY) return

		if (position[instruction.axis] < instruction.value) {
			foldedGrid.setCell(position, DOT)
		} else {
			const newPosition = { ...position }
			const delta = position[instruction.axis] - instruction.value
			newPosition[instruction.axis] = instruction.value - delta
			foldedGrid.setCell(newPosition, DOT)
		}
	})

	return foldedGrid
}

const contestResponse = input => {
	const separationIndex = input.indexOf('')

	const dots = input
		.slice(0, separationIndex)
		.map(line => {
			const lineParts = line.split(',').map(Number)
			return {
				x: lineParts[0],
				y: lineParts[1]
			}
		})

	const foldlInstructions = input
		.slice(separationIndex + 1)
		.map(line => {
			const values = line.slice(11)
			const lineParts = values.split('=')
			return {
				axis: lineParts[0],
				value: Number(lineParts[1])
			}
		})

	let grid = new Grid(EMPTY)

	dots.forEach(dot => {
		grid.setCell(dot, DOT)
	})

	foldlInstructions.forEach(instruction => {
		grid = fold(grid, instruction)
	})

	console.log(grid.toString())

	return grid.count(DOT)
}

module.exports = contestResponse