const countLetter = (password, searchedLetter) => {
	let counter = 0
	for (letter of password) {
		if (letter === searchedLetter) counter++
	}
	return counter
}

const contestResponse = input => {
	const lines = input
		.map(line => {
			const [rules, password] = line.split(': ')
			const [size, letter] = rules.split(' ')
			const [min, max] = size.split('-').map(Number)
			return { password, letter, min, max }
		})
		.filter(line => {
			const count = countLetter(line.password, line.letter)
			return (count >= line.min) && (count <= line.max)
		})

	return lines.length
}

module.exports = contestResponse