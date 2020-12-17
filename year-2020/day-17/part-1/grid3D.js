class Grid3D {
	constructor(defaultCell) {
		this.grid = new Map()
		this.defaultCell = defaultCell
		this.minX = 0
		this.maxX = 0
		this.minY = 0
        this.maxY = 0
        this.minZ = 0
        this.maxZ = 0
		this.fixedBounds = false
	}

	static clone(gridToClone) {
		if (!(gridToClone instanceof Grid3D)) throw new Error('Not a grid instance')
		const newGrid = new Grid3D(gridToClone.defaultCell)
		newGrid.minX = gridToClone.minX
		newGrid.maxX = gridToClone.maxX
		newGrid.minY = gridToClone.minY
        newGrid.maxY = gridToClone.maxY
        newGrid.minZ = gridToClone.minZ
        newGrid.maxZ = gridToClone.maxZ
		gridToClone.forEach((cell, position) => newGrid.setCell(position, cell))
		newGrid.fixedBounds = gridToClone.fixedBounds
		return newGrid
	}

	setFixedBounds(value) {
		this.fixedBounds = value
	}

	updateBounds(position) {
		if (position.x < this.minX) this.minX = position.x
		if (position.x > this.maxX) this.maxX = position.x
		if (position.y < this.minY) this.minY = position.y
        if (position.y > this.maxY) this.maxY = position.y
        if (position.z < this.minZ) this.minZ = position.z
		if (position.z > this.maxZ) this.maxZ = position.z
	}

	isOutsideBounds(position) {
		return (
			position.x < this.minX ||
			position.x > this.maxX ||
			position.y < this.minY ||
            position.y > this.maxY ||
            position.z < this.minZ ||
			position.z > this.maxZ
		)
    }
    
    getBounds() {
		return {
			minX: this.minX,
			maxX: this.maxX,
			minY: this.minY,
            maxY: this.maxY,
            minZ: this.minZ,
			maxZ: this.maxZ
		}
	}

    hasSlice(z) {
        return this.grid.has(z)
    }

    hasColumn(z, y) {
        return this.hasSlice(z) && this.getSlice(z).has(y)
    }

    hasCell(position) {
        return this.hasColumn(position.z, position.y) && this.getColumn(position.z, position.y).has(position.x)
    }

    getSlice(z) {
        return this.grid.get(z)
    }

	getColumn(z, y) {
		return this.getSlice(z).get(y)
    }
    
    initSlice(z) {
        this.grid.set(z, new Map())
    }

	initColumn(z, y) {
        this.getSlice(z).set(y, new Map())
	}

	initCell(position) {
        this.getColumn(position.z, position.y).set(position.x, this.defaultCell)
		this.updateBounds(position)
	}

	verifyCell(position) {
        if (!this.hasSlice(position.z)) this.initSlice(position.z)
        if (!this.hasColumn(position.z, position.y)) this.initColumn(position.z, position.y)
		if (!this.hasCell(position)) this.initCell(position)
	}

	getCell(position, canInitCell = true) {
		if ((!canInitCell || this.fixedBounds) && this.isOutsideBounds(position)) return this.defaultCell
		this.verifyCell(position)
		return this.getColumn(position.z, position.y).get(position.x)
	}

	setCell(position, value, canInitCell = true) {
		if ((!canInitCell || this.fixedBounds) && this.isOutsideBounds(position)) return
        this.verifyCell(position)
		this.getColumn(position.z, position.y).set(position.x, value)
	}

	getNeighborsPositionWithDiagonals(position) {
        const positions = []
        for (let z = -1; z <= 1; z++) {
            for (let y = -1; y <= 1; y++) {
                for (let x = -1; x <= 1; x++) {
                    if (x === 0 && y === 0 && z === 0) continue
                    positions.push({
                        x: position.x + x,
                        y: position.y + y,
                        z: position.z + z,
                    })
                }
            }
        }
		return positions
	}

	getNeighborsWithDiagonals(position) {
		return this.getNeighborsPositionWithDiagonals(position).map(position => this.getCell(position))
	}

	toGridArray() {
		const grid = []
        for (let z = this.minZ - 1; z <= this.maxZ + 1; z++) {
            const slice = []
            for (let y = this.minY - 1; y <= this.maxY + 1; y++) {
                const column = []
                for (let x = this.minX - 1; x <= this.maxX + 1; x++) {
                    column.push(this.getCell({ x, y, z }, false))
                }
                slice.push(column)
            }
            grid.push(slice)
        }
		return grid
	}

	toFlatGridArray() {
		return this.toGridArray().reduce(
            (result, slice) => result.concat(slice.reduce(
                (sliceResult, column) => sliceResult.concat(column)
            , []))
        , [])
	}

	toString() {
		const gridArray = this.toGridArray()
		return gridArray
            .map(slice => slice
                .map(column => column.join(''))
                .join('\n')
            )
			.join('\n\n')
    }
    
    forEach(callback) {
        for (let z of this.grid.keys()) {
            for (let y of this.getSlice(z).keys()) {
                for (let x of this.getColumn(z, y).keys()) {
                    const position = { x, y, z }
                    callback(this.getCell(position, false), position)
                }
            }
        }   
    }

    count(value) {
		let count = 0
        for (let z of this.grid.keys()) {
            for (let y of this.getSlice(z).keys()) {
                for (let x of this.getColumn(z, y).keys()) {
                    if (this.getCell({ x, y, z }) === value) count++
                }
            }
        }   
		return count
	}
    
    getPositionsList() {
        const positions = []
        for (let z of this.grid.keys()) {
            for (let y of this.getSlice(z).keys()) {
                for (let x of this.getColumn(z, y).keys()) {
                    positions.push({ x, y, z })
                }
            }
        }
        return positions
    }
}

module.exports = Grid3D