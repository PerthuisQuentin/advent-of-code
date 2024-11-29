const { Grid } = require('../../../utils')

// const LEFT = 'L'
// const RIGHT = 'R'
// const UP = 'U'
// const DOWN = 'D'

// const DIRECTIONS_TO_NEXT_TURN_POSITIONS = {
// 	[LEFT]: ({ x, y }) => [{ x, y: y - 1 }, { x, y: y + 1 }],
// 	[RIGHT]: ({ x, y }) => [{ x, y: y - 1 }, { x, y: y + 1 }],
// 	[UP]: ({ x, y }) => [{ x: x - 1, y }, { x: x + 1, y }],
// 	[DOWN]: ({ x, y }) => [{ x: x - 1, y }, { x: x + 1, y }],
// }

// const DIRECTIONS_TO_NEXT_STRAIGHT_POSITION = {
// 	[LEFT]: ({ x, y }) => ({ x: x - 1, y }),
// 	[RIGHT]: ({ x, y }) => ({ x: x + 1, y }),
// 	[UP]: ({ x, y }) => ({ x, y: y - 1 }),
// 	[DOWN]: ({ x, y }) => ({ x, y: y + 1 }),
// }

// const getNewDirection = (sourcePosition, targetPosition) => {
// 	if (sourcePosition.x === targetPosition.x) {
// 		return targetPosition.y > sourcePosition.y ? DOWN : UP
// 	} else {
// 		return targetPosition.x > sourcePosition.x ? RIGHT : LEFT
// 	}
// }

const parseCity = input => {
	const city = new Grid()

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			city.setCell({ x, y }, Number(cell))
		})
	})

	city.setFixedBounds(true)
	return city
}

const hashState = state => `${state.cost}-${state.position.x}/${state.position.y}`

const getMinHeatLoss = (city, startingPosition, targetPosition) => {
	const stateQueueByCost = new Map()
	const seenCostByState = new Map()

	const addState = (cost, position) => {
		const newCost = cost + city.getCell(position)
		const state = { cost: newCost, position }
		const stateHash = hashState(state)

		if (!seenCostByState.has(stateHash)) {
			if (!stateQueueByCost.has(newCost)) stateQueueByCost.set(newCost, [])
			stateQueueByCost.get(newCost).push(state)

			seenCostByState.set(stateHash, newCost)
		}
	}

	addState(0, startingPosition)

	while(true) {
		const currentCost = Array.from(stateQueueByCost.keys()).reduce((minCost, cost) => Math.min(minCost, cost), Infinity)
		const nextStates = stateQueueByCost.get(currentCost)
		stateQueueByCost.delete(currentCost)

		for (state of nextStates) {
			const neighborsPositions = city
				.getNeighborsPosition(state.position)
				.filter(position => !city.isOutsideBounds(position))

			for (neighborPosition of neighborsPositions) {
				if (neighborPosition.x === targetPosition.x && neighborPosition.y === targetPosition.y) {
					return currentCost + city.getCell(neighborPosition)
				}
				addState(currentCost, neighborPosition)
			}
		}
	}
}

const contestResponse = input => {
	const city = parseCity(input)
	const minHeatLoss = getMinHeatLoss(city, { x: 0, y: 0 }, { x: city.maxX, y: city.maxY })

	return "wip"
}

module.exports = contestResponse