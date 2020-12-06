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

	applyOnCell(position, callback) {
		this.setCell(position, callback(this.getCell(position)))
	}

	setSubGrid(positionA, positionB, value) {
		for (let x = positionA.x; x <= positionB.x; x++) {
			for (let y = positionA.y; y <= positionB.y; y++) {
				this.setCell({ x, y }, value)
			}
		}
	}

	applyOnSubGrid(positionA, positionB, callback) {
		for (let x = positionA.x; x <= positionB.x; x++) {
			for (let y = positionA.y; y <= positionB.y; y++) {
				this.applyOnCell({ x, y}, callback)
			}
		}
	}

	getBounds() {
		return {
			minX: this.minX,
			minY: this.minY,
			maxX: this.maxX,
			maxY: this.maxY
		}
	}

	getNeighborsPosition(position) {
		return [
			{ x: position.x - 1, y: position.y },
			{ x: position.x, y: position.y - 1 },
			{ x: position.x + 1, y: position.y },
			{ x: position.x, y: position.y + 1 }
		]
	}

	getNeighbors(position) {
		return this.getNeighborsPosition(position).map(position => this.getCell(position))
	}

	getGridArray() {
		const grid = []
		for (let y = this.minY - 1; y <= this.maxY + 1; y++) {
			const row = []
			for (let x = this.minX - 1; x <= this.maxX + 1; x++) {
				const cell = this.grid[x] && this.grid[x][y]
				row.push(cell !== undefined ? cell : this.defaultCell)
			}
			grid.push(row)
		}
		return grid
	}

	getFlatGridArray() {
		return this.getGridArray().reduce((result, current) => result.concat(current))
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

	forEach(callback) {
		for (let x in this.grid) {
			for (let y in this.grid[x]) {
				callback(this.grid[x][y])
			}
		}
	}

	getAllPositionOf(value) {
		let result = []
		for (let x in this.grid) {
			for (let y in this.grid[x]) {
				if (this.grid[x][y] === value) result.push({ x: Number(x), y: Number(y) })
			}
		}
		return result
	}
}

module.exports = Grid