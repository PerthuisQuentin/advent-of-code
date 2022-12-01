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

	const maxCalories = caloriesbyElves.reduce((a, b) => b > a ? b : a)

	return maxCalories
}

module.exports = contestResponse