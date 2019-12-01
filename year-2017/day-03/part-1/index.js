const contestResponse = input => {
	const max = Number(input[0])
	let value = 1
	let pos = { x: 0, y: 0 }
	let step = 1
	let dir

	for (let i = 1; i <= max; i++) {
		dir = step % 2 === 1 ? 1 : -1

		for (let y = 0; y < step; y++) {
			if (value === max) break
			value++
			pos.x += dir
		}
		for (let y = 0; y < step; y++) {
			if (value === max) break
			value++
			pos.y += dir
		}

		step++
	}

	const distance = Math.abs(pos.x) + Math.abs(pos.y)
	
	return distance.toString()
}

module.exports = contestResponse