const contestResponse = input => {
	return input
		.map(Number)
		.reduce((totalIncrements, currentValue, index, list) => {
			const previousValue = list[index - 1]
			if (previousValue === undefined) return totalIncrements

			return currentValue > previousValue
				? totalIncrements + 1
				: totalIncrements
		}, 0)
}

module.exports = contestResponse