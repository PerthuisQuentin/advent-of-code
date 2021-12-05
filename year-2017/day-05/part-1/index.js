const contestResponse = input => {
	const instructions = input.map(Number)
	let position = 0
	let count = 0

	while (instructions[position] !== undefined) {
		const jump = instructions[position]
		instructions[position]++
		position += jump
		count++
	}

	return count
}

module.exports = contestResponse