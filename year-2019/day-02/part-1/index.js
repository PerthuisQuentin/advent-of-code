const ADD = 1
const MULTIPLY = 2
const STOP = 99

const commands = {
	[ADD]: (program, input1, input2, output) => {
		program[output] = program[input1] + program[input2]
	},
	[MULTIPLY]: (program, input1, input2, output) => {
		program[output] = program[input1] * program[input2]
	}
}

const compute = program => {
	let index = 0

	while(program[index] !== STOP) {
		const operation = program[index]
		const input1 = program[index + 1]
		const input2 = program[index + 2]
		const output = program[index + 3]

		commands[operation](program, input1, input2, output)

		index += 4
	}
}

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	compute(program)

	return program.join(',')
}

module.exports = contestResponse