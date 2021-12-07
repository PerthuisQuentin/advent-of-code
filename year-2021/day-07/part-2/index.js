const getFuelCost = (positions, targetPosition) => {
	return positions.reduce((total, value) => {
		const distance = Math.abs(value - targetPosition)
		const distanceFuelCost = (distance * (distance + 1)) / 2
		return total + distanceFuelCost
	}, 0)
}

const contestResponse = input => {
	const positions = input[0].split(',').map(Number)

	const average = positions.reduce((a, b) => a + b) / positions.length

	const ceilCost = getFuelCost(positions, Math.ceil(average))
	const floorCost = getFuelCost(positions, Math.floor(average))

	return ceilCost < floorCost ? ceilCost : floorCost
}

module.exports = contestResponse