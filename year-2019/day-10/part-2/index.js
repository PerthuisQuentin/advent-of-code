const NOTHING = '.'
const ASTEROID = '#'
const BASE = 'X'

const lineOfSight = (grid, positionA, positionB) => {
	if (positionA.x === positionB.x && positionA.y === positionB.y) return true

	const distY = Math.abs(positionB.y - positionA.y)
	const distX = Math.abs(positionB.x - positionA.x)

	if (distY === 1 || distX === 1) return true

	if (distY === 0) {
		const sign = positionA.x < positionB.x ? 1 : -1
		for (let i = 1; i < distX; i++) {
			if (grid[positionA.y][positionA.x + (i * sign)] === ASTEROID) return false
		}
		return true
	}

	if (distX === 0) {
		const sign = positionA.y < positionB.y ? 1 : -1
		for (let i = 1; i < distY; i++) {
			if (grid[positionA.y + (i * sign)][positionA.x] === ASTEROID) return false
		}
		return true
	}

	const signY = positionA.y < positionB.y ? 1 : -1
	const signX = positionA.x < positionB.x ? 1 : -1
	const coefficient = distX / distY

	for (let i = 1; i < distY; i++) {
		const y = positionA.y + i * signY
		const x = positionA.x + i * coefficient * signX

		if (x % 1 === 0 && grid[y][x] === ASTEROID) return false
	}

	return true
}

const contestResponse = input => {
	const search = Number(input[0]) - 1
	const grid = input.slice(1).map(row => row.split(''))

	let asteroids = []
	let base

	grid.forEach((row, y) => row.forEach((element, x) => {
		if (element === BASE) {
			base = { y, x }
		} else if (element === ASTEROID) {
			asteroids.push({ y, x})
		}
	}))

	asteroids = asteroids
		.map(asteroid => ({
			y: asteroid.y,
			x: asteroid.x,
			rY: asteroid.y - base.y,
			rX: asteroid.x - base.x
		}))
		.map(asteroid => {
			const radians = Math.atan2(asteroid.rX, -asteroid.rY)
			const degrees = radians * (180 / Math.PI)
			asteroid.angle = degrees >= 0 ? degrees : degrees + 360
			return asteroid
		})

	asteroids.sort((a, b) => a.angle - b.angle)

	let destructionOrder = []

	while (asteroids.length > 0) {
		const visibles = []
		const notVisibles = []

		asteroids.forEach(asteroid => {
			if (lineOfSight(grid, base, asteroid)) visibles.push(asteroid)
			else notVisibles.push(asteroid)
		})

		visibles.forEach(asteroid => grid[asteroid.y][asteroid.x] = NOTHING)
		destructionOrder = destructionOrder.concat(visibles)
		asteroids = notVisibles
	}

	const searchAsteroid = destructionOrder[search]
	const result = searchAsteroid.x * 100 + searchAsteroid.y

	return result
}

module.exports = contestResponse