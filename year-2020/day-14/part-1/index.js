const MASK = 'mask'
const MEM = 'mem'

const parseInput = input => {
	return  input.map(line => {
		if (line.startsWith(MASK)) {
			return {
				operation: MASK,
				mask: line.split(' = ')[1]
			}
		} else if (line.startsWith(MEM)) {
			const [operation, value] = line.split(' = ')
			const address = operation.replace('mem[', '').replace(']', '')
			return {
				operation: MEM,
				address: Number(address),
				value: Number(value)
			}
		}
	})
}

const applyMask = (mask, value) => {
	const stringValue = value.toString(2).padStart(36, '0')
	let result = ''

	for (let i = 0; i < mask.length; i++) {
		result += mask[i] === 'X' ? stringValue[i] : mask[i]
	}

	return parseInt(result, 2)
}

const contestResponse = input => {
	const instructions = parseInput(input)
	const memory = {}
	let mask

	instructions
		.forEach(instruction => {
			if (instruction.operation === MASK) {
				mask =instruction.mask
			} else if (instruction.operation === MEM) {
				memory[instruction.address] = applyMask(mask, instruction.value)
			}
		})

	return Object.values(memory).reduce((a, b) => a + b)
}

module.exports = contestResponse