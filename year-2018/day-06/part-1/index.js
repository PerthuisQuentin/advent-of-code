function getManhattanDistance(xA, yA, xB, yB) {
	return Math.abs(xB - xA) + Math.abs(yB - yA)
}

const contestResponse = input => {
	const points = input.map(line => {
		const cord = line.split(', ')
		return {
			pos: { x: Number(cord[0]), y: Number(cord[1]) },
			size: 0,
			infinite: false
		}
	})
	const maxX = points.reduce((prev, cur) => cur.pos.x > prev ? cur.pos.x : prev, 0)
	const maxY = points.reduce((prev, cur) => cur.pos.y > prev ? cur.pos.y : prev, 0)

	for (let x = 0; x <= maxX; x++) {
		for (let y = 0; y <= maxY; y++) {
			let minPoint = 0
			let minDist = getManhattanDistance(points[minPoint].pos.x, points[minPoint].pos.y, x, y)
			let twoMinDist = false
			for (let i = 1; i < points.length; i++) {
				const dist = getManhattanDistance(points[i].pos.x, points[i].pos.y, x, y)
				
				if (dist < minDist) {
					minPoint = i
					minDist = dist
					twoMinDist = false
				} else if (dist === minDist) {
					twoMinDist = true
				}
			}

			if (!twoMinDist) {
				points[minPoint].size++

				if (x === 0 || x === maxX || y === 0 || y === maxY) {
					points[minPoint].infinite = true
				}
			}
		}
	}

	const result = points
		.filter(point => !point.infinite)
		.reduce((prev, cur) => cur.size > prev ? cur.size : prev, 0)

	return result.toString()
}

module.exports = contestResponse