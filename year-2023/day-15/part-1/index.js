const parseSteps = input => input[0].split(',')

const hash = step => {
	let count = 0

	for (let i = 0; i < step.length; i++) {
		count += step.charCodeAt(i)
		count *= 17
		count %= 256
	}

	return count
}

const contestResponse = input => {
	const steps = parseSteps(input)

	return steps
		.map(hash)
		.reduce((sum, value) => sum + value, 0)
}

module.exports = contestResponse