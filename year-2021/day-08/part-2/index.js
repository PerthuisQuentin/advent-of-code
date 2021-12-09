const orderString = s => s.split('').sort((a, b) => a.localeCompare(b)).join('')

const parseLine = line => {
	const parts = line.split(' | ')
	return {
		unknownDigits: parts[0].split(' ').map(orderString),
		output: parts[1].split(' ').map(orderString)
	}
}

//  AAAA
// B    C
// B    C
//  DDDD
// E    F
// E    F
//  GGGG

// Digits with 5 segments are 2, 3, 5
const analyseDigitWithLength5 = (digit, digit1, segmentsIn4ButNotIn1) => {
	// 5 contains segments B and D from 4, but not segment C from 1
	// 3 and 2 doesn't contains segment B from 4
	if (segmentsIn4ButNotIn1.every(segment => digit.includes(segment))) {
		return { digit, number: 5 }
	}
	// 3 contains all segments from 1, 5 and 2 don't
	else if (digit1.every(segment => digit.includes(segment))) {
		return { digit, number: 3 }
	}
	// otherwise, it's a 2
	else {
		return { digit, number: 2 }
	}
}

// Digits with 6 segments are 0, 6, 9
const analyseDigitWithLength6 = (digit, digit4, segmentsIn4ButNotIn1) => {
	// 9 contains segments B, C, D, F from 4
	// 0 doesn't contains segment D from 4
	// 6 doesn't contains segment C from 4
	if (digit4.every(segment => digit.includes(segment))) {
		return { digit, number: 9 }
	}
	// 6 contains segments B and D from 4, but not segment C from 1, like 5
	// 0 still doesn't contains segment D from 4
	else if (segmentsIn4ButNotIn1.every(segment => digit.includes(segment))) {
		return { digit, number: 6 }
	}
	// otherwise, it's a 0
	else {
		return { digit, number: 0 }
	}
}

const analyseDigits = line => {
	const digits = line.unknownDigits.map(digit => digit.split(''))
	// console.log(digits)

	const digit1 = digits.find(digit => digit.length === 2)
	const digit7 = digits.find(digit => digit.length === 3)
	const digit4 = digits.find(digit => digit.length === 4)
	const digit8 = digits.find(digit => digit.length === 7)

	const segmentsIn4ButNotIn1 = digit4.filter(segment => !digit1.includes(segment))

	const digitsWithLength5 = digits
		.filter(digit => digit.length === 5)
		.map(digit => analyseDigitWithLength5(digit, digit1, segmentsIn4ButNotIn1))
		.sort((a, b) => a.number - b.number)
		.map(analyseResult => analyseResult.digit)

	const [digit2, digit3, digit5] = digitsWithLength5

	const digitsWithLength6 = digits
		.filter(digit => digit.length === 6)
		.map(digit => analyseDigitWithLength6(digit, digit4, segmentsIn4ButNotIn1))
		.sort((a, b) => a.number - b.number)
		.map(analyseResult => analyseResult.digit)

	const [digit0, digit6, digit9] = digitsWithLength6

	const orderedDigits = [digit0,	digit1,	digit2,	digit3,	digit4,	digit5,	digit6,	digit7,	digit8,	digit9]
		.map(digit => digit.join(''))

	return {
		...line,
		orderedDigits
	}
}

const outputToNumber = line => {
	const { output, orderedDigits } = line

	const outputValues = output.map(digit => orderedDigits.indexOf(digit))

	return Number(outputValues.join(''))
}

const contestResponse = input => {
	return input
		.map(parseLine)
		.map(analyseDigits)
		.map(outputToNumber)
		.reduce((a, b) => a + b)
}

module.exports = contestResponse