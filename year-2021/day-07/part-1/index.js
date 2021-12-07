const contestResponse = input => {
	const positions = input[0].split(',').map(Number)

	positions.sort((a, b) => a - b)

	const medianeIndex = (positions.length % 2 === 1 ? positions.length + 1 : positions.length) / 2
	const mediane = positions[medianeIndex]

	const fuelCost = positions.reduce((total, value) => total + Math.abs(value - mediane), 0)

	return fuelCost
}

module.exports = contestResponse