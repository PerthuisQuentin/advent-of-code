const ArrayUtils = require('../../../utils/array')

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const findCommonItemInGroups = groups => {
	return Array
		.from(groups[0])
		.find(item => groups[1].has(item) && groups[2].has(item))
}

const contestResponse = input => {
	const priorities = ArrayUtils.stackBy(input, 3)
		.map(groups => groups.map(rucksack => new Set(rucksack)))
		.map(rucksack => findCommonItemInGroups(rucksack))
		.map(item => LETTERS.indexOf(item) + 1)

	return ArrayUtils.sum(priorities)
}

module.exports = contestResponse