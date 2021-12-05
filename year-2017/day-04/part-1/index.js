const isValid = phrase => {
	const words = phrase.split(' ')
	const usedWords = new Set()

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		if (usedWords.has(word)) return false
		usedWords.add(word)
	}

	return true
}

const contestResponse = input => {
	return input
		.filter(isValid)
		.length
}

module.exports = contestResponse