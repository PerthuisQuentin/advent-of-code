const COMMAND_ADD = 1
const COMMAND_MULTIPLY = 2
const COMMAND_INPUT = 3
const COMMAND_OUTPUT = 4
const COMMAND_JUMP_IF_TRUE = 5
const COMMAND_JUMP_IF_FALSE = 6
const COMMAND_LESS_THAN = 7
const COMMAND_EQUALS = 8
const COMMAND_STOP = 99

const POSITION_MODE = 0
const IMMEDIATE_MODE = 1

const THRUSTERS_AMOUNT = 5
const SETTINGS_PHASES = [5, 6, 7, 8, 9]

const commands = {
	[COMMAND_ADD]: {
		name: 'Add',
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
		input: true,
		exec: machine => {
			const value = machine.getNextInput()
			machine.writeToParam(1, value)
			machine.addProgramIndex(2)
		}
	},
	[COMMAND_OUTPUT]: {
		name: 'Output',
		output: true,
		exec: machine => {
			const value = machine.getParam(1)
			machine.writeToOutput(value)
			machine.addProgramIndex(2)
		}
	},
	[COMMAND_JUMP_IF_TRUE]: {
		name: 'Jump If True',
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			if (firstParam !== 0) machine.setProgramIndex(secondParam)
			else machine.addProgramIndex(3)
		}
	},
	[COMMAND_JUMP_IF_FALSE]: {
		name: 'Jump If False',
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			if (firstParam === 0) machine.setProgramIndex(secondParam)
			else machine.addProgramIndex(3)
		}
	},
	[COMMAND_LESS_THAN]: {
		name: 'Less Than',
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
		exec: machine => {
			const firstParam = machine.getParam(1)
			const secondParam = machine.getParam(2)
			const result = firstParam === secondParam ? 1 : 0
			machine.writeToParam(3, result)
			machine.addProgramIndex(4)
		}
	},
	[COMMAND_STOP]: {
		name: 'Stop',
		stop: true,
		exec: machine => {
			machine.stop()
		}
	}
}

class Machine {
	constructor(program) {
		this.initialProgram = program.slice()
		this.reset()
	}

	reset() {
		this.program = this.initialProgram.slice()
		this.programIndex = 0
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
		if (mode === IMMEDIATE_MODE) return this.getImmediateParam(paramIndex)
		if (mode === POSITION_MODE) return this.getPositionParam(paramIndex)
		throw new Error('Unknown mode')
	}

	getPositionParam(paramIndex) {
		return this.program[this.program[this.programIndex + paramIndex]]
	}

	getImmediateParam(paramIndex) {
		return this.program[this.programIndex + paramIndex]
	}

	writeToParam(paramIndex, value) {
		const position = this.getImmediateParam(paramIndex)
		this.write(position, value)
	}

	write(position, value) {
		this.program[position] = value
	}

	writeToOutput(value) {
		this.outputs.push(value)
	}

	getLastOutput() {
		return this.outputs[this.outputs.length - 1]
	}

	getNextOperation() {
		const operation = this.program[this.programIndex]
		const thirdParamMode = Math.floor(operation / 10000)
		let rest = operation % 10000
		const secondParamMode = Math.floor(rest / 1000)
		rest = rest % 1000
		const firstParamMode = Math.floor(rest / 100)
		const code = rest % 100

		return {
			command: commands[code],
			parameterModes: [firstParamMode, secondParamMode, thirdParamMode]
		}
	}

	runNextOperation() {
		this.currentOperation = this.getNextOperation()

		if (this.currentOperation.command.input && !this.hasNextInput()) {
			this.waitingForInput = true
			return
		}

		this.currentOperation.command.exec(this)
	}

	canRun() {
		return !this.stoped && !this.waitingForInput
	}

	run() {
		do { this.runNextOperation() } while (this.canRun())
	}
}

const ALL_SETTINGS = []

const generateSettings = (currentSettings, remainsSettings) => {
	if (remainsSettings.length === 0) return ALL_SETTINGS.push(currentSettings)

	for (let i = 0; i < remainsSettings.length; i++) {
		const newCurrentSettings = currentSettings.slice()
		newCurrentSettings.push(remainsSettings[i])
		const newRemainsSettings = remainsSettings.slice()
		newRemainsSettings.splice(i, 1)
		generateSettings(newCurrentSettings, newRemainsSettings)
	}
}

const createAmplificators = program => {
	const amplificators = []
	for (let i = 0; i < THRUSTERS_AMOUNT; i++) {
		amplificators.push(new Machine(program))
	}
	return amplificators
}

const initAmplificators = (amplificators, phases) => {
	amplificators.forEach((amplificator, index) => {
		amplificator.reset()
		amplificator.addInput(phases[index])
	})
}

const runAmplificators = amplificators => {
	let thrust = 0
	const lastAmplificator = amplificators[amplificators.length - 1]

	do {
		amplificators.forEach((amplificator, index) => {
			amplificator.addInput(thrust)
			amplificator.run()
			thrust = amplificator.getLastOutput()
		})
	} while(!lastAmplificator.stoped)

	return thrust
}

const calcAmplificators = (amplificators, phases) => {
	initAmplificators(amplificators, phases)
	return runAmplificators(amplificators)
}

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	generateSettings([], SETTINGS_PHASES)
	const amplificators = createAmplificators(program)

	const bestThrust = ALL_SETTINGS
		.map(settings => calcAmplificators(amplificators, settings))
		.reduce((acc, cur) => cur > acc ? cur : acc, 0)

	return bestThrust
}

module.exports = contestResponse