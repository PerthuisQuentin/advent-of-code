const contestResponse = input => {
	const now = Number(input[0])
	const buses = input[1]
		.split(',')
		.filter(s => s !== "x")
		.map(id => Number(id))

	const nextTimes = buses
		.map(id => now + (id - (now % id)))

	const nextBusIndex = nextTimes
		.reduce((lowestId, time, i) => time < nextTimes[lowestId] ? i : lowestId, 0)

	return buses[nextBusIndex] * (nextTimes[nextBusIndex] - now)
}

module.exports = contestResponse