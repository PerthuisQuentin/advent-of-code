const STEPS = 40

const getCombinations = input => {
	const combinations = new Map()

	input
		.slice(2)
		.forEach(line => {
			const [template, element] = line.split(' -> ')
			combinations.set(template, element)
		})

	return combinations
}

const splitSequenceInpairMap = sequence => {
	const pairMap = new Map()

	for (let i = 0; i < sequence.length - 1; i++) {
		const pair = `${sequence[i]}${sequence[i + 1]}`
		if (!pairMap.has(pair)) pairMap.set(pair, 0)
		pairMap.set(pair, pairMap.get(pair) + 1)
	}

	return pairMap
}

const addToMap = (pairMap, pair, amount) => {
	if (!pairMap.has(pair)) pairMap.set(pair, 0)
	pairMap.set(pair, pairMap.get(pair) + amount)
}

const makeStep = (combinations, pairMap) => {
	const newPairMap = new Map()

	Array.from(pairMap).forEach(([pair, amount]) => {
		if (combinations.has(pair)) {
			const newElement = combinations.get(pair)
			addToMap(newPairMap, `${pair[0]}${newElement}`, amount)
			addToMap(newPairMap, `${newElement}${pair[1]}`, amount)
		} else {
			addToMap(newPairMap, pair, amount)
		}
	})

	return newPairMap
}

const getResult = pairMap => {
	const occurences = new Map()

	Array.from(pairMap).forEach(([pair, amount]) => {
		const [elementA, elementB] = pair
		addToMap(occurences, elementA, amount)
		addToMap(occurences, elementB, amount)
	})

	const occurencesValues = Array.from(occurences).map(entry => Math.ceil(entry[1] / 2))

	const min = occurencesValues.reduce((a, b) => a < b ? a : b)
	const max = occurencesValues.reduce((a, b) => a > b ? a : b)

	return max - min
}

const contestResponse = input => {
	const combinations = getCombinations(input)
	let pairMap = splitSequenceInpairMap(input[0])

	for (let i = 0; i < STEPS; i++) {
		pairMap = makeStep(combinations, pairMap)
	}

	return getResult(pairMap)
}

module.exports = contestResponse