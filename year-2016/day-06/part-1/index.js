const getMosFrequent = list => {
	const occurences = new Map()
	list.forEach(letter => {
		if (!occurences.has(letter)) occurences.set(letter, 0)
		occurences.set(letter, occurences.get(letter) + 1)
	})
	const sortedOccurences = Array
		.from(occurences)
		.reduce((max, current) => current[1] > max[1] ? current : max)
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