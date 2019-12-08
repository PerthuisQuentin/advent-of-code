function getPowerLevel(x, y, serialNumer) {
	const rackId = x + 10
	const powerLevel = ((rackId * y) + serialNumer) * rackId
	const hundredsDigit = Math.floor(powerLevel % 1000 / 100)
	return hundredsDigit - 5
}

const contestResponse = input => {
	const serialNumer = Number(input[0])
	const cells = []

	for (let y = 0; y < 300; y++) {
		cells[y] = []
		for (let x = 0; x < 300; x++) {
			cells[y][x] = getPowerLevel(x + 1, y + 1, serialNumer)
		}		
	}

	const squares = []
	const n = 3

	for (let y = 0; y < 300 - n + 1; y++) {
		for (let x = 0; x < 300 - n + 1; x++) {
			const info = {
				x: x + 1,
				y: y + 1,
				value : 0
			}

			for (let a = 0; a < n; a++) {
				for (let b = 0; b < n; b++) {
					info.value += cells[y + a][x + b]
				}
			}

			squares.push(info)
		}
	}

	const max = squares.reduce((prev, cur) => cur.value > prev.value ? cur : prev)

	return max.x + ',' + max.y
}

module.exports = contestResponse