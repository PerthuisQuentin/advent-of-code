const parseNumber = line => Number(line.match(/\d+/g).join(''))

const parseRace = input => {
	const time = parseNumber(input[0])
	const bestDistance = parseNumber(input[1])
	return { time, bestDistance }
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
	const race = parseRace(input)
	return getSolutionsWidth(race)
}

module.exports = contestResponse