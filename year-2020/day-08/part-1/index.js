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
		this.instructions = this.parseInstructions(instructions)
		this.cursor = 0
		this.accumulator = 0
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

	runToFirstDuplicate() {
		const set = new Set()
		do {
			set.add(this.cursor)
			this.step()
		} while (!set.has(this.cursor))
	}
}

const contestResponse = input => {
	const program = new Program(input)
	
	program.runToFirstDuplicate()

	return program.accumulator
}

module.exports = contestResponse