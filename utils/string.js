class StringUtils {
	static countDifferences(string1, string2) {
		let differences = 0
		const length = Math.max(string1.length, string2.length)

		for (let i = 0; i < length; i++) {
			if (string1[i] !== string2[i]) differences++
		}

		return differences
	}
}

module.exports = StringUtils
