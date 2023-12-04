const CARD_REGEX = /Card[ ]+(\d+): ([\d ]+) \| ([\d ]+)/
const NUMBERS_REGEX = /(\d+)/g

const parseNumbers = numbers => numbers.match(NUMBERS_REGEX).map(Number)

const parseCard = card => {
	const matches = card.match(CARD_REGEX)
	const parsedCard = {
		id: Number(matches[1]),
		winningNumbers: new Set(parseNumbers(matches[2])),
		numbers: parseNumbers(matches[3]),
		amount: 1
	}
	parsedCard.matchingNumbers = countMatchingNumbers(parsedCard)
	return parsedCard
}

const parseCards = input => input.map(parseCard)

const countMatchingNumbers = card => card.numbers.filter(number => card.winningNumbers.has(number)).length

const processCards = cards => {
	for (let i = 0; i < cards.length; i++) {
		const card = cards[i]
		if (card.matchingNumbers === 0) continue

		for (let count = 1; count <= card.matchingNumbers; count++) {
			const nextCard = cards[i + count]
			if (!nextCard) continue
			nextCard.amount += card.amount
		}
	}
}

const contestResponse = input => {
	const cards = parseCards(input)
	processCards(cards)

	return cards
		.map(card => card.amount)
		.reduce((a, b) => a + b, 0)
}

module.exports = contestResponse