const Chalk = require('chalk')

const parseBingo = input => {
	const numbers = input[0].split(',').map(Number)

	const grids = input
		.slice(2)
		.join('/')
		.split('//')
		.map(grid => grid
			.split('/')
			.map(line => line
				.split(' ')
				.filter(n => n !== '')
				.map(Number)
				.map(n => ({
					marked: false,
					value: n
				}))
			)
		)

	return {
		numbers,
		grids
	}
}

const logGrids = grids => {
	console.log(grids
		.map(grid => grid
			.map(line => line
				.map(n => {
					const value = n.value > 9 ? n.value.toString() : ` ${n.value}`
					return n.marked ? Chalk.inverse(value): value
				})
				.join(' ')
			)
			.join('\n')
		).join('\n\n')
	)
}

const markNumber = (grids, number) => {
	grids.forEach(grid => {
		grid.forEach(line => {
			const index = line.findIndex(n => n.value === number)
			if (index !== -1) {
				line[index].marked = true
			}
		})
	})
}

const isGridCompleted = grid => {
	for (let i = 0; i < grid.length; i++) {
		const line = grid[i];
		if (line.every(n => n.marked)) return true
	}

	for (let i = 0; i < grid.length; i++) {
		let marked = true

		for (let y = 0; y < grid.length; y++) {
			if (!grid[y][i].marked) marked = false
		}

		if (marked) return true
	}

	return false
}

const sumUnmarked = grid => {
	return grid
		.map(line => line.reduce((total, n) => n.marked ? total : total + n.value, 0))
		.reduce((a, b) => a + b)
}

const contestResponse = input => {
	const bingo = parseBingo(input)

	for (let i = 0; i < bingo.numbers.length; i++) {
		const number = bingo.numbers[i]
		const uncompletedGrid = bingo.grids.find(grid => !isGridCompleted(grid))
		markNumber(bingo.grids, number)

		if (bingo.grids.every(grid => isGridCompleted(grid))) {
			const sum = sumUnmarked(uncompletedGrid)
			return sum * number
		}
	}
}

module.exports = contestResponse