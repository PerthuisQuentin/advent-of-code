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
		cycle: 0
	}
	let signalStrength = 0

	input.forEach(commandLine => {
		const [commandName] = commandLine.split(' ')
		const command = COMMANDS[commandName]
		const commandCycles = command(commandLine)

		commandCycles.forEach(commandOperation => {
			program.cycle++

			if ((program.cycle + 20) % 40 === 0) {
				signalStrength += program.cycle * program.registerX
			}

			commandOperation(program)
		})
	})

	return signalStrength
}

module.exports = contestResponse