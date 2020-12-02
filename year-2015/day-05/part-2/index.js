const twoDoubleLetterRegex = /(\w\w)[\w]*\1+/
const sameCharWithAnotherOneBetweenRegex = /(\w)[\w]{1}\1{1}/

const isNice = s => (
	twoDoubleLetterRegex.test(s) &&
	sameCharWithAnotherOneBetweenRegex.test(s)
)

const contestResponse = input => {
	const niceStrings = input
		.filter(isNice)

	return niceStrings.length
}

module.exports = contestResponse