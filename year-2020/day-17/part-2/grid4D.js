class Grid4D {
	constructor(defaultCell) {
		this.grid = new Map()
		this.defaultCell = defaultCell
		this.minX = 0
		this.maxX = 0
		this.minY = 0
        this.maxY = 0
        this.minZ = 0
        this.maxZ = 0
        this.minW = 0
        this.maxW = 0
		this.fixedBounds = false
	}

	static clone(gridToClone) {
		if (!(gridToClone instanceof Grid4D)) throw new Error('Not a grid instance')
		const newGrid = new Grid4D(gridToClone.defaultCell)
		newGrid.minX = gridToClone.minX
		newGrid.maxX = gridToClone.maxX
		newGrid.minY = gridToClone.minY
        newGrid.maxY = gridToClone.maxY
        newGrid.minZ = gridToClone.minZ
        newGrid.maxZ = gridToClone.maxZ
        newGrid.minW = gridToClone.minW
        newGrid.maxW = gridToClone.maxW
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
        if (position.w < this.minW) this.minW = position.w
		if (position.w > this.maxW) this.maxW = position.w
	}

	isOutsideBounds(position) {
		return (
			position.x < this.minX ||
			position.x > this.maxX ||
			position.y < this.minY ||
            position.y > this.maxY ||
            position.z < this.minZ ||
            position.z > this.maxZ ||
            position.w < this.minW ||
			position.w > this.maxW
		)
    }
    
    getBounds() {
		return {
			minX: this.minX,
			maxX: this.maxX,
			minY: this.minY,
            maxY: this.maxY,
            minZ: this.minZ,
            maxZ: this.maxZ,
            minW: this.minW,
			maxW: this.maxW
		}
	}

    hasDensity(w) {
        return this.grid.has(w)
    }

    hasSlice(w, z) {
        return this.hasDensity(w) && this.getDensity(w).has(z)
    }

    hasColumn(w, z, y) {
        return this.hasSlice(w, z) && this.getSlice(w, z).has(y)
    }

    hasCell(position) {
        return this.hasColumn(position.w, position.z, position.y) && this.getColumn(position.w, position.z, position.y).has(position.x)
    }

    getDensity(w) {
        return this.grid.get(w)
    }

    getSlice(w, z) {
        return this.getDensity(w).get(z)
    }

	getColumn(w, z, y) {
		return this.getSlice(w, z).get(y)
    }

    initDensity(w) {
        this.grid.set(w, new Map())
    }
    
    initSlice(w, z) {
        this.getDensity(w).set(z, new Map())
    }

	initColumn(w, z, y) {
        this.getSlice(w, z).set(y, new Map())
	}

	initCell(position) {
        this.getColumn(position.w, position.z, position.y).set(position.x, this.defaultCell)
		this.updateBounds(position)
	}

	verifyCell(position) {
        if (!this.hasDensity(position.w)) this.initDensity(position.w)
        if (!this.hasSlice(position.w, position.z)) this.initSlice(position.w, position.z)
        if (!this.hasColumn(position.w, position.z, position.y)) this.initColumn(position.w, position.z, position.y)
		if (!this.hasCell(position)) this.initCell(position)
	}

	getCell(position, canInitCell = true) {
		if ((!canInitCell || this.fixedBounds) && this.isOutsideBounds(position)) return this.defaultCell
		this.verifyCell(position)
		return this.getColumn(position.w, position.z, position.y).get(position.x)
	}

	setCell(position, value, canInitCell = true) {
		if ((!canInitCell || this.fixedBounds) && this.isOutsideBounds(position)) return
        this.verifyCell(position)
		this.getColumn(position.w, position.z, position.y).set(position.x, value)
	}

	getNeighborsPositionWithDiagonals(position) {
        const positions = []
        for (let w = -1; w <= 1; w++) {
            for (let z = -1; z <= 1; z++) {
                for (let y = -1; y <= 1; y++) {
                    for (let x = -1; x <= 1; x++) {
                        if (x === 0 && y === 0 && z === 0 && w === 0) continue
                        positions.push({
                            x: position.x + x,
                            y: position.y + y,
                            z: position.z + z,
                            w: position.w + w,
                        })
                    }
                }
            }
        }
		return positions
	}

	getNeighborsWithDiagonals(position) {
		return this.getNeighborsPositionWithDiagonals(position).map(position => this.getCell(position))
	}
    
    forEach(callback) {
        for (let w of this.grid.keys()) {
            for (let z of this.getDensity(w).keys()) {
                for (let y of this.getSlice(w, z).keys()) {
                    for (let x of this.getColumn(w, z, y).keys()) {
                        const position = { x, y, z, w }
                        callback(this.getCell(position, false), position)
                    }
                }
            }
        }
    }

    count(value) {
		let count = 0
        for (let w of this.grid.keys()) {
            for (let z of this.getDensity(w).keys()) {
                for (let y of this.getSlice(w, z).keys()) {
                    for (let x of this.getColumn(w, z, y).keys()) {
                        if (this.getCell({ x, y, z, w }) === value) count++
                    }
                }
            }
        }
		return count
	}
    
    getPositionsList() {
        const positions = []
        for (let w of this.grid.keys()) {
            for (let z of this.getDensity(w).keys()) {
                for (let y of this.getSlice(w, z).keys()) {
                    for (let x of this.getColumn(w, z, y).keys()) {
                        positions.push({ x, y, z, w })
                    }
                }
            }
        }
        return positions
    }
}

module.exports = Grid4D