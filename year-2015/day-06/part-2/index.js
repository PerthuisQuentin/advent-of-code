const Grid = require('../../../utils/grid')

const TURN_ON = 'turn on'
const TURN_OFF = 'turn off'
const TOGGLE = 'toggle'

const instructionRegex = /^(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)$/

const parseInstruction = line => {
	const [, command, xA, yA, xB, yB] = line.match(instructionRegex)
	return {
		command,
		positionA: { x: Number(xA), y: Number(yA) },
		positionB: { x: Number(xB), y: Number(yB) }
	}
}

const applyInstruction = (grid, instruction) => {
	if (instruction.command === TURN_ON) {
		grid.applyOnSubGrid(instruction.positionA, instruction.positionB, x => x + 1)
	} else if (instruction.command === TURN_OFF) {
		grid.applyOnSubGrid(instruction.positionA, instruction.positionB, x => Math.max(x - 1, 0))
	} else if (instruction.command === TOGGLE) {
		grid.applyOnSubGrid(instruction.positionA, instruction.positionB, x => x + 2)
	}
}

const contestResponse = input => {
	const grid = new Grid(0)

	input
		.map(parseInstruction)
		.forEach(instruction => applyInstruction(grid, instruction))

	let totalBrightness = 0
	grid.forEach(x => totalBrightness += x)

	return totalBrightness
}

module.exports = contestResponse
