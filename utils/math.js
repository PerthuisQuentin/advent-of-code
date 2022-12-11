class MathUtils {
	static greatestCommonDivisor(a, b) {
		const remainder = a % b
		if (remainder === 0) return b
		return MathUtils.greatestCommonDivisor(b, remainder)
	}

	static leastCommonMultiple(a, b) {
		return (a * b) / MathUtils.greatestCommonDivisor(a, b)
	}

	static leastCommonMultipleOfList(array) {
		return array.reduce((a, b) => MathUtils.leastCommonMultiple(a, b))
	}
}

module.exports = MathUtils