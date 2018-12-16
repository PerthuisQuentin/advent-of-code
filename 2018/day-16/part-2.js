function addr(register, a, b, c) {
	register[c] = register[a] + register[b]
}

function addi(register, a, b, c) {
	register[c] = register[a] + b
}

function mulr(register, a, b, c) {
	register[c] = register[a] * register[b]
}

function muli(register, a, b, c) {
	register[c] = register[a] * b
}

function banr(register, a, b, c) {
	register[c] = register[a] & register[b]
}

function bani(register, a, b, c) {
	register[c] = register[a] & b
}

function borr(register, a, b, c) {
	register[c] = register[a] | register[b]
}

function bori(register, a, b, c) {
	register[c] = register[a] | b
}

function setr(register, a, b, c) {
	register[c] = register[a]
}

function seti(register, a, b, c) {
	register[c] = a
}

function gtir(register, a, b, c) {
	register[c] = a > register[b] ? 1 : 0
}

function gtri(register, a, b, c) {
	register[c] = register[a] > b ? 1 : 0
}

function gtrr(register, a, b, c) {
	register[c] = register[a] > register[b] ? 1 : 0
}

function eqir(register, a, b, c) {
	register[c] = a === register[b] ? 1 : 0
}

function eqri(register, a, b, c) {
	register[c] = register[a] === b ? 1 : 0
}

function eqrr(register, a, b, c) {
	register[c] = register[a] === register[b] ? 1 : 0
}

const operations = [
	{ name: 'addr', exec: addr },
	{ name: 'addi', exec: addi },
	{ name: 'mulr', exec: mulr },
	{ name: 'muli', exec: muli },
	{ name: 'banr', exec: banr },
	{ name: 'bani', exec: bani },
	{ name: 'borr', exec: borr },
	{ name: 'bori', exec: bori },
	{ name: 'setr', exec: setr },
	{ name: 'seti', exec: seti },
	{ name: 'gtir', exec: gtir },
	{ name: 'gtri', exec: gtri },
	{ name: 'gtrr', exec: gtrr },
	{ name: 'eqir', exec: eqir },
	{ name: 'eqri', exec: eqri },
	{ name: 'eqrr', exec: eqrr }
]

function areRegistersEquals(registerA, registerB) {
	return (
		registerA[0] === registerB[0] &&
		registerA[1] === registerB[1] &&
		registerA[2] === registerB[2] &&
		registerA[3] === registerB[3]
	)
}

const contestResponse = input => {
	const operationsList = {}
	const operationsToFind = Array.from(operations)
	const instructions = []
	let indexProgram

	for (let i = 0; i < input.length; i += 4) {
		if (input[i] === '') {
			indexProgram = i + 2
			break
		}
		const instruction = input[i + 1].split(' ').map(Number)
		const opCode = instruction[0]
		const a = instruction[1]
		const b = instruction[2]
		const c = instruction[3]
		const before = input[i].replace('Before: [', '').replace(']', '').split(', ').map(Number)
		const after = input[i + 2].replace('After:  [', '').replace(']', '').split(', ').map(Number)
		instructions.push({ opCode,	a, b, c, before, after })
	}

	for (let i = 0; i <= instructions.length; i++) {
		const instruction = instructions[i]
		let workingOperation
		let justOneWorking

		for (let y = 0; y < operationsToFind.length; y++) {
			const register = Array.from(instruction.before)
			operationsToFind[y].exec(register, instruction.a, instruction.b, instruction.c)
			if (areRegistersEquals(register, instruction.after)) {
				if (justOneWorking) {
					justOneWorking = false
					break
				}
				workingOperation = y
				justOneWorking = true
			}
		}

		if (workingOperation !== undefined && justOneWorking) {
			operationsList[instruction.opCode] = operationsToFind[workingOperation]
			operationsToFind.splice(workingOperation, 1)
		}
	}

	const register = [0, 0, 0, 0]

	for (let i = indexProgram; i < input.length; i++) {
		const instruction = input[i].split(' ').map(Number)
		const opCode = instruction[0]
		const a = instruction[1]
		const b = instruction[2]
		const c = instruction[3]
		const operation = operationsList[opCode]
		operation.exec(register, a, b, c)
	}

	return register[0].toString()
}

module.exports = contestResponse