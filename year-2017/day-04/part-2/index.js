const orderWord = word => {
	return word
		.split('')
		.sort((a, b) => a.localeCompare(b))
		.join('')
}

const isValid = phrase => {
	const words = phrase.split(' ')
	const usedWords = new Set()

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const orderedWord = orderWord(word)

		if (usedWords.has(orderedWord)) return false
		usedWords.add(orderedWord)
	}

	return true
}

const contestResponse = input => {
	return input
		.filter(isValid)
		.length
}

module.exports = contestResponse