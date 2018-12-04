const contestResponse = input => {
	const counts = input
		.map(word => word.split('').reduce((prev, cur) => {
			if (!prev[cur]) prev[cur] = 0
			prev[cur]++
			return prev
		}, {}))
		.map(counts => Object.keys(counts).reduce((prev, cur) => {
			if (counts[cur] === 2) prev[0] = true
			else if (counts[cur] === 3) prev[1] = true
			return prev
		}, [false, false]))
		.reduce((prev, cur) => {
			if (cur[0]) prev[0]++
			if (cur[1]) prev[1]++
			return prev
		}, [0, 0])

	const checksum = counts[0] * counts[1]

	return checksum.toString()
}

module.exports = contestResponse