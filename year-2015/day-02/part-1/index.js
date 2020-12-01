const contestResponse = input => {
	const floor = input
		.map(s => s.split('x').map(Number))
		.map(s => {
			const [l, w, h] = s
			const sides = [l*w, w*h, h*l]
			const smallest = sides.reduce((a, b) => b < a ? b : a)
			return 2*l*w + 2*w*h + 2*h*l + smallest
		})
		.reduce((a, b) => a + b)

	return floor
}

module.exports = contestResponse