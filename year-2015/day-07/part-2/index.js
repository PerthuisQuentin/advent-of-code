const MAX_16_BIT = 65535
const MOVE = 'MOVE'
const NOT = 'NOT'
const AND = 'AND'
const OR = 'OR'
const LSHIFT = 'LSHIFT'
const RSHIFT = 'RSHIFT'

const OPERATIONS = {
	[MOVE]: (circuit, instruction) => circuit.get(instruction.input) & MAX_16_BIT,
	[NOT]: (circuit, instruction) => (~circuit.get(instruction.input)) & MAX_16_BIT,
	[AND]: (circuit, instruction) => (circuit.get(instruction.input1) & circuit.get(instruction.input2)) & MAX_16_BIT,
	[OR]: (circuit, instruction) => (circuit.get(instruction.input1) | circuit.get(instruction.input2)) & MAX_16_BIT,
	[LSHIFT]: (circuit, instruction) => (circuit.get(instruction.input1) << circuit.get(instruction.input2)) & MAX_16_BIT,
	[RSHIFT]: (circuit, instruction) => (circuit.get(instruction.input1) >> circuit.get(instruction.input2)) & MAX_16_BIT
}

class Circuit {
	constructor(instructions) {
		this.wires = {}
		this.memory = {}
		instructions.forEach(instructionLine => {
			const instruction = this.parseInstruction(instructionLine)
			if (!OPERATIONS[instruction.operation]) throw new Error(`Unknown operation : ${instruction.operation}`)
			this.wires[instruction.output] = instruction
		})
	}

	parseInstruction(instruction) {
		const [input, output] = instruction.split(' -> ')
		const splittedInput = input.split(' ')

		if (splittedInput.length === 1) {
			return {
				operation: MOVE,
				input: splittedInput[0],
				output
			}
		} else if (splittedInput.length === 2) {
			return {
				operation: splittedInput[0],
				input: splittedInput[1],
				output
			}
		} else if (splittedInput.length === 3) {
			return {
				operation: splittedInput[1],
				input1: splittedInput[0],
				input2: splittedInput[2],
				output
			}
		}
	}

	get(value) {
		if (isNaN(value)) {
			if (this.memory[value]) return this.memory[value]
			
			const instruction = this.wires[value]
			const result = OPERATIONS[instruction.operation](this, instruction)

			this.memory[value] = result
			return result
		}
		else return Number(value)
	}
}

const contestResponse = input => {

	const circuit =  new Circuit(input)

	circuit.memory['b'] = 16076

	return circuit.get('a')
}

module.exports = contestResponse