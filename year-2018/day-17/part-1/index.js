const WATER_SPRING = '+'
const CLAY = '#'
const SAND = '.'
const PASSING_WATER = '|'
const RESTING_WATER = '~'

function drawGrid(grid) {
	let log = ''
	grid.forEach(row => {
		row.forEach(cell => {
			log += cell
		})
		log += '\n'
	})
	console.log(log)
}

const contestResponse = input => {
	const data = input.map(line => {
		const coord = {}
		line.split(', ').forEach(point => {
			const axis = point[0]
			let value = point.substring(2)
			if (value.includes('..')) { 
				value = value.split('..').map(Number)
			} else {
				value = Number(value)
			}
			coord[axis] = value
		})
		return coord
	})

	const grid = []
	const bounds = { minY: 0, minX: Infinity, maxY: 0, maxX: 0 }

	data.forEach(coord => {
		if (Array.isArray(coord.y)) {
			for (let i = coord.y[0]; i <= coord.y[1]; i++) {
				if (!grid[i]) grid[i] = []
				grid[i][coord.x] = CLAY
			}
			if (coord.y[0] < bounds.minY) bounds.minY = coord.y[0]
			if (coord.y[1] > bounds.maxY) bounds.maxY = coord.y[1]
			if (coord.x < bounds.minX) bounds.minX = coord.x
			if (coord.x > bounds.maxX) bounds.maxX = coord.x
		} else if (Array.isArray(coord.x)) {
			if (!grid[coord.y]) grid[coord.y] = []
			for (let i = coord.x[0]; i <= coord.x[1]; i++) {
				grid[coord.y][i] = CLAY
			}
			if (coord.y < bounds.minY) bounds.minY = coord.y
			if (coord.y > bounds.maxY) bounds.maxY = coord.y
			if (coord.x[0] < bounds.minX) bounds.minX = coord.x[0]
			if (coord.x[1] > bounds.maxX) bounds.maxX = coord.x[1]
		}
	})

	if (!grid[0]) grid[0] = []
	grid[0][500] = WATER_SPRING

	bounds.minX--
	bounds.maxX++

	for (let y = bounds.minY; y <= bounds.maxY + 3; y++) {
		for (let x = bounds.minX; x <= bounds.maxX; x++) {
			if (!grid[y]) grid[y] = []
			if (grid[y][x] === undefined) grid[y][x] = SAND
		}
	}

	let cursors = [{ x: 500, y: 1 }]
	while (cursors.length > 0) {
		console.log(cursors)
		for (let y = cursors.length - 1; y >= 0; y--) {
			const cursor = cursors[y]
			const downCell = grid[cursor.y + 1] && grid[cursor.y + 1][cursor.x]

			if (!downCell) {
				grid[cursor.y][cursor.x] = PASSING_WATER
				cursors.splice(y, 1)
			} else if (downCell === SAND) {
				grid[cursor.y][cursor.x] = PASSING_WATER
				cursor.y++
			} else if (downCell === CLAY || downCell === RESTING_WATER) {
				const cursorsToAdd = []
				let findOut = false
				let leftClosed = false
				let leftX = cursor.x
				while (!findOut) {
					if (grid[cursor.y + 1][leftX] === SAND) {
						findOut = true
						cursorsToAdd.push({ y: cursor.y, x: leftX })
					} else if (grid[cursor.y + 1][leftX] === CLAY || grid[cursor.y + 1][leftX] === RESTING_WATER) {
						if (grid[cursor.y][leftX - 1] === SAND) {
							grid[cursor.y][leftX] = PASSING_WATER
							leftX--
						} else if (grid[cursor.y][leftX - 1] === CLAY) {
							grid[cursor.y][leftX] = PASSING_WATER
							findOut = true
							leftClosed = true
						}
					}
				}
	
				findOut = false
				let rightClosed = false
				let rightX = cursor.x
				while (!findOut) {
					if (grid[cursor.y + 1][rightX] === SAND) {
						findOut = true
						cursorsToAdd.push({ y: cursor.y, x: rightX })
					} else if (grid[cursor.y + 1][rightX] === CLAY || grid[cursor.y + 1][rightX] === RESTING_WATER) {
						if (grid[cursor.y][rightX + 1] === SAND) {
							grid[cursor.y][rightX] = PASSING_WATER
							rightX++
						} else if (grid[cursor.y][rightX + 1] === CLAY) {
							grid[cursor.y][rightX] = PASSING_WATER
							findOut = true
							rightClosed = true
						}
					}
				}

				if (leftClosed && rightClosed) {
					for (let x = leftX; x <= rightX; x++) {
						grid[cursor.y][x] = RESTING_WATER
					}
					cursor.y--
				} else {
					cursors.splice(y, 1)
					cursors = cursors.concat(cursorsToAdd)
				}
			}
		}
	}

	let tiles = 0
	for (let y = bounds.minY; y <= bounds.maxY; y++) {
		for (let x = bounds.minX; x <= bounds.maxX; x++) {
			if (grid[y][x] === RESTING_WATER || grid[y][x] === PASSING_WATER) tiles++
		}
	}

	//drawGrid(grid)

	return tiles.toString()
}

module.exports = contestResponse