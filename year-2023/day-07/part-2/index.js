const JOKER = 'J'

const CARDS_TO_ORDER = {
	'A': 13,
	'K': 12,
	'Q': 11,
	'T': 10,
	'9': 9,
	'8': 8,
	'7': 7,
	'6': 6,
	'5': 5,
	'4': 4,
	'3': 3,
	'2': 2,
	[JOKER]: 1
}

const TYPE_FIVE_OF_A_KIND = 'TYPE_FIVE_OF_A_KIND'
const TYPE_FOUR_OF_A_KIND = 'TYPE_FOUR_OF_A_KIND'
const TYPE_FULL_HOUSE = 'TYPE_FULL_HOUSE'
const TYPE_THREE_OF_A_KIND = 'TYPE_THREE_OF_A_KIND'
const TYPE_TWO_PAIRS = 'TYPE_TWO_PAIRS'
const TYPE_ONE_PAIR = 'TYPE_ONE_PAIR'
const TYPE_HIGH_CARD = 'TYPE_HIGH_CARD'

const TYPES_TO_ORDER = {
	TYPE_FIVE_OF_A_KIND: 7,
	TYPE_FOUR_OF_A_KIND: 6,
	TYPE_FULL_HOUSE: 5,
	TYPE_THREE_OF_A_KIND: 4,
	TYPE_TWO_PAIRS: 3,
	TYPE_ONE_PAIR: 2,
	TYPE_HIGH_CARD: 1
}

const UPGRADE_TABLE_BY_JOKER_AMOUNT = {
	[TYPE_HIGH_CARD]: {
		0: TYPE_HIGH_CARD,
		1: TYPE_ONE_PAIR,
		2: TYPE_THREE_OF_A_KIND,
		3: TYPE_FOUR_OF_A_KIND,
		4: TYPE_FIVE_OF_A_KIND,
		5: TYPE_FIVE_OF_A_KIND
	},
	[TYPE_ONE_PAIR]: {
		0: TYPE_ONE_PAIR,
		1: TYPE_THREE_OF_A_KIND,
		2: TYPE_FOUR_OF_A_KIND,
		3: TYPE_FIVE_OF_A_KIND
	},
	[TYPE_TWO_PAIRS]: {
		0: TYPE_TWO_PAIRS,
		1: TYPE_FULL_HOUSE
	},
	[TYPE_THREE_OF_A_KIND]: {
		0: TYPE_THREE_OF_A_KIND,
		1: TYPE_FOUR_OF_A_KIND,
		2: TYPE_FIVE_OF_A_KIND
	},
	[TYPE_FULL_HOUSE]: {
		0: TYPE_FULL_HOUSE
	},
	[TYPE_FOUR_OF_A_KIND]: {
		0: TYPE_FOUR_OF_A_KIND,
		1: TYPE_FIVE_OF_A_KIND
	},
	[TYPE_FIVE_OF_A_KIND]: {
		0: TYPE_FIVE_OF_A_KIND
	}
}

const parseHand = hand => {
	const [cards, bid] = hand.split(' ')
	return {
		cards: cards.split(''),
		bid: Number(bid)
	}
}

const parseHands = input => input.map(parseHand)

const getCardOccurrences = cards => {
	const occurences = new Map()
	cards.forEach(card => {
		const count = occurences.get(card) || 0
		occurences.set(card, count + 1)
	})
	return occurences
}

const getHandType = cards => {
	const occurences = Array.from(getCardOccurrences(cards).values())

	if (occurences.includes(5)) {
		return TYPE_FIVE_OF_A_KIND
	}
	else if (occurences.includes(4)) {
		return TYPE_FOUR_OF_A_KIND
	}
	else if (occurences.includes(3) && occurences.includes(2)) {
		return TYPE_FULL_HOUSE
	}
	else if (occurences.includes(3)) {
		return TYPE_THREE_OF_A_KIND
	}
	else if (occurences.filter(occurence => occurence === 2).length === 2) {
		return TYPE_TWO_PAIRS
	}
	else if (occurences.includes(2)) {
		return TYPE_ONE_PAIR
	}
	else {
		return TYPE_HIGH_CARD
	}
}

const addHandType = hand => {
	const cardsWithoutJokers = hand.cards.filter(card => card !== JOKER)
	const jokerAmount = hand.cards.length - cardsWithoutJokers.length
	const typeWithoutJokers = getHandType(cardsWithoutJokers)
	const upgradedType = UPGRADE_TABLE_BY_JOKER_AMOUNT[typeWithoutJokers][jokerAmount]

	return {
		...hand,
		type: upgradedType
	}
}

const compareHands = (hand1, hand2) => {
	if (hand1.type !== hand2.type) {
		return TYPES_TO_ORDER[hand1.type] - TYPES_TO_ORDER[hand2.type]
	}
	else {
		const firstDifferentCardIndex = hand1.cards.findIndex((card, index) => card !== hand2.cards[index])
		return CARDS_TO_ORDER[hand1.cards[firstDifferentCardIndex]] - CARDS_TO_ORDER[hand2.cards[firstDifferentCardIndex]]
	}
}


const contestResponse = input => {
	return parseHands(input)
		.map(addHandType)
		.sort(compareHands)
		.map((hand, index) => (index + 1) * hand.bid)
		.reduce((sum, bid) => sum + bid, 0)
}

module.exports = contestResponse