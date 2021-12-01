const SEPARATOR = ', '
const LEFT = 'L'
const RIGHT = 'R'

const DIRECTIONS = [
	{ x: 0, y: 1 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: -1, y: 0 }
]

const contestResponse = input => {
	const currentPosition = { x: 0, y: 0 }
	let currentDirection = 0

	input[0]
		.split(SEPARATOR)
		.map(instruction => ({
			direction: instruction[0],
			length: Number(instruction.slice(1))
		}))
		.forEach(instruction => {
			if (instruction.direction === LEFT) {
				currentDirection = (DIRECTIONS.length + currentDirection - 1) % DIRECTIONS.length
			} else if (instruction.direction === RIGHT) {
				currentDirection = (currentDirection + 1) % DIRECTIONS.length
			} else {
				throw new Error('Unknown direction')
			}

			const direction = DIRECTIONS[currentDirection]
			currentPosition.x += direction.x * instruction.length
			currentPosition.y += direction.y * instruction.length
		})

	const distance = Math.abs(currentPosition.x) + Math.abs(currentPosition.y)

	return distance
}

module.exports = contestResponse