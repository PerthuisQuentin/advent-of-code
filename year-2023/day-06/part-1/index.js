const parseNumbers = line => line.match(/\d+/g).map(Number)

const parseRaces = input => {
	const races = []

	const times = parseNumbers(input[0])
	const distances = parseNumbers(input[1])

	for (let i = 0; i < times.length; i++) {
		races.push({ time: times[i], bestDistance: distances[i] })
	}

	return races
}

const getDiscriminant = (time, bestDistance) => {
	return time * time + 4 * -bestDistance
}

const getSolutions = (time, bestDistance) => {
	const discriminant = getDiscriminant(time, bestDistance)
	const lowest = (-time + Math.sqrt(discriminant)) / -2
	const upper = (-time - Math.sqrt(discriminant)) / -2
	return [Math.floor(lowest + 1), Math.ceil(upper - 1)]
}

const getSolutionsWidth = race => {
	const solutions = getSolutions(race.time, race.bestDistance)
	return solutions[1] - solutions[0] + 1
}

const contestResponse = input => {
	const races = parseRaces(input)

	return races
		.map(getSolutionsWidth)
		.reduce((a, b) => a * b, 1)
}

module.exports = contestResponse