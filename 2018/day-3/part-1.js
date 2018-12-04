// Bonus
function drawFabric(fabric) {
	let log = ''
	
	const longuestRow = fabric.map(x => x.length).reduce((prev, cur) => prev > cur ? prev : cur) + 1

	for (let x = 0; x < longuestRow; x++) {
		for (let y = 0; y < longuestRow; y++) {
			if (!fabric[x] || !fabric[x][y]) log += '.'
			else log += fabric[x][y]
		}
		log += '\n'
	}

	console.log(log)
}

function countOverlaped(fabric) {
	let count = 0

	for (let x = 0; x < fabric.length; x++) {
		if (!fabric[x]) continue
		for (let y = 0; y < fabric[x].length; y++) {
			if (fabric[x][y] === 'X') count++
		}
	}

	return count
}

const contestResponse = input => {
	const fabric = []

	input.forEach(line => {
		const splittedLine = line.split(' ')
		const id = Number(splittedLine[0].slice(1))
		const edge = splittedLine[2].replace(':', '').split(',').map(Number)
		const size = splittedLine[3].split('x').map(Number)

		for (let x = edge[0]; x < edge[0] + size[0]; x++) {
			for (let y = edge[1]; y < edge[1] + size[1]; y++) {
				if (!fabric[x]) fabric[x] = []
				
				if (!fabric[x][y]) fabric[x][y] = id
				else fabric[x][y] = 'X'
			}
		}
	})

	//drawFabric(fabric)

	return countOverlaped(fabric).toString()
}

module.exports = contestResponse