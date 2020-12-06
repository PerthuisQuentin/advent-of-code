const contestResponse = input => {
	const result = input
		.join(' ')
		.split(';')
		.map(peopleAnswers => {
			const set = new Set()
			
			peopleAnswers
				.trim()
				.split(' ')
				.forEach(answers => {
					for (let letter of answers) set.add(letter)
				})

			return set.size
		})
		.reduce((a, b) => a + b)

	return result
}

module.exports = contestResponse