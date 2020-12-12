const NORTH = 'N'
const SOUTH = 'S'
const EAST = 'E'
const WEST = 'W'
const LEFT = 'L'
const RIGHT = 'R'
const FORWARD = 'F'

const DIRECTIONS = [
	{ x: -1, y: 0 }, // WEST
	{ x: 0, y: 1 }, // NORTH
	{ x: 1, y: 0 }, // EAST
	{ x: 0, y: -1 } // SOUTH
]

const WEST_DIR = 0
const NORTH_DIR = 1
const EAST_DIR = 2
const SOUTH_DIR = 3

const turnLeft = (orientation, degrees) => {
	const amount = degrees / 90
	const newOrientation = (orientation - amount) % DIRECTIONS.length
	return newOrientation < 0 ? DIRECTIONS.length + newOrientation : newOrientation 
}

const turnRight = (orientation, degrees) => {
	const amount = degrees / 90
	return (orientation + amount) % DIRECTIONS.length
}

const move = (position, direction, value) => {
	return {
		x: position.x + (direction.x * value),
		y: position.y + (direction.y * value)
	}
}

const contestResponse = input => {
	const instructions = input
		.map(line => ({
			operation: line[0],
			value: Number(line.slice(1))
		}))

	let position = { x: 0, y: 0 }
	let orientation = EAST_DIR

	instructions.forEach(instruction => {
		let direction

		switch (instruction.operation) {
			case NORTH:
				direction = DIRECTIONS[NORTH_DIR]
				break;
			case SOUTH:
				direction = DIRECTIONS[SOUTH_DIR]
				break;
			case WEST:
				direction = DIRECTIONS[WEST_DIR]
				break;
			case EAST:
				direction = DIRECTIONS[EAST_DIR]
				break;
			case LEFT:
				orientation = turnLeft(orientation, instruction.value)
				break;
			case RIGHT:
				orientation = turnRight(orientation, instruction.value)
				break;
			case FORWARD:
				direction = DIRECTIONS[orientation]
				break;
			default:
				break;
		}

		if (direction) {
			position = move(position, direction, instruction.value)
		}
	})

	return Math.abs(position.x) + Math.abs(position.y)
}

module.exports = contestResponse