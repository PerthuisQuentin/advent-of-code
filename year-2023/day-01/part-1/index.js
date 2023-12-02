const DIGIT_REGEX = /\d/

const getFirstAndLastDigits = line => {
	const arrayLine = line.split('')
	const firstDigit = arrayLine.find(char => DIGIT_REGEX.test(char))
	const lastDigit = arrayLine.reverse().find(char => DIGIT_REGEX.test(char))
	return [Number(firstDigit), Number(lastDigit)]
}

const putDigitsTogether = digits => Number(`${digits[0]}${digits[1]}`)

const contestResponse = input => {
	return input
		.map(getFirstAndLastDigits)
		.map(putDigitsTogether)
		.reduce((a, b) => a + b)
}

module.exports = contestResponse