class ArrayUtils {
	static sum(array) {
		return array.reduce((a, b) => a + b, 0)
	}

	static min(array) {
		return array.reduce((result, current) => current < result ? current : result)
	}

	static max(array) {
		return array.reduce((result, current) => current > result ? current : result)
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

	static split(array, separator) {
		return array.reduce((result, current) => {
			if (current === separator) {
				result.push([])
			} else {
				result[result.length - 1].push(current)
			}
			return result
		}, [[]])
	}
}

module.exports = ArrayUtils