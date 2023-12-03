const Chalk = require('chalk')
const Grid = require('../../../utils/grid')

const DOT = '.'
const GEAR = '*'

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

const hashPosition = position => `${position.x}/${position.y}`

const getNumberAdjacentGears = (schematic, number) => {
	const { startPosition, endPosition } = number
	const gears = new Map()

	for (let x = startPosition.x; x <= endPosition.x; x++) {
		const position = { x, y: startPosition.y }
		const neighborPositions = schematic.getNeighborsPositionWithDiagonals(position)

		neighborPositions.forEach(neighborPosition => {
			const cell = schematic.getCell(neighborPosition)
			if (cell === GEAR) {
				gears.set(hashPosition(neighborPosition), neighborPosition)
			}

		})
	}

	return Array.from(gears.values())
}

const getGearsAndTheirNumbers = (schematic, numbers) => {
	const gears = new Map()

	numbers.forEach(number => {
		const numberGears = getNumberAdjacentGears(schematic, number)
		numberGears.forEach(gear => {
			const hash = hashPosition(gear)
			if (!gears.has(hash)) gears.set(hash, {
				position: gear,
				numbers: []
			})
			gears.get(hash).numbers.push(number)
		})
	})

	return gears
}

const isValidGear = gear => gear.numbers.length === 2

const getGearRatio = gear => gear.numbers[0].value * gear.numbers[1].value

const displaySchematic = (schematic, gears) => {
	const sch = Grid.clone(schematic)

	Array.from(gears.values()).forEach(gear => {
		const isValid = isValidGear(gear)

		if (isValid) {
			sch.setCell(gear.position, Chalk.green(sch.getCell(gear.position)))
		} else {
			sch.setCell(gear.position, Chalk.red(sch.getCell(gear.position)))
		}

		gear.numbers.forEach(number => {
			const { startPosition, endPosition } = number
			for (let x = startPosition.x; x <= endPosition.x; x++) {
				sch.setCell({ x, y: startPosition.y }, Chalk.yellow(sch.getCell({ x, y: startPosition.y })))
			}
		})
	})

	console.log(sch.toString())
}

const contestResponse = input => {
	const schematic = initSchematic(input)
	const numbers = findNumbers(schematic)
	const gears = getGearsAndTheirNumbers(schematic, numbers)

	return Array.from(gears.values())
		.filter(isValidGear)
		.map(getGearRatio)
		.reduce((acc, ratio) => acc + ratio, 0)
}

module.exports = contestResponse