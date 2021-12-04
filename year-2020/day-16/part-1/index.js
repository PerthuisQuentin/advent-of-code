const ruleRegex = /([\w]+): ([\d]+)-([\d]+) or ([\d]+)-([\d]+)/

const parseInput = input => {
	const rulesEnd = input.findIndex(line => line === '')
	const rules = input
		.slice(0, rulesEnd)
		.map(line => {
			const [, name, min1, max1, min2, max2] = line.match(ruleRegex)
			return {
				name,
				min1: Number(min1),
				max1: Number(max1),
				min2: Number(min2),
				max2: Number(max2)
			}
		})

	const myTicket = input[rulesEnd + 2].split(',').map(Number)

	const tickets = input
		.slice(rulesEnd + 5)
		.map(line => line.split(',').map(Number))

	return { rules, myTicket, tickets }
}

const verifyRule = (rule, value) => (
	(value >= rule.min1 && value <= rule.max1) ||
	(value >= rule.min2 && value <= rule.max2)
)

const getInvalidFieldValue = (rules, ticket) => ticket.find(fieldValue => rules.every(rule => !verifyRule(rule, fieldValue)))

const contestResponse = input => {
	const { rules, myTicket, tickets } = parseInput(input)

	const errorData = tickets
		.map(ticket => getInvalidFieldValue(rules, ticket))
		.filter(value => value !== undefined)
		.reduce((a, b) => a + b)

	return errorData
}

module.exports = contestResponse