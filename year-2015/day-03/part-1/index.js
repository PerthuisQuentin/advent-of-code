const contestResponse = input => {
	const houses = { 0: { 0: true }}
	const position = { x: 0, y: 0 }
	let count = 1

	input[0]
		.split('')
		.forEach(direction => {
			if (direction === '^') position.y++
			else if (direction === 'v') position.y--
			else if (direction === '<') position.x--
			else if (direction === '>') position.x++

			if (!houses[position.x]) houses[position.x] = {}
			
			if (!houses[position.x][position.y]) {
				count++
				houses[position.x][position.y] = true
			}
		})

	return count
}

module.exports = contestResponse