const contestResponse = input => {
	const caloriesbyElves = input
		.reduce((result, current) => {
			const resultCopy = result.slice()
			if (current !== '') {
				resultCopy[resultCopy.length - 1] += Number(current)
			} else {
				resultCopy.push(0)
			}
			return resultCopy
		}, [0])
		.sort((a, b) => b - a)

	const top3TotalColories = caloriesbyElves
		.slice(0, 3)
		.reduce((a, b) => a + b)

	return top3TotalColories
}

module.exports = contestResponse