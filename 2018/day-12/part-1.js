function sumPotsNumber(pots, zeroAt) {
	let sum = 0
	for (let i = 0; i < pots.length; i++) {
		if (pots[i] === '#') sum += i - zeroAt
	}
	return sum
}

const contestResponse = input => {
	const initialState = input[0].split(' ')[2]
	const generations = Number(input[1])
	const rules = {}
	const pots = '....' + initialState + '....'

	input.slice(2).forEach(line => {
		const split = line.split(' ')
		rules[split[0]] = split[2]
	})

	let zeroAt = 4
	let lastGen = pots
	let newGen = '..'

	for (let n = 0; n < generations; n++) {
		for (let i = 2; i < lastGen.length - 2; i++) {
			const result = rules[lastGen.slice(i - 2, i + 3)]
			newGen += result !== undefined ? result : '.'
		}

		if (newGen[0] === '#') {
			newGen = '..' + newGen
			zeroAt += 2
		} else if (newGen[1] === '#') {
			newGen = '.' + newGen
			zeroAt += 1
		}

		if (newGen[newGen.length - 1] === '#') {
			newGen = newGen + '..' 
		} else if (newGen[newGen.length - 2] === '#') {
			newGen = newGen + '.'
		}

		lastGen = newGen + '..'
		newGen = '..'
	}

	return sumPotsNumber(lastGen, zeroAt).toString()
}

module.exports = contestResponse