const vowelsRegex  = /(\w*[aeiou]\w*){3,}/
const doubleLetterRegex = /(\w)\1+/
const forbiddenWordsRegex = /ab|cd|pq|xy/

const isNice = s => (
	vowelsRegex.test(s) &&
	doubleLetterRegex.test(s) &&
	!forbiddenWordsRegex.test(s)
)

const contestResponse = input => {
	const niceStrings = input
		.filter(isNice)

	return niceStrings.length
}

module.exports = contestResponse