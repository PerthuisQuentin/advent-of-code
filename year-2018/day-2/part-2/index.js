function haveExactlyOneLetterDiff(word1, word2) {
	let result = false

	for (let i = 0; i < word1.length; i++) {
		if (word1[i] !== word2[i]) {
			if (result) return false
			result = true
		}
	}

	return result
}

function removeDiffLetter(word1, word2) {
	for (let i = 0; i < word1.length; i++) {
		if (word1[i] !== word2[i]) {
			return word1.slice(0, i) + word1.slice(i + 1)
		}
	}
}

const contestResponse = input => {
	for (let i = 0; i < input.length; i++) {
		for (let y = i; y < input.length; y++) {
			if (i === y) continue
			if (haveExactlyOneLetterDiff(input[i], input[y])) return removeDiffLetter(input[i], input[y])
		}
	}
}

module.exports = contestResponse