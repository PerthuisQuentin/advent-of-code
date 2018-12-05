const contestResponse = input => {
	const checksum = input
		.map(line => {
			const values = line.split(' ').map(Number)

			for (let i = 0; i < values.length; i++) {
				for (let y = i; y < values.length; y++) {
					if (values[i] === values[y]) continue
					if (Number.isInteger(values[i] / values[y])) return values[i] / values[y]
					if (Number.isInteger(values[y] / values[i])) return values[y] / values[i]
				}
			}
		})
		.reduce((prev, cur) => prev + cur)

	return checksum.toString()
}

module.exports = contestResponse