const contestResponse = input => {
	const units = 'abcdefghijklmnopqrstuvwxyz'
	let polymer
	let i
	const results = []

	for (let x = 0; x < units.length; x++) {
		polymer = input[0].replace(new RegExp(units[x], 'gi'), '')
		i = 0

		do {
			if (polymer[i] !== polymer[i + 1] && polymer[i].toLowerCase() === polymer[i + 1].toLowerCase()) {	
				polymer = polymer.slice(0, i) + polymer.slice(i + 2)
				i = Math.max(i - 1, 0)
			} else {
				i++
			}
		} while (i < polymer.length - 1)

		results.push(polymer.length)
	}

	return results.reduce((prev, cur) => prev < cur ? prev: cur).toString()
}

module.exports = contestResponse