class ArrayUtils {
	static sum(array) {
		return array.reduce((a, b) => a + b, 0)
	}

	static stackBy(array, amount) {
		return array.reduce((result, current, index) => {
			if (index % amount === 0) {
				result.push([current])
			} else {
				result[result.length - 1].push(current)
			}
			return result
		}, [])
	}
}

module.exports = ArrayUtils