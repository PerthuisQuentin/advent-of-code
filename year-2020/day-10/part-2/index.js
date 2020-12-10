const adaptersToChain = adapters => {
	const chain = [...adapters]

	chain.sort((a, b) => a - b)
	chain.unshift(0)
	chain.push(chain[chain.length - 1] + 3)

	return chain
}

const chainToRemovables = chain => {
	return chain
	.slice(1, chain.length - 1)
	.map((n, i) => (chain[i + 2] - chain[i]) <= 3)
}

const removablesToGroups = removables => {
	const groups = []
	let count = 0

	for (let i = 0; i < removables.length; i++) {
		if (removables[i]) count++
		else if (count > 0) {
			groups.push(count)
			count = 0
		}
	}

	return groups
}

const groupsToArrangements = groups => {
	let count = 1
	groups.forEach(n => {
		count *= ((n * (n + 1)) / 2) + 1
	})
	return count
}

const contestResponse = input => {
	const adapters = input.map(Number)
	const chain = adaptersToChain(adapters)
	const removables = chainToRemovables(chain)
	const groups = removablesToGroups(removables)
	return groupsToArrangements(groups)
}

module.exports = contestResponse