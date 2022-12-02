const getMaxIndex = memory => {
	let maxIndex = 0
	let max = memory[0]

	memory.forEach((bank, index) => {
		if (bank > max) {
			max = bank
			maxIndex = index
		}
	})

	return maxIndex
}

const reallocate = memory => {
	const newMemory = memory.slice()
	let index = getMaxIndex(newMemory)
	let blocks = newMemory[index]
	newMemory[index] = 0

	while (blocks > 0) {
		index = (index + 1) % newMemory.length
		newMemory[index]++
		blocks--
	}

	return newMemory
}

const hashMemory = memory => memory.join('-')

const contestResponse = input => {
	const memoryHashes = new Set()
	let memory = input[0].split('\t').map(Number)
	let memoryHash = hashMemory(memory)
	let count = 0

	do {
		memoryHashes.add(memoryHash)
		memory = reallocate(memory)
		memoryHash = hashMemory(memory)
		count++
	} while (!memoryHashes.has(memoryHash))

	return count
}

module.exports = contestResponse