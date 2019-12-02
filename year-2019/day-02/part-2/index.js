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

const testPrograms = (program, search) => {
	for (let noun = 0; noun < 100; noun++) {
		for (let verb = 0; verb < 100; verb++) {
			const programCopy = program.slice(0)
			programCopy[1] = noun
			programCopy[2] = verb
			compute(programCopy)
			
			if (programCopy[0] === search) return 100 * noun + verb
		}
	}
}

const contestResponse = input => {
	const search = Number(input[0])
	const program = input[1].split(',').map(Number)

	return testPrograms(program, search)
}

module.exports = contestResponse