const GREEN = 'green'
const RED = 'red'
const BLUE = 'blue'
const COLORS = [GREEN, RED, BLUE]

const GAME_REGEX = /Game (\d+): (.+)/

const parseCube = cube => {
	const [amount, color] = cube.split(' ')
	return { amount: Number(amount), color }
}

const parseSet = set => {
	const cubes = set.split(', ').map(parseCube)
	const result = {}
	COLORS.forEach(color => {
		const cube = cubes.find(cube => cube.color === color)
		result[color] = cube ? cube.amount : 0
	})
	return result
}

const parseSets = sets => sets.split('; ').map(parseSet)

const parseGame = line => {
	const matches = line.match(GAME_REGEX)
	return {
		id: Number(matches[1]),
		sets: parseSets(matches[2])
	}
}

const getGameMinBag = game => {
	const minBag = {}
	COLORS.forEach(color => {
		const setAmounts = game.sets.map(set => set[color])
		minBag[color] = [...setAmounts, 0].reduce((max, current) => current > max ? current : max, 0)
	})
	return minBag
}

const getBagPower = bag => {
	return COLORS.reduce((power, color) => power * bag[color], 1)
}

const contestResponse = input => {
	const games = input.map(parseGame)

	return games
		.map(game => getGameMinBag(game))
		.map(getBagPower)
		.reduce((a, b) => a + b, 0)
}

module.exports = contestResponse