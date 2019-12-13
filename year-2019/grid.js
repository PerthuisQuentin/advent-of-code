class Grid {
	constructor(defaultCell) {
		this.grid = {}
		this.defaultCell = defaultCell
		this.minX = 0
		this.minY = 0
		this.maxX = 0
		this.maxY = 0
	}

	updateBounds(position) {
		if (position.x < this.minX) this.minX = position.x
		if (position.x > this.maxX) this.maxX = position.x
		if (position.y < this.minY) this.minY = position.y
		if (position.y > this.maxY) this.maxY = position.y
	}

	getRow(x) {
		return this.grid[x]
	}

	initRow(x) {
		this.grid[x] = {}
	}

	initCell(position) {
		this.grid[position.x][position.y] = this.defaultCell
		this.updateBounds(position)
	}

	verifyCell(position) {
		if (this.getRow(position.x) === undefined) this.initRow(position.x)
		if (this.getRow(position.x)[position.y] === undefined) this.initCell(position)
	}

	getCell(position) {
		this.verifyCell(position)
		return this.grid[position.x][position.y]
	}

	setCell(position, value) {
		this.verifyCell(position)
		this.grid[position.x][position.y] = value
	}

	getGridArray() {
		const grid = []
		for (let y = this.minY - 1; y < this.maxY + 1; y++) {
			const row = []
			for (let x = this.minX - 1; x < this.maxX + 1; x++) {
				const cell = this.grid[x] && this.grid[x][y]
				row.push(cell !== undefined ? cell : this.defaultCell)
			}
			grid.push(row)
		}
		return grid
	}

	toString() {
		const gridArray = this.getGridArray()
		return gridArray
			.map(row => row.join(''))
			.join('\n')
	}

	toParsedString(parser) {
		const gridArray = this.getGridArray()
		return gridArray
			.map(row => row.map(parser))
			.map(row => row.join(''))
			.join('\n')
	}

	count(value) {
		let count = 0
		for (let x in this.grid) {
			for (let y in this.grid[x]) {
				if (this.grid[x][y] === value) count++
			}
		}
		return count
	}
}

module.exports = Grid