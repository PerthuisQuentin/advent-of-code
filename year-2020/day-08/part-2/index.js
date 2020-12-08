const ACC = 'acc'
const NOP = 'nop'
const JMP = 'jmp'

const OPERATIONS = {
	[ACC]: (program, value) => {
		program.addAccumulator(value)
		program.addCursor(1)
	},
	[JMP]: (program, value) => {
		program.addCursor(value)
	},
	[NOP]: (program) => {
		program.addCursor(1)
	},
}

class Program {
	constructor(instructions) {
		this.instructions = instructions
		this.cursor = 0
		this.accumulator = 0
	}

	loadTextInstructions(instructions) {
		this.instructions = this.parseInstructions(instructions)
	}

	parseInstructions(instructions) {
		return instructions
			.map(line => {
				const [operation, value] = line.split(' ')
				return {
					operation,
					value: Number(value)
				}
			})
	}

	setAccumulator(value) {
		this.accumulator = value
	}

	addAccumulator(value) {
		this.accumulator += value
	}

	setCursor(value) {
		this.cursor = value
	}

	addCursor(value) {
		this.cursor += value
	}

	step() {
		const instruction = this.instructions[this.cursor]
		OPERATIONS[instruction.operation](this, instruction.value)
	}

	run() {
		const set = new Set()
		do {
			set.add(this.cursor)
			this.step()
		} while (!set.has(this.cursor) && this.instructions[this.cursor])
	}

	hasReachEnd() {
		return this.cursor === this.instructions.length
	}
}

const generateMutantPrograms = program => {
	const mutantPrograms = []

	program.instructions.forEach((instruction, i) => {
		if (instruction.operation !== NOP && instruction.operation !== JMP) return

		mutantPrograms.push(new Program([
			...program.instructions.slice(0, i),
			{
				operation: instruction.operation === NOP ? JMP : NOP,
				value: instruction.value
			},
			...program.instructions.slice(i + 1)
		]))
	})

	return mutantPrograms
}

const contestResponse = input => {
	const program = new Program()
	program.loadTextInstructions(input)
	const mutantPrograms = generateMutantPrograms(program)

	const workingProgram = mutantPrograms.find(mutantProgram => {
		mutantProgram.run()
		return mutantProgram.hasReachEnd()
	})

	return workingProgram.accumulator
}

module.exports = contestResponse