const COMMAND_ADD = 1
const COMMAND_MULTIPLY = 2
const COMMAND_INPUT = 3
const COMMAND_OUTPUT = 4
const COMMAND_JUMP_IF_TRUE = 5
const COMMAND_JUMP_IF_FALSE = 6
const COMMAND_LESS_THAN = 7
const COMMAND_EQUALS = 8
const COMMAND_SET_RELATIVE_BASE = 9
const COMMAND_STOP = 99

const POSITION_MODE = 0
const IMMEDIATE_MODE = 1
const RELATIVE_MODE = 2

const commands = {
	[COMMAND_ADD]: {
		name: 'Add',
		parametersAmount: 3,
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			const result = firstParam + secondParam
			machine.writeToParam(3, result)
			machine.addProgramIndex(4)
		}
	},
	[COMMAND_MULTIPLY]: {
		name: 'Multiply',
		parametersAmount: 3,
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			const result = firstParam * secondParam
			machine.writeToParam(3, result)
			machine.addProgramIndex(4)
		}
	},
	[COMMAND_INPUT]: {
		name: 'Input',
		parametersAmount: 1,
		input: true,
		exec: machine => {
			const value = machine.getNextInput()
			machine.writeToParam(1, value)
			machine.addProgramIndex(2)
		}
	},
	[COMMAND_OUTPUT]: {
		name: 'Output',
		parametersAmount: 1,
		output: true,
		exec: machine => {
			const value = machine.getParam(1)
			machine.writeToOutput(value)
			machine.addProgramIndex(2)
		}
	},
	[COMMAND_JUMP_IF_TRUE]: {
		name: 'Jump If True',
		parametersAmount: 2,
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			if (firstParam !== 0) machine.setProgramIndex(secondParam)
			else machine.addProgramIndex(3)
		}
	},
	[COMMAND_JUMP_IF_FALSE]: {
		name: 'Jump If False',
		parametersAmount: 2,
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			if (firstParam === 0) machine.setProgramIndex(secondParam)
			else machine.addProgramIndex(3)
		}
	},
	[COMMAND_LESS_THAN]: {
		name: 'Less Than',
		parametersAmount: 3,
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			const result = firstParam < secondParam ? 1 : 0
			machine.writeToParam(3, result)
			machine.addProgramIndex(4)
		}
	},
	[COMMAND_EQUALS]: {
		name: 'Equals',
		parametersAmount: 3,
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			const result = firstParam === secondParam ? 1 : 0
			machine.writeToParam(3, result)
			machine.addProgramIndex(4)
		}
	},
	[COMMAND_SET_RELATIVE_BASE]: {
		name: 'Set Relative Base',
		parametersAmount: 1,
		exec: machine => {
			const firstParam = machine.getParam(1)
			machine.addRelativeBaseIndex(firstParam)
			machine.addProgramIndex(2)
		}
	},
	[COMMAND_STOP]: {
		name: 'Stop',
		parametersAmount: 0,
		stop: true,
		exec: machine => {
			machine.stop()
		}
	}
}

class IntCode {
	constructor(program, options) {
		this.initialProgram = program.slice()
		this.debug = options && options.debug
		this.reset()
	}

	setDebug(value) {
		this.debug = value
	}

	reset() {
		this.program = this.initialProgram.slice()
		this.programIndex = 0
		this.relativeBaseIndex = 0
		this.inputs = []
		this.inputIndex = 0
		this.outputs = []
		this.currentOperation = null
		this.waitingForInput = false
		this.stoped = false
	}

	stop() {
		this.stoped = true
	}

	addProgramIndex(value) {
		this.programIndex += value
	}

	setProgramIndex(value) {
		this.programIndex = value
	}

	addRelativeBaseIndex(value) {
		this.relativeBaseIndex += value
	}

	setRelativeBaseIndex(value) {
		this.relativeBaseIndex = value
	}

	addInput(value) {
		this.inputs.push(value)
		this.waitingForInput = false
	}

	addInputs(values) {
		this.inputs = this.inputs.concat(values)
		this.waitingForInput = false
	}

	hasNextInput() {
		return this.inputIndex < this.inputs.length
	}

	getNextInput() {
		const value = this.inputs[this.inputIndex]
		this.inputIndex++
		return value
	}

	getParam(paramIndex) {
		const mode = this.currentOperation.parameterModes[paramIndex - 1]
		switch (mode) {
			case IMMEDIATE_MODE:
				return this.getImmediateParam(paramIndex)
			case POSITION_MODE:
				return this.getPositionParam(paramIndex)
			case RELATIVE_MODE:
				return this.getRelativeParam(paramIndex)
			default:
				throw new Error(`Unknown parameter mode : ${mode}`)
		}
	}

	getPositionParam(paramIndex) {
		return this.getValueAt(this.getValueAt(this.programIndex + paramIndex))
	}

	getImmediateParam(paramIndex) {
		return this.getValueAt(this.programIndex + paramIndex)
	}

	getRelativeParam(paramIndex) {
		return this.getValueAt(this.getValueAt(this.programIndex + paramIndex) + this.relativeBaseIndex)
	}

	getValueAt(position) {
		if (position < 0) throw new Error('Can\'t acces to a negative position')
		if (this.program[position] === undefined) this.program[position] = 0
		return this.program[position]
	}

	writeToParam(paramIndex, value) {
		const mode = this.currentOperation.parameterModes[paramIndex - 1]
		switch (mode) {
			case IMMEDIATE_MODE:
				throw new Error(`Can't write in immediate mode`)
			case POSITION_MODE:
				return this.writeToPositionParam(paramIndex, value)
			case RELATIVE_MODE:
				return this.writeToRelativeParam(paramIndex, value)
			default:
				throw new Error(`Unknown parameter mode : ${mode}`)
		}
	}

	writeToPositionParam(paramIndex, value) {
		const position = this.program[this.programIndex + paramIndex]
		this.write(position, value)
	}

	writeToRelativeParam(paramIndex, value) {
		const position = this.program[this.programIndex + paramIndex] + this.relativeBaseIndex
		this.write(position, value)
	}

	write(position, value) {
		if (position < 0) throw new Error('Can\'t write to a negative position')
		this.program[position] = value
	}

	writeToOutput(value) {
		this.outputs.push(value)
	}

	getOutputs() {
		return this.outputs
	}

	getLastOutput() {
		return this.outputs[this.outputs.length - 1]
	}

	getLastOutputs(amount) {
		return this.outputs.slice(-amount)
	}

	getNextOperation() {
		const operation = this.getValueAt(this.programIndex)
		const thirdParamMode = Math.floor(operation / 10000)
		let rest = operation % 10000
		const secondParamMode = Math.floor(rest / 1000)
		rest = rest % 1000
		const firstParamMode = Math.floor(rest / 100)
		const code = rest % 100
		const command = commands[code]

		if (!command) throw new Error(`Unknown operation code : ${code}`)

		return {
			command,
			parameterModes: [firstParamMode, secondParamMode, thirdParamMode]
		}
	}

	runNextOperation() {
		this.currentOperation = this.getNextOperation()

		if (this.debug) {
			this.logSeparator()
			this.logCurrentOperation()
		}

		if (this.currentOperation.command.input && !this.hasNextInput()) {
			this.waitingForInput = true
			return
		}

		this.currentOperation.command.exec(this)

		if (this.debug) this.logProgram()
	}

	canRun() {
		return !this.stoped && !this.waitingForInput
	}

	run() {
		if (this.debug) this.logProgram()

		do { this.runNextOperation() } while (this.canRun())
	}

	logSeparator() {
		console.log('=======================================')
	}

	logProgram() {
		console.log(`[Program] ${this.program.join(',')}`)
		console.log(`[State] Index : ${this.programIndex} / Relative Base : ${this.relativeBaseIndex}`)
	}

	logCurrentOperation() {
		const name = this.currentOperation.command.name
		const parameters = this.program.slice(this.programIndex, this.programIndex + this.currentOperation.command.parametersAmount)
		const modes = this.currentOperation.parameterModes.join('')
		console.log(`[Operation] ${name} ${parameters} (${modes})`)
	}
}

module.exports = IntCode