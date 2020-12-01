const contestResponse = input => {
	const floor = input[0]
		.split('')
		.map(s => {
			if (s === '(') return 1
			if (s === ')') return -1
			else return 0
		})
		.reduce((a, b) => a + b)

	return floor
}

module.exports = contestResponse