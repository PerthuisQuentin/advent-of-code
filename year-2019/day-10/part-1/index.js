const NOTHING = '.'
const ASTEROID = '#'

const displayGrid = grid => grid.forEach(row => console.log(row.join('')))

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

const countAsteroidVisible = (grid, position) => {
	let count = 0

	grid.forEach((row, y) => {
		row.forEach((element, x) => {
			if (position.x === x && position.y === y) return

			if (element === ASTEROID && lineOfSight(grid, position, { x, y })) {
				count++
			}
		})
	})

	return count
}

const mapLineOfSightAmount = grid => grid
	.map((row, y) => row
		.map((element, x) => element === ASTEROID ? countAsteroidVisible(grid, { y, x }) : NOTHING))

const getMaxLineOfSightAmount = amountGrid => amountGrid
	.map(row => row.reduce((max, current) => typeof(current) === 'number' && current > max ? current : max, 0))
	.reduce((max, current) => current > max ? current : max, 0)

const contestResponse = input => {
	const grid = input.map(row => row.split(''))

	const amountGrid = mapLineOfSightAmount(grid)

	const maxLineOfSight = getMaxLineOfSightAmount(amountGrid)

	return maxLineOfSight
}

module.exports = contestResponse