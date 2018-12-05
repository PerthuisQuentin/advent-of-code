const contestResponse = input => {
	const checksum = input
		.map(line => {
			const values = line.split(' ').map(Number)
			const min = values.reduce((prev, cur) => cur < prev ? cur : prev)
			const max = values.reduce((prev, cur) => cur > prev ? cur : prev)
			return max - min
		})
		.reduce((prev, cur) => prev + cur)

	return checksum.toString()
}

module.exports = contestResponse