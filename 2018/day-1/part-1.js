const contestResponse = input => {
	const result = input
		.reduce((acc, cur) => acc + Number(cur), 0)

	return result.toString()
}

module.exports = contestResponse