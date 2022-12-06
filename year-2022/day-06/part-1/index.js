const DISTINCT_CHARACTERS = 4

const areAllDifferent = characters => characters
	.every((charA, indexA) => !characters.some((charB, indexB) => indexA !== indexB && charA === charB))

const contestResponse = input => {
	return input[0].split('').findIndex((_, index, list) => {
		if (index < (DISTINCT_CHARACTERS - 1)) return false
		const lastChars = list.slice(index - (DISTINCT_CHARACTERS - 1), index + 1)
		return areAllDifferent(lastChars)
	}) + 1
}

module.exports = contestResponse