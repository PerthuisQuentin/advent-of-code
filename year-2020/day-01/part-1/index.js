const contestResponse = input => {
	const entries = input.map(Number)

	let searchedEntries

	for (let i = 0; i < entries.length; i++) {
		for (let j = i + 1; j < entries.length; j++) {
			if (entries[i] + entries[j] === 2020) {
				searchedEntries = [entries[i], entries[j]]
			}
		}
	}

	return searchedEntries[0] * searchedEntries[1]
}

module.exports = contestResponse