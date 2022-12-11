const { ArrayUtils } = require('../../../utils')

const OLD_VARIABLE = 'old'
const REGEX_MONKEY_ID = /Monkey (\d+):/
const REGEX_STARTING_ITEMS = /Starting items: ([\d, ]+)/
const REGEX_OPERATION = /Operation: new = ([\d\w+* ]+)/
const REGEX_OPERATION_ELEMENTS = /([\w\d]+) ([+*]{1}) ([\w\d]+)/
const REGEX_DIVISIBLE_BY = /Test: divisible by (\d+)/
const REGEX_IF_TRUE = /If true: throw to monkey (\d+)/
const REGEX_IF_FALSE = /If false: throw to monkey (\d+)/

const OPERATIONS = {
	'+': (value1, value2) => value1 + value2,
	'*': (value1, value2) => value1 * value2
}

const createOperation = operation => {
	const [, element1, operator, element2] = operation.match(REGEX_OPERATION_ELEMENTS)

	return old => {
		const value1 = element1 === OLD_VARIABLE ? old : Number(element1)
		const value2 = element2 === OLD_VARIABLE ? old : Number(element2)
		return OPERATIONS[operator](value1, value2)
	}
}

const parseMonkey = rawMonkey => {
	const id = Number(rawMonkey[0].match(REGEX_MONKEY_ID)[1])
	const items = rawMonkey[1].match(REGEX_STARTING_ITEMS)[1].split(', ').map(Number)
	const operation = createOperation(rawMonkey[2].match(REGEX_OPERATION)[1])
	const divisibleBy = Number(rawMonkey[3].match(REGEX_DIVISIBLE_BY)[1])
	const monkeyIfTrue = Number(rawMonkey[4].match(REGEX_IF_TRUE)[1])
	const monkeyIfFalse = Number(rawMonkey[5].match(REGEX_IF_FALSE)[1])

	return { id, items, operation, divisibleBy, monkeyIfTrue, monkeyIfFalse, inspections: 0 }
}

const parseMonkeys = input => {
	const rawMonkeys = ArrayUtils.split(input, '')
	return rawMonkeys.map(parseMonkey)
}

const makeRound = monkeys => {
	monkeys.forEach(monkey => {
		while (monkey.items.length) {
			monkey.inspections++
			const item = monkey.items.shift()
			const worryLevel = Math.floor(monkey.operation(item) / 3)
			const monkeyToThrow = worryLevel % monkey.divisibleBy === 0 ? monkey.monkeyIfTrue : monkey.monkeyIfFalse
			monkeys[monkeyToThrow].items.push(worryLevel)
		}
	})
}

const contestResponse = input => {
	const monkeys = parseMonkeys(input)

	for (let i = 0; i < 20; i++) {
		makeRound(monkeys)
	}

	const monkeyBusiness = monkeys
		.map(monkey => monkey.inspections)
		.sort((a, b) => b - a)
		.slice(0, 2)
		.reduce((a, b) => a * b)

	return monkeyBusiness
}

module.exports = contestResponse