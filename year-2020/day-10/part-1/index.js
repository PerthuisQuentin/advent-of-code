const adaptersToChain = adapters => {
	const chain = [...adapters]

	chain.sort((a, b) => a - b)
	chain.unshift(0)
	chain.push(chain[chain.length - 1] + 3)

	return chain
}

const chainToDifferences = chain => {
	return chain
		.slice(1)
		.map((n, i) => n - chain[i])
}

const countOccurences = differences => {
	const occurences = {}
	differences.forEach(n => {
		if (!occurences[n]) occurences[n] = 0
		occurences[n]++
	})
	return occurences
}

const contestResponse = input => {
	const adapters = input.map(Number)
	const chain = adaptersToChain(adapters)
	const differences = chainToDifferences(chain)
	const occurences = countOccurences(differences)

	return occurences[1] * occurences[3]
}

module.exports = contestResponse