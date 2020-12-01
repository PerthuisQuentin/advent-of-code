const contestResponse = input => {
	const houses = { 0: { 0: true }}
	const santaPosition = { x: 0, y: 0 }
	const santaRobotPosition = { x: 0, y: 0 }
	let count = 1

	input[0]
		.split('')
		.forEach((direction, i) => {
			const positionToUse = (i % 2) === 0 ? santaPosition : santaRobotPosition

			if (direction === '^') positionToUse.y++
			else if (direction === 'v') positionToUse.y--
			else if (direction === '<') positionToUse.x--
			else if (direction === '>') positionToUse.x++

			if (!houses[positionToUse.x]) houses[positionToUse.x] = {}
			
			if (!houses[positionToUse.x][positionToUse.y]) {
				count++
				houses[positionToUse.x][positionToUse.y] = true
			}
		})

	return count
}

module.exports = contestResponse