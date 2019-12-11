const IntCode = require('../../intCode')

const BLACK = 0
const WHITE = 1

const TURN_LEFT = 0
const TURN_RIGHT = 1


class Grid {
	constructor() {
		this.grid = {}
	}

	getRow(x) {
		return this.grid[x]
	}

	initRow(x) {
		this.grid[x] = {}
	}

	initCell(position) {
		this.grid[position.x][position.y] = BLACK
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
}

class Robot {
	constructor(intCode, grid) {
		this.intCode = intCode
		this.grid = grid
		this.position = { x: 0, y: 0 }
		this.directions = [
			{ x: 1, y: 0 },
			{ x: 0, y: 1 },
			{ x: -1, y: 0 },
			{ x: 0, y: -1 }
		]
		this.directionIndex = 1
		this.memory = {}
		this.count = 0
	}

	run () {
		while (!this.intCode.stoped) this.step()
	}

	step() {
		const currentCell = this.grid.getCell(this.position)
		this.intCode.addInput(currentCell)
		this.intCode.run()
		const [color, direction] = this.intCode.getLastOutputs(2)
		this.grid.setCell(this.position, color)
		this.memorize()
		this.turn(direction)
		this.moveForward()
	}

	memorize() {
		if (!this.memory[this.position.x]) this.memory[this.position.x] = {}
		if (!this.memory[this.position.x][this.position.y]) {
			this.memory[this.position.x][this.position.y] = true
			this.count++
		}
	}

	getDirection() {
		return this.directions[this.directionIndex]
	}

	turn(direction) {
		switch (direction) {
			case TURN_LEFT:
				return this.turnLeft()
			case TURN_RIGHT:
				return this.turnRight()
			default:
				throw new Error('Unknown direction command')
		}
	}

	turnLeft() {
		this.directionIndex++
		if (this.directionIndex === this.directions.length) this.directionIndex = 0
	}

	turnRight() {
		this.directionIndex--
		if (this.directionIndex === -1) this.directionIndex = this.directions.length - 1
	}

	moveForward() {
		const direction = this.getDirection()
		this.position.x += direction.x
		this.position.y += direction.y
	}
}

const contestResponse = input => {
	const program = input[0].split(',').map(Number)

	const grid = new Grid()
	const intCode = new IntCode(program)
	const robot = new Robot(intCode, grid)

	robot.run()

	return robot.count
}

module.exports = contestResponse