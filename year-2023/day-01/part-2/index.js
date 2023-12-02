const DIGITS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
]
const LETTER_DIGIT_TO_DIGIT = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
}

const getFirstDigit = (line) => {
	let lineCopy = line.slice()
	let firstDigit
	while (!firstDigit) {
		const digit = DIGITS.find((digit) => lineCopy.startsWith(digit))
		if (digit) {
			firstDigit = digit
		} else {
			lineCopy = lineCopy.slice(1)
		}
	}
	return firstDigit
}

const getLastDigit = (line) => {
	let lineCopy = line.slice()
	let lastDigit
	while (!lastDigit) {
		const digit = DIGITS.find((digit) => lineCopy.endsWith(digit))
		if (digit) {
			lastDigit = digit
		} else {
			lineCopy = lineCopy.slice(0, -1)
		}
	}
	return lastDigit
}

const getFirstAndLastDigits = (line) => {
	const firstDigit = getFirstDigit(line)
	const lastDigit = getLastDigit(line)
	return [
		LETTER_DIGIT_TO_DIGIT[firstDigit] || Number(firstDigit),
		LETTER_DIGIT_TO_DIGIT[lastDigit] || Number(lastDigit),
	]
}

const putDigitsTogether = (digits) => Number(`${digits[0]}${digits[1]}`)

const contestResponse = (input) => {
	return input
		.map(getFirstAndLastDigits)
		.map(putDigitsTogether)
		.reduce((a, b) => a + b)
}

module.exports = contestResponse
