const SEPARATOR = ', '
const LEFT = 'L'
const RIGHT = 'R'

const DIRECTIONS = [
	{ x: 0, y: 1 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: -1, y: 0 }
]

const hashPosition = position => `${position.x}/${position.y}`

const contestResponse = input => {
	const currentPosition = { x: 0, y: 0 }
	let currentDirection = 0
	const visitedPositions = new Set()
	visitedPositions.add(hashPosition(currentPosition))

	const instructions = input[0]
		.split(SEPARATOR)
		.map(instruction => ({
			direction: instruction[0],
			length: Number(instruction.slice(1))
		}))

	for (let i = 0; i < instructions.length; i++) {
		const instruction = instructions[i];

		if (instruction.direction === LEFT) {
			currentDirection = (DIRECTIONS.length + currentDirection - 1) % DIRECTIONS.length
		} else if (instruction.direction === RIGHT) {
			currentDirection = (currentDirection + 1) % DIRECTIONS.length
		} else {
			throw new Error('Unknown direction')
		}

		const direction = DIRECTIONS[currentDirection]

		for (let i = 0; i < instruction.length; i++) {
			currentPosition.x += direction.x
			currentPosition.y += direction.y

			const positionHash = hashPosition(currentPosition)

			if (visitedPositions.has(positionHash)) {
				const distance = Math.abs(currentPosition.x) + Math.abs(currentPosition.y)
				return distance
			}

			visitedPositions.add(positionHash)
		}
	}

	return 'Nothing'
}

module.exports = contestResponse