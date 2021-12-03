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

const contestResponse = input => {
	const occurences = getOccurences(input)

	let gammaRate = ''
	let epsilonRate = ''

	for (let i = 0; i < occurences.length; i++) {
		const bitOccurences = occurences[i]

		if (bitOccurences[0] > bitOccurences[1]) {
			gammaRate += '0'
			epsilonRate += '1'
		} else {
			gammaRate += '1'
			epsilonRate += '0'
		}

	}

	return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

module.exports = contestResponse