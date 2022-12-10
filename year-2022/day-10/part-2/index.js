const COMMAND_ADDX = 'addx'
const COMMAND_NOOP = 'noop'

const COMMANDS = {
	[COMMAND_ADDX]: commandLine => {
		const [, value] = commandLine.split(' ')
		return [
			() => {},
			(program) => program.registerX += Number(value)
		]
	},
	[COMMAND_NOOP]: () => [() => {}]
}

const contestResponse = input => {
	const program = {
		registerX: 1,
		cycle: 0,
		image: []
	}

	input.forEach(commandLine => {
		const [commandName] = commandLine.split(' ')
		const command = COMMANDS[commandName]
		const commandCycles = command(commandLine)

		commandCycles.forEach(commandOperation => {
			if (program.cycle % 40 === 0) {
				program.image.push('')
			}

			const imageIndex = program.cycle % 40
			const character = (imageIndex >= (program.registerX - 1) && imageIndex <= (program.registerX + 1))
				? '#'
				: '.'

			program.image[program.image.length - 1] += character
			program.cycle++

			commandOperation(program)
		})
	})

	return program.image
}

module.exports = contestResponse