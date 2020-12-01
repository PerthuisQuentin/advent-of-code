const contestResponse = input => {
	const entries = input.map(Number)

let searchedEntries

for (let i = 0; i < entries.length; i++) {
	for (let j = i + 1; j < entries.length; j++) {
		for (let k = j + 1; k < entries.length; k++) {
			if (entries[i] + entries[j] + entries[k] === 2020) {
				searchedEntries = [entries[i], entries[j], entries[k]]
			}
		}
	}
}

return searchedEntries[0] * searchedEntries[1] * searchedEntries[2]
}

module.exports = contestResponse