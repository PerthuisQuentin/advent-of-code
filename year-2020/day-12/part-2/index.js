const NORTH = 'N'
const SOUTH = 'S'
const EAST = 'E'
const WEST = 'W'
const LEFT = 'L'
const RIGHT = 'R'
const FORWARD = 'F'

const turnLeft = (orientation, degrees) => {
	let previousOrientation = Object.assign({}, orientation)

	for (let i = 0; i < (degrees / 90); i++) {
		let newOrientation = {}
		newOrientation.x = -previousOrientation.y
		newOrientation.y = previousOrientation.x
		previousOrientation = newOrientation
	}

	return previousOrientation
}

const turnRight = (orientation, degrees) => {
	let previousOrientation = Object.assign({}, orientation)

	for (let i = 0; i < (degrees / 90); i++) {
		let newOrientation = {}
		newOrientation.x = previousOrientation.y
		newOrientation.y = -previousOrientation.x
		previousOrientation = newOrientation
	}

	return previousOrientation
}

const move = (position, waypoint, value) => {
	return {
		x: position.x + (waypoint.x * value),
		y: position.y + (waypoint.y * value)
	}
}

const contestResponse = input => {
	const instructions = input
		.map(line => ({
			operation: line[0],
			value: Number(line.slice(1))
		}))

	let position = { x: 0, y: 0 }
	let waypoint = { x: 10, y: 1 }

	instructions.forEach(instruction => {
		switch (instruction.operation) {
			case NORTH:
				waypoint.y += instruction.value
				break;
			case SOUTH:
				waypoint.y -= instruction.value
				break;
			case WEST:
				waypoint.x -= instruction.value
				break;
			case EAST:
				waypoint.x += instruction.value
				break;
			case LEFT:
				waypoint = turnLeft(waypoint, instruction.value)
				break;
			case RIGHT:
				waypoint = turnRight(waypoint, instruction.value)
				break;
			case FORWARD:
				position = move(position, waypoint, instruction.value)
				break;
			default:
				break;
		}
	})

	return Math.abs(position.x) + Math.abs(position.y)
}

module.exports = contestResponse