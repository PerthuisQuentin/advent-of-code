const contestResponse = input => {
	const frequencies = input.map(Number)
	const frequenciesEncoutered = {}	
	let frequency = 0
	let counter = 0

	while (!frequenciesEncoutered[frequency]) {
		frequenciesEncoutered[frequency] = true

		frequency += frequencies[counter]
		counter = (counter + 1) % frequencies.length
	}

	return frequency.toString()
}

module.exports = contestResponse