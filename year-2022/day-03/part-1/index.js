const ArrayUtils = require('../../../utils/array')

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const findCommonItemInBothCompartment = rucksack => {
	return Array
		.from(rucksack[0])
		.find(item => rucksack[1].has(item))
}

const contestResponse = input => {
	const priorities = input
		.map(rucksack => {
			const middle = rucksack.length / 2
			return [
				rucksack.slice(0, middle),
				rucksack.slice(middle)
			]
		})
		.map(rucksack => {
			return [
				new Set(rucksack[0]),
				new Set(rucksack[1])
			]
		})
		.map(rucksack => findCommonItemInBothCompartment(rucksack))
		.map(item => LETTERS.indexOf(item) + 1)

	return ArrayUtils.sum(priorities)
}

module.exports = contestResponse