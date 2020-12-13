const contestResponse = input => {
	const buses = input[0]
		.split(',')
		.map((n, i) => {
			if (n === 'x') return false
			return {
				id: Number(n),
				offset: i
			}	
		})
		.filter(x => !!x)

	let timestamp = 0
	let increment = buses[0].id

	for (let busIndex = 1; busIndex < buses.length; busIndex++) {
		const currentBus = buses[busIndex]

		while (((timestamp + currentBus.offset) % currentBus.id) !== 0) {
			timestamp += increment
		}

		increment *= currentBus.id
	}

	return timestamp
}

module.exports = contestResponse