class Range {
	constructor(start, end, startInclusive = true, endInclusive = true) {
		this.start = start
		this.end = end
		this.startInclusive = startInclusive
		this.endInclusive = endInclusive
    }

	static clone(range) {
		return new Range(range.start, range.end, range.startInclusive, range.endInclusive)
	}

	static hash(range) {
		return `${range.start}-${range.end}-${range.startInclusive}-${range.endInclusive}`
	}

	static asInclusive(range) {
		const start = range.startInclusive ? range.start : range.start + 1
		const end = range.endInclusive ? range.end : range.end - 1
		return new Range(start, end, true, true)
	}

	has(value) {
		const range = Range.asInclusive(this)
		return range.start <= value && value <= range.end
	}

	isSame(range) {
		return (
			this.start === range.start
			&& this.end === range.end
			&& this.startInclusive === range.startInclusive
			&& this.endInclusive === range.endInclusive
		)
	}

	intersects(range) {
		const rangeA = Range.asInclusive(this)
		const rangeB = Range.asInclusive(range)
		return rangeA.end >= rangeB.start && rangeB.end >= rangeA.start
	}

	contains(range) {
		const rangeA = Range.asInclusive(this)
		const rangeB = Range.asInclusive(range)
		return rangeA.start <= rangeB.start && rangeB.end <= rangeA.end
	}

	toString() {
		return `${this.startInclusive ? '[' : '('}${this.start}, ${this.end}${this.endInclusive ? ']' : ')'}`
	}
}

module.exports = Range