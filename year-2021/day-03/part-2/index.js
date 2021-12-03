const getOccurences = (input) => {
	const occurences = []
	const binaryNumbersLength = input[0].length

	for (let i = 0; i < binaryNumbersLength; i++) {
		occurences.push({ '0': 0, '1': 0 })
	}

	for (let i = 0; i < input.length; i++) {
		const binaryNumber = input[i]

		for (let y = 0; y < binaryNumber.length; y++) {
			const bit = binaryNumber[y]

			occurences[y][bit]++
		}
	}

	return occurences
}

const searchBinaryNumber = (input, searchCallback) => {
	const binaryNumbersLength = input[0].length
	let filteredNumbers = input
	let bitIndex = 0

	while (filteredNumbers.length > 1 && bitIndex < binaryNumbersLength) {
		const occurences = getOccurences(filteredNumbers)
		const mostCommonBit = occurences[bitIndex][0] > occurences[bitIndex][1] ? '0' : '1'

		filteredNumbers = filteredNumbers.filter(binaryNumber => {
			const bitToCompare = binaryNumber[bitIndex]
			return searchCallback(mostCommonBit, bitToCompare)
		})

		bitIndex++
	}

	return filteredNumbers[0]
}

const contestResponse = input => {
	const oxygenGeneratorRating = searchBinaryNumber(input, (mostCommonBit, bitToCompare) => mostCommonBit === bitToCompare)
	const co2ScrubberRating = searchBinaryNumber(input, (mostCommonBit, bitToCompare) => mostCommonBit !== bitToCompare)

	return parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2)
}

module.exports = contestResponse