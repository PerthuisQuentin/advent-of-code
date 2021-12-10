const PAIRS = ['()', '[]', '{}', '<>']
const CLOSING_CHARACTERS = [')', ']', '}', '>']

const SCORES = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137
}

const removePair = line => {
	for (let i = 0; i < PAIRS.length; i++) {
		const pair = PAIRS[i]
		const index = line.indexOf(pair)
		if (index !== -1) {
			return line.slice(0, index) + line.slice(index + 2)
		}
	}
	return line
}

const findFirstClosingCharacter = line => {
	for (let i = 0; i < line.length; i++) {
		const character = line[i];
		if (CLOSING_CHARACTERS.includes(character)) {
			return character
		}
	}
}

const getLineScore = line => {
	let previousLine
	let currentLine = line

	do {
		previousLine = currentLine
		currentLine = removePair(currentLine)
	} while(currentLine !== previousLine)

	const illegalCharacter = findFirstClosingCharacter(currentLine)

	return SCORES[illegalCharacter] || 0
}

const contestResponse = input => {
	return input
		.map(getLineScore)
		.reduce((a, b) => a + b)
}

module.exports = contestResponse