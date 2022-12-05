const OPERATIONS_REGEX = /move (\d+) from (\d+) to (\d+)/

const parseCrates = rawCrates => {
	const crates = {}

	for (let height = rawCrates.length - 1; height >= 0; height--) {
		const line = rawCrates[height]

		for (let column = 0; column < (line.length + 1) / 4; column++) {
			const crateLetter = line[column * 4 + 1]
			if (crateLetter === ' ') continue

			if (!crates[column + 1]) crates[column + 1] = []
			crates[column + 1].push(crateLetter)
		}
	}

	return crates
}

const parseOperations = rawOperations => {
	return rawOperations
		.map(rawOperation => {
			const matches = rawOperation.match(OPERATIONS_REGEX)
			return {
				amount: Number(matches[1]),
				from: Number(matches[2]),
				to: Number(matches[3])
			}
		})
}

const parseInput = input => {
	const middleIndex = input.findIndex(x => x === '')
	const rawCrates = input.slice(0, middleIndex - 1)
	const rawOperations = input.slice(middleIndex + 1)

	const crates = parseCrates(rawCrates)
	const operations = parseOperations(rawOperations)

	return { crates, operations }
}

const executeOperation = (crates, operation) => {
	const index = crates[operation.from].length - operation.amount
	const cratesToMove = crates[operation.from].splice(index, operation.amount).reverse()
	crates[operation.to].push(...cratesToMove)
}

const getResult = crates => {
	return Object.keys(crates).map(column => crates[column][crates[column].length - 1]).join('')
}

const run = (crates, operations) => {
	operations.forEach(operation => {
		executeOperation(crates, operation)
	})
	return getResult(crates)
}

const contestResponse = input => {
	const { crates, operations } = parseInput(input)
	return run(crates, operations)
}

module.exports = contestResponse