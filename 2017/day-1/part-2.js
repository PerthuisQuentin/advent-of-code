const contestResponse = input => {
	const text = input[0]
	const half = text.length / 2
	let sum = 0
	
	for (let i = 0; i < text.length; i++) {
		if (text[i] === text[(i + half) % text.length]) {
			sum += Number(text[i])
		}
	}

	return sum.toString()
}

module.exports = contestResponse