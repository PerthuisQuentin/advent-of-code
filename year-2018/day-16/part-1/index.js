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
	addr,
	addi,
	mulr,
	muli,
	banr,
	bani,
	borr,
	bori,
	setr,
	seti,
	gtir,
	gtri,
	gtrr,
	eqir,
	eqri,
	eqrr
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
	let totalSum = 0
	
	for (let i = 0; i < input.length; i += 4) {
		const before = input[i].replace('Before: [', '').replace(']', '').split(', ').map(Number)
		const instruction = input[i + 1].split(' ').map(Number)
		const operation = instruction[0]
		const a = instruction[1]
		const b = instruction[2]
		const c = instruction[3]
		const after = input[i + 2].replace('After:  [', '').replace(']', '').split(', ').map(Number)
		
		let sum = 0

		for (const operation of operations) {
			const register = Array.from(before)
			operation(register, a, b, c)
			if (areRegistersEquals(register, after)) sum++
		}

		if (sum >= 3) totalSum++
	}

	return totalSum.toString()
}

module.exports = contestResponse