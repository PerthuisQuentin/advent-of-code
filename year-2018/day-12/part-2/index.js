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
	let lastGenPotsNumber = sumPotsNumber(lastGen, zeroAt)
	let newGenPotsNumber
	let lastDiff = 0
	let newDiff
	let sameDiffAmount = 0
	let nWhenBreak
	let diffWhenBreak
	let potsWhenBreak

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

		newGenPotsNumber = sumPotsNumber(newGen, zeroAt)
		newDiff = newGenPotsNumber - lastGenPotsNumber

		if (newDiff === lastDiff) {
			sameDiffAmount++
		} else {
			sameDiffAmount = 0
		}
		
		if (sameDiffAmount > 100) {
			nWhenBreak = n
			diffWhenBreak = lastDiff
			potsWhenBreak = newGenPotsNumber
			break
		}

		lastGen = newGen + '..'
		newGen = '..'
		lastGenPotsNumber = newGenPotsNumber
		lastDiff = newDiff
	}

	const result = potsWhenBreak + ((generations - nWhenBreak - 1) * diffWhenBreak)

	return result.toString()
}

module.exports = contestResponse