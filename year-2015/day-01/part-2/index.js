const contestResponse = input => {
	const instructions = input[0]
		.split('')
		.map(s => {
			if (s === '(') return 1
			if (s === ')') return -1
			else return 0
		})

	let total = 0

	const indexFound = instructions
		.findIndex(instruction => {
			total += instruction
			return total < 0
		})

	return indexFound + 1
}

module.exports = contestResponse