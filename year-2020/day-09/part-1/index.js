const getMultiples = memory => {
	const set = new Set()

	memory.forEach(a => {
		memory.forEach(b => {
			set.add(a + b)
		})
	})
	
	return set
}

const findError = (list, memoryLength) => {
	const memory = list.slice(0, memoryLength).map(Number)

	return list
		.slice(memoryLength)
		.map(Number)
		.find(n => {
			const multiples = getMultiples(memory)
			memory.shift()
			memory.push(n)
			return !multiples.has(n)
		})
}

const contestResponse = input => {
	const memoryLength = Number(input[0])
	const list = input.slice(1).map(Number)

	return findError(list, memoryLength)
}

module.exports = contestResponse