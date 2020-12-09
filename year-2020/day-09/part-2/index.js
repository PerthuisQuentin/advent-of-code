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

const findRange = (list, error) => {
	let startIndex = 0
	let endIndex
	let range
	let sum

	while (list[startIndex] && sum !== error) {
		const start = list[startIndex]
		range = [start]
		sum = start
		endIndex = startIndex + 1

		while (list[endIndex] && sum < error) {
			const current = list[endIndex]
			range.push(current)
			sum += current
			endIndex++
		}

		startIndex++
	}

	return range
}

const contestResponse = input => {
	const memoryLength = Number(input[0])
	const list = input.slice(1).map(Number)

	const error = findError(list, memoryLength)
	const range = findRange(list, error)

	const smallest = range.reduce((a, b) => b < a ? b : a)
	const largest = range.reduce((a, b) => b > a ? b : a)

	return smallest + largest
}

module.exports = contestResponse