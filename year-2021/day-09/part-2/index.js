const Grid = require('../../../utils/grid')

const findLowPoints = grid => {
	const lowPoints = []

	grid.forEach((depth, position) => {
		const neighbors = grid.getNeighbors(position)
		if (neighbors.every(neighborDepth => neighborDepth > depth)) {
			lowPoints.push(position)
		}
	})

	return lowPoints
}

const hashPosition = position => `${position.x}/${position.y}`

const getBasinSize = (grid, lowPoint) => {
	const seenPositions = new Set()
	seenPositions.add(hashPosition(lowPoint))
	let newPositions = [lowPoint]
	let nextNewPositions = []
	let basinSize = 1

	while(newPositions.length > 0) {
		newPositions.forEach(position => {
			grid
				.getNeighborsPosition(position)
				.forEach(neighborPosition => {
					if (grid.getCell(neighborPosition) === 9) return

					const hash = hashPosition(neighborPosition)
					if (seenPositions.has(hash)) return

					seenPositions.add(hash)
					nextNewPositions.push(neighborPosition)
					basinSize++
				})
		})

		newPositions = nextNewPositions
		nextNewPositions = []
	}

	return basinSize
}

const contestResponse = input => {
	const grid = new Grid(9)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			grid.setCell({ x, y }, Number(cell))
		})
	})

	const lowPoints = findLowPoints(grid)
	const basinSizesOrdered = lowPoints
		.map(lowPoint => getBasinSize(grid, lowPoint))
		.sort((a, b) => b - a)

	const result = basinSizesOrdered
		.slice(0, 3)
		.reduce((a, b) => a * b)

	return result
}

module.exports = contestResponse