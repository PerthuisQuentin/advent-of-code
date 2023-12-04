const CARD_REGEX = /Card[ ]+(\d+): ([\d ]+) \| ([\d ]+)/
const NUMBERS_REGEX = /(\d+)/g

const parseNumbers = numbers => numbers.match(NUMBERS_REGEX).map(Number)

const parseCard = card => {
	const matches = card.match(CARD_REGEX)
	return {
		id: Number(matches[1]),
		winningNumbers: new Set(parseNumbers(matches[2])),
		numbers: parseNumbers(matches[3])
	}
}

const parseCards = input => input.map(parseCard)

const countMatchingNumbers = card => card.numbers.filter(number => card.winningNumbers.has(number)).length

const countPoints = winningNumbers => winningNumbers > 0 ? Math.pow(2, winningNumbers - 1) : 0

const contestResponse = input => {
	const cards = parseCards(input)

	return cards
		.map(countMatchingNumbers)
		.map(countPoints)
		.reduce((a, b) => a + b, 0)
}

module.exports = contestResponse