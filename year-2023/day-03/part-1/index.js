const Chalk = require('chalk')
const Grid = require('../../../utils/grid')

const DOT = '.'

const initSchematic = input => {
	const schematic = new Grid(DOT)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			schematic.setCell({ x, y }, cell)
		})
	})

	schematic.setFixedBounds(true)

	return schematic
}

const findNumbers = schematic => {
	const numbers = []
	let currentNumber

	for (let y = 0; y <= schematic.maxY; y++) {
		for (let x = 0; x <= schematic.maxX; x++) {
			const position = { x, y }
			const cell = schematic.getCell(position)

			if (cell.match(/\d/)) {
				if (!currentNumber) {
					currentNumber = {
						value: cell,
						startPosition: position,
						endPosition: position
					}
				} else {
					currentNumber.endPosition = position
					currentNumber.value += cell
				}
			} else if (currentNumber) {
				currentNumber.value = Number(currentNumber.value)
				numbers.push(currentNumber)
				currentNumber = null
			}
		}

		if (currentNumber) {
			currentNumber.value = Number(currentNumber.value)
			numbers.push(currentNumber)
			currentNumber = null
		}
	}

	return numbers
}

const doesNumberHaveAnAdjacentSymbol = (schematic, number) => {
	const { startPosition, endPosition } = number

	for (let x = startPosition.x; x <= endPosition.x; x++) {
		const position = { x, y: startPosition.y }
		const neighbors = schematic.getNeighborsWithDiagonals(position)

		if (neighbors.some(neighbor => neighbor !== DOT && !neighbor.match(/\d/))) {
			return true
		}
	}

	return false
}

const displaySchematic = (schematic, numbers) => {
	const sch = Grid.clone(schematic)

	numbers.forEach(number => {
		const { startPosition, endPosition } = number
		const does = doesNumberHaveAnAdjacentSymbol(sch, number)
		for (let x = startPosition.x; x <= endPosition.x; x++) {
			const position = { x, y: startPosition.y }

			if (does) {
				sch.setCell(position, Chalk.green(sch.getCell(position)))
			} else {
				sch.setCell(position, Chalk.red(sch.getCell(position)))
			}
		}
	})

	console.log(sch.toString())
}

const contestResponse = input => {
	const schematic = initSchematic(input)
	const numbers = findNumbers(schematic)

	return numbers
		.filter(number => doesNumberHaveAnAdjacentSymbol(schematic, number))
		.map(number => number.value)
		.reduce((a, b) => a + b, 0)
}

module.exports = contestResponse