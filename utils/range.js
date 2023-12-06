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

	has(value) {
		if (this.startInclusive && this.endInclusive)
			return this.start <= value && value <= this.end
		else if (this.startInclusive && !this.endInclusive)
			return this.start <= value && value < this.end
		else if (!this.startInclusive && this.endInclusive)
			return this.start < value && value <= this.end
		else
			return this.start < value && value < this.end
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
		if (this.startInclusive && this.endInclusive)
			return this.end >= range.start && range.end >= this.start
		else if (this.startInclusive && !this.endInclusive)
			return this.end >= range.start && range.end > this.start
		else if (!this.startInclusive && this.endInclusive)
			return this.end > range.start && range.end >= this.start
		else
			return this.end > range.start && range.end > this.start
	}

	contains(range) {
		if (this.startInclusive && this.endInclusive)
			return this.start <= range.start && range.end <= this.end
		else if (this.startInclusive && !this.endInclusive)
			return this.start <= range.start && range.end < this.end
		else if (!this.startInclusive && this.endInclusive)
			return this.start < range.start && range.end <= this.end
		else
			return this.start < range.start && range.end < this.end
	}

	toString() {
		return `${this.startInclusive ? '[' : '('}${this.start}, ${this.end}${this.endInclusive ? ']' : ')'}`
	}
}

module.exports = Range