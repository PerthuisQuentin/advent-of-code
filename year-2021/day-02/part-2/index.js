const FORWARD = 'forward'
const DOWN = 'down'
const UP = 'up'

const SEPARATOR = ' '

const contestResponse = input => {
	let horizontal = 0
	let depth = 0
	let aim = 0

	input
		.map(instruction => {
			const splittedInstruction = instruction.split(SEPARATOR)
			return {
				command: splittedInstruction[0],
				value: Number(splittedInstruction[1])
			}
		})
		.forEach(instruction => {
			switch (instruction.command) {
				case FORWARD:
					horizontal += instruction.value
					depth += (aim * instruction.value)
					break;
				case DOWN:
					aim += instruction.value
					break;
				case UP:
					aim -= instruction.value
					break;
				default:
					throw new Error(`Unknown command : ${instruction.command}`)
			}
		})

	return horizontal * depth
}

module.exports = contestResponse