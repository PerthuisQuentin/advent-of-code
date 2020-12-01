const contestResponse = input => {
	const floor = input
		.map(s => s.split('x').map(Number))
		.map(s => {
			const [l, w, h] = s
			const perimeters = [2*l+2*w, 2*l+2*h, 2*h+2*w]
			const smallest = perimeters.reduce((a, b) => b < a ? b : a)
			return smallest + l*w*h
		})
		.reduce((a, b) => a + b)

	return floor
}

module.exports = contestResponse