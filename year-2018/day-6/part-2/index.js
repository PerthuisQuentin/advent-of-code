function getManhattanDistance(xA, yA, xB, yB) {
	return Math.abs(xB - xA) + Math.abs(yB - yA)
}

const contestResponse = input => {
	const limit = Number(input[0])
	const points = input
		.slice(1)
		.map(line => {
			const cord = line.split(', ')
			return {
				pos: { x: Number(cord[0]), y: Number(cord[1]) },
				size: 0,
				infinite: false
			}
		})

	const maxX = points.reduce((prev, cur) => cur.pos.x > prev ? cur.pos.x : prev, 0)
	const maxY = points.reduce((prev, cur) => cur.pos.y > prev ? cur.pos.y : prev, 0)
	let size = 0

	for (let x = 0; x <= maxX; x++) {
		for (let y = 0; y <= maxY; y++) {
			const sum = points.reduce((prev, cur) => prev + getManhattanDistance(cur.pos.x, cur.pos.y, x, y), 0)
			if (sum < limit) size++
		}
	}

	return size.toString()
}

module.exports = contestResponse