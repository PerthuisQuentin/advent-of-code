const calculateFuel = mass => Math.floor(mass / 3) - 2

const contestResponse = input => {
	const result = input
		.map(Number)
		.reduce((total, current) => total + calculateFuel(current), 0)

	return result
}

module.exports = contestResponse