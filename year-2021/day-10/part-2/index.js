const PAIRS = ['()', '[]', '{}', '<>']
const CLOSING_CHARACTERS = [')', ']', '}', '>']

const SCORES = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4
}

const OPENING_TO_CLOSING = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>'
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

const hasIncorrectCharacter = line => {
	for (let i = 0; i < line.length; i++) {
		const character = line[i];
		if (CLOSING_CHARACTERS.includes(character)) {
			return true
		}
	}
	return false
}

const reverseLine = line => line
	.split('')
	.reverse()
	.map(character => OPENING_TO_CLOSING[character])
	.join('')

const lineToScore = line => line
	.split('')
	.map(character => SCORES[character])
	.reduce((total, score) => (total * 5) + score, 0)

const getSimplifiedLine = line => {
	let previousLine
	let currentLine = line

	do {
		previousLine = currentLine
		currentLine = removePair(currentLine)
	} while(currentLine !== previousLine)

	return currentLine
}

const contestResponse = input => {
	const scores = input
		.map(getSimplifiedLine)
		.filter(line => !hasIncorrectCharacter(line))
		.map(reverseLine)
		.map(lineToScore)
		.sort((a, b) => a - b)

	const middleIndex = Math.floor(scores.length / 2)

	return scores[middleIndex]
}

module.exports = contestResponse