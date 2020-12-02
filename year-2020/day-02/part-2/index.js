const contestResponse = input => {
	const lines = input
		.map(line => {
			const [rules, password] = line.split(': ')
			const [size, letter] = rules.split(' ')
			const [pos1, pos2] = size.split('-').map(Number)
			return { password, letter, pos1, pos2 }
		})
		.filter(line => {
			const char1 = line.password[line.pos1 - 1]
			const char2 = line.password[line.pos2 - 1]
			return (char1 === line.letter) !== (char2 === line.letter)
		})

	return lines.length
}

module.exports = contestResponse