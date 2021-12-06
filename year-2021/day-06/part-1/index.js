const DAYS = 80

const contestResponse = input => {
	const fishes = new Map()

	for (let i = 0; i <= 8; i++) {
		fishes.set(i, 0)
	}

	input[0]
		.split(',')
		.map(Number)
		.forEach(timer => {
			fishes.set(timer, fishes.get(timer) + 1)
		})

	for (let i = 0; i < DAYS; i++) {
		const newFishes = fishes.get(0)

		for (let i = 1; i <= 8; i++) {
			fishes.set(i - 1, fishes.get(i))
		}

		fishes.set(6, fishes.get(6) + newFishes)
		fishes.set(8, newFishes)
	}

	return Array.from(fishes).reduce((total, value) => total + value[1], 0)
}

module.exports = contestResponse