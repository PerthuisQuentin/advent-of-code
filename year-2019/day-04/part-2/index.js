const checkRules = value => {
	if (value.length !== 6)return false

	let identicalDigit = false

	for (let i = 0; i < value.length - 1; i++) {
		if (
			value[i] === value[i + 1] &&
			(!value[i - 1] || value[i] !== value[i - 1]) &&
			(!value[i + 2] || value[i] !== value[i + 2])
		) identicalDigit = true
		if (value[i] > value[i + 1]) return false
	}

	return identicalDigit
}

const contestResponse = input => {
	const [start, end] = input[0].split('-').map(Number)

	let count = 0

	for (let i = start; i <= end; i++) {
		const value = i.toString(10)
		if (checkRules(value)) count++
	}

	return count
}

module.exports = contestResponse
