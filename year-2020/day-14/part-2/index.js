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
		result += mask[i] === '0' ? stringValue[i] : mask[i]
	}

	return result
}

const replaceAt = (s, index, replacement) => {
    return s.substr(0, index) + replacement + s.substr(index + replacement.length)
}

const getAddressesRec = (result, address, index) => {
	let i = index
	while (address[i] !== 'X' && i < address.length) i++
	
	if (i === address.length) return result.push(address)
	else if (address[i] === 'X') {
		getAddressesRec(result, replaceAt(address, i, '1'), i + 1)
		getAddressesRec(result, replaceAt(address, i, '0'), i + 1)
	}
}

const getAddresses = floatingAddress => {
	const result = []
	getAddressesRec(result, floatingAddress, 0)
	return result
}

const contestResponse = input => {
	const instructions = parseInput(input)
	const memory = {}
	let mask

	instructions
	.forEach(instruction => {
		if (instruction.operation === MASK) {
			mask = instruction.mask
		} else if (instruction.operation === MEM) {
			getAddresses(applyMask(mask, instruction.address))
				.forEach(address => {
					memory[address] = instruction.value
				})
		}
	})

return Object.values(memory).reduce((a, b) => a + b)
}

module.exports = contestResponse