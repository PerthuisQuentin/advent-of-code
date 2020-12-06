const contestResponse = input => {
	let polymer = input[0]
	let i = 0

	do {
		if (polymer[i] !== polymer[i + 1] && polymer[i].toLowerCase() === polymer[i + 1].toLowerCase()) {	
			polymer = polymer.slice(0, i) + polymer.slice(i + 2)
			i = Math.max(i - 1, 0)
		} else {
			i++
		}
	} while (i < polymer.length - 1)

	return polymer.length.toString()
}

module.exports = contestResponse