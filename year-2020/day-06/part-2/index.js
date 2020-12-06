const contestResponse = input => {
	const result = input
		.join(' ')
		.split(';')
		.map(peopleAnswers => {
			const set = new Set()
			
			const answers = peopleAnswers.trim().split(' ')

			let count = 0
			for (let letter of answers[0]) {
				if (answers.slice(1).every(answer => answer.includes(letter))) count++
			}

			return count
		})
		.reduce((a, b) => a + b)

	return result
}

module.exports = contestResponse