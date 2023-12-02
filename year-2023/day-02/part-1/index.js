const GREEN = 'green'
const RED = 'red'
const BLUE = 'blue'
const COLORS = [GREEN, RED, BLUE]

const BAG = {
	[GREEN]: 13,
	[RED]: 12,
	[BLUE]: 14
}

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

const isSetValid = (set, bag) => COLORS.every(color => set[color] <= bag[color])

const isGameValid = (game, bag) => game.sets.every(set => isSetValid(set, bag))

const contestResponse = input => {
	const games = input.map(parseGame)

	return games
		.filter(game => isGameValid(game, BAG))
		.map(game => game.id)
		.reduce((a, b) => a + b, 0)
}

module.exports = contestResponse