const getMosFrequent = list => {
	const occurences = new Map()
	list.forEach(letter => {
		if (!occurences.has(letter)) occurences.set(letter, 0)
		occurences.set(letter, occurences.get(letter) + 1)
	})
	const sortedOccurences = Array
		.from(occurences)
		.reduce((min, current) => current[1] < min[1] ? current : min)
	return sortedOccurences[0][0]
}

const contestResponse = input => {
	const size = input[0].length
	let result = ''

	for (let i = 0; i < size; i++) {
		result += getMosFrequent(input.map(word => word[i]))
	}

	return result
}

module.exports = contestResponse