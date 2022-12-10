const parseInstructions = input => {
	return input
		.map(line => line.split(' '))
		.map(([direction, amount]) => ({ direction, amount: Number(amount) }))
}

const getDistance = (positionA, positionB) => {
	const xDiff = positionB.x - positionA.x
	const yDiff = positionB.y - positionA.y
	return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}

const applyDirection = (head, tail) => {
	if (getDistance(head, tail) < 2) return tail

	const newTail = { ...tail }

	if (tail.x !== head.x) newTail.x = tail.x < head.x ? tail.x + 1 : tail.x - 1
	if (tail.y !== head.y) newTail.y = tail.y < head.y ? tail.y + 1 : tail.y - 1

	return newTail
}

const DIRECTIONS = {
	'U': { x: 0, y: -1 },
	'D': { x: 0, y: 1 },
	'L': { x: -1, y: 0 },
	'R': { x: 1, y: 0 }
}

const contestResponse = input => {
	const instructions = parseInstructions(input)
	const tailPositions = new Set()
	let head = { x: 0, y: 0 }
	let tail = { x: 0, y: 0 }

	instructions.forEach(instruction => {
		const direction = DIRECTIONS[instruction.direction]
		for (let i = 0; i < instruction.amount; i++) {
			head = { x: head.x + direction.x, y: head.y + direction.y }
			tail = applyDirection(head, tail)
			tailPositions.add(`${tail.x}/${tail.y}`)
		}
	})

	return tailPositions.size
}

module.exports = contestResponse