const COMMAND_ADD = 1
const COMMAND_MULTIPLY = 2
const COMMAND_INPUT = 3
const COMMAND_OUTPUT = 4
const COMMAND_JUMP_IF_TRUE = 5
const COMMAND_JUMP_IF_FALSE = 6
const COMMAND_JUMP_LESS_THAN = 7
const COMMAND_JUMP_EQUALS = 8
const COMMAND_STOP = 99

const POSITION_MODE = 0
const IMMEDIATE_MODE = 1

const THRUSTERS_AMOUNT = 5
const SETTINGS_PHASES = [0, 1, 2, 3, 4]

const getParam = (mode, program, index, param) => {
	if (mode === IMMEDIATE_MODE) return program[index + param]
	if (mode === POSITION_MODE) return program[program[index + param]]
	throw new Error('Unknown mode')
}

const commands = {
	[COMMAND_ADD]: {
		exec: (program, operation, index) => {
			const firstParam = getParam(operation.firstParamMode, program, index, 1)
			const secondParam = getParam(operation.secondParamMode, program, index, 2)
			const value = firstParam + secondParam
			program[program[index + 3]] = value
			return index + 4
		}
	},
	[COMMAND_MULTIPLY]: {
		exec: (program, operation, index) => {
			const firstParam = getParam(operation.firstParamMode, program, index, 1)
			const secondParam = getParam(operation.secondParamMode, program, index, 2)
			const value = firstParam * secondParam
			program[program[index + 3]] = value
			return index + 4
		}
	},
	[COMMAND_INPUT]: {
		exec: (program, operation, index) => {
			const value = getInput()
			program[program[index + 1]] = value
			return index + 2
		}
	},
	[COMMAND_OUTPUT]: {
		exec: (program, operation, index) => {
			const firstParam = getParam(operation.firstParamMode, program, index, 1)
			addOutput(firstParam)
			return index + 2
		}
	},
	[COMMAND_JUMP_IF_TRUE]: {
		exec: (program, operation, index) => {
			const firstParam = getParam(operation.firstParamMode, program, index, 1)
			const secondParam = getParam(operation.secondParamMode, program, index, 2)
			return firstParam !== 0 ? secondParam : index + 3
		}
	},
	[COMMAND_JUMP_IF_FALSE]: {
		exec: (program, operation, index) => {
			const firstParam = getParam(operation.firstParamMode, program, index, 1)
			const secondParam = getParam(operation.secondParamMode, program, index, 2)
			return firstParam === 0 ? secondParam : index + 3
		}
	},
	[COMMAND_JUMP_LESS_THAN]: {
		exec: (program, operation, index) => {
			const firstParam = getParam(operation.firstParamMode, program, index, 1)
			const secondParam = getParam(operation.secondParamMode, program, index, 2)
			program[program[index + 3]] = firstParam < secondParam ? 1 : 0
			return index + 4
		}
	},
	[COMMAND_JUMP_EQUALS]: {
		exec: (program, operation, index) => {
			const firstParam = getParam(operation.firstParamMode, program, index, 1)
			const secondParam = getParam(operation.secondParamMode, program, index, 2)
			program[program[index + 3]] = firstParam === secondParam ? 1 : 0
			return index + 4
		}
	},
	[COMMAND_STOP]: {
		stop: true,
		exec: (program, operation, index) => {
			return index
		}
	}
}

const parseOperation = operation => {
	const thirdParamMode = Math.floor(operation / 10000)
	let rest = operation % 10000
	const secondParamMode = Math.floor(rest / 1000)
	rest = rest % 1000
	const firstParamMode = Math.floor(rest / 100)
	const code = rest % 100

	return {
		thirdParamMode,
		secondParamMode,
		firstParamMode,
		command: commands[code]
	}
}

let INPUTS
let inputIndex
const setInputs = data => {
	inputIndex = 0
	INPUTS = data
}
const getInput = () => {
	const value = INPUTS[inputIndex]
	if (inputIndex < INPUTS.length - 1) inputIndex++
	return value
}

let OUTPUTS
const setOutpus = () => OUTPUTS = []
const addOutput = value => OUTPUTS.push(value)
const getOutputs = () => OUTPUTS.join(',')

const compute = (program, inputs) => {
	setInputs(inputs)
	setOutpus()

	let operation
	let index = 0

	do {
		operation = parseOperation(program[index])
		index = operation.command.exec(program, operation, index)
	} while (!operation.command.stop)

	return getOutputs()
}

const computeThrusters = (program, settings) => {
	let thrust = 0

	for (let i = 0; i < THRUSTERS_AMOUNT; i++) {
		const result = compute(program, [settings[i], thrust])
		thrust = Number(result)
	}

	return thrust
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

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	generateSettings([], SETTINGS_PHASES)

	const bestThrust = ALL_SETTINGS
		.map(settings => computeThrusters(program, settings))
		.reduce((acc, cur) => cur > acc ? cur : acc, 0)

	return bestThrust
}

module.exports = contestResponse