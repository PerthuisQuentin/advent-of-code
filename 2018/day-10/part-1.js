function dataToGrid(data) {
	const grid = {
		map: [],
		minX: 0,
		maxX: 0,
		minY: 0,
		maxY: 0
	}

	data.forEach(point => {
		if (grid.map[point.posY] === undefined) grid.map[point.posY] = []
		grid.map[point.posY][point.posX] = point
		
		if (point.posX < grid.minX) grid.minX = point.posX
		if (point.posX > grid.maxX) grid.maxX = point.posX
		if (point.posY < grid.minY) grid.minY = point.posY
		if (point.posY > grid.maxY) grid.maxY = point.posY
	})

	return grid
}

function processData(data, turns) {
	return data.map(point => ({
		posX: point.posX + point.velX * turns,
		posY: point.posY + point.velY * turns,
		velX: point.velX,
		velY: point.velY
	}))	
}

function drawGrid(grid) {
	for (let y = grid.minY; y <= grid.maxY; y++) {
		let log = ''
		for (let x = grid.minX; x <= grid.maxX; x++) {
			if (grid.map[y] === undefined || grid.map[y][x] === undefined) log += '.'
			else log += '#' 
		}
		console.log(log)
	}
}

function getDataArea(data) {
	const size = data.reduce((prev, cur) => {
		if (cur.posX < prev.minX) prev.minX = cur.posX
		if (cur.posX > prev.maxX) prev.maxX = cur.posX
		if (cur.posY < prev.minY) prev.minY = cur.posY
		if (cur.posY > prev.maxY) prev.maxY = cur.posY
		return prev
	}, { minX: 0, maxX: 0, minY: 0, maxY: 0 })

	return Math.abs(size.maxX - size.minX) * Math.abs(size.maxY - size.minY)
}

const contestResponse = input => {
	const data = input.map(line => {
		const infos = line.split('> velocity=<')
		const pos = infos[0].replace('position=<', '')
		const vel = infos[1].replace('>', '')
		const posCoord = pos.split(',').map(Number)
		const velCoord = vel.split(',').map(Number)
		return {
			posX: posCoord[0],
			posY: posCoord[1],
			velX: velCoord[0],
			velY: velCoord[1] 
		}
	})

	let turns = 0
	let nextData = data
	let nextSize = getDataArea(data)
	let previousData
	let previousSize = nextSize + 1

	while (nextSize < previousSize) {
		previousData = nextData
		previousSize = nextSize
		nextData = processData(previousData, 1)
		nextSize = getDataArea(nextData)
		turns++
	}

	turns--
	drawGrid(dataToGrid(processData(data, turns)))
	
	return turns.toString()
}

module.exports = contestResponse