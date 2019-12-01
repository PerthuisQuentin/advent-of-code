const calculateFuel = mass => {
	const neededFuel = Math.floor(mass / 3) - 2
	return neededFuel > 0 ? neededFuel + calculateFuel(neededFuel) : 0
}

const contestResponse = input => {
	const result = input
		.map(Number)
		.reduce((total, current) => total + calculateFuel(current), 0)

	return result
}

module.exports = contestResponse