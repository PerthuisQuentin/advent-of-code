const UP = 'U'
const DOWN = 'D'
const LEFT = 'L'
const RIGHT = 'R'

const goUp = position => position.y++
const goDown = position => position.y--
const goLeft = position => position.x--
const goRight = position => position.x++

const GO = {
	[UP]: goUp,
	[DOWN]: goDown,
	[LEFT]: goLeft,
	[RIGHT]: goRight
}

const parseInstructions = line => line
	.split(',')
	.map(instruction => ({
		direction: instruction[0],
		length: Number(instruction.slice(1))
	}))

const getCablePoints = cable => {
	let position = { x: 0, y: 0 }
	const points = {}
	let steps = 0

	cable.forEach(instruction => {
		for (let i = 0; i < instruction.length; i++) {
			GO[instruction.direction](position)
			steps++
			if (!points[position.x]) points[position.x] = {}
			points[position.x][position.y] = steps
		}
	})

	return points
}

const getCablePointsInCommon = (firstCable, secondCable) => {
	const firstCablePoints = getCablePoints(firstCable)
	let position = { x: 0, y: 0 }
	const commonPoints = []
	let steps = 0

	secondCable.forEach(instruction => {
		for (let i = 0; i < instruction.length; i++) {
			GO[instruction.direction](position)
			steps++

			if (firstCablePoints[position.x] && firstCablePoints[position.x][position.y] !== undefined) {
				commonPoints.push({
					x: position.x,
					y: position.y,
					steps: firstCablePoints[position.x][position.y] + steps
				})
			}
		}
	})

	return commonPoints
}

const contestResponse = input => {
	const firstCable = parseInstructions(input[0])
	const secondCable = parseInstructions(input[1])

	const commonPoints = getCablePointsInCommon(firstCable, secondCable)

	const shortestAmountOfSteps = commonPoints
		.map(position => position.steps)
		.reduce((acc, cur) => cur < acc ? cur : acc)

	return shortestAmountOfSteps
}

module.exports = contestResponse
