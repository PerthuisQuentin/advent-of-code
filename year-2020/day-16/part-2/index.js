const ruleRegex = /([ \w]+): ([\d]+)-([\d]+) or ([\d]+)-([\d]+)/

const parseInput = input => {
	const rulesEnd = input.findIndex(line => line === ';')
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

const isValid = (rules, ticket) => ticket.every(fieldValue => rules.some(rule => verifyRule(rule, fieldValue)))

const determineFieldsOrder = (rules, validTickets) => {
	const validRulesByPosition = {}
	const ticketLength = validTickets[0].length

	for (let position = 0; position < ticketLength; position++) {
		validRulesByPosition[position] = []
		rules.forEach(rule => {
			if (validTickets.every(ticket => verifyRule(rule, ticket[position]))) {
				validRulesByPosition[position].push(rule.name)
			}
		})
	}

	const rulesByPosition = {}

	while(Object.keys(rulesByPosition).length < ticketLength) {
		const positionWithOnlyOneValidRule = Object
			.keys(validRulesByPosition)
			.find(position => validRulesByPosition[position].length === 1)

		if (positionWithOnlyOneValidRule !== undefined) {
			const foundRule = validRulesByPosition[positionWithOnlyOneValidRule][0]
			rulesByPosition[positionWithOnlyOneValidRule] = foundRule
			
			Object
				.keys(validRulesByPosition)
				.forEach(position => {
					const index = validRulesByPosition[position].findIndex(rule => rule === foundRule)
					validRulesByPosition[position].splice(index, 1)
				})
		} else {
			throw new Error('aie')
		}
	}

	const order = []
	for (let position = 0; position < ticketLength; position++) {
		order.push(rulesByPosition[position])
	}

	return order
}

const contestResponse = input => {
	const { rules, myTicket, tickets } = parseInput(input)

	const validTickets = tickets.filter(ticket => isValid(rules, ticket))
	const rulesOrder = determineFieldsOrder(rules, validTickets)

	let result = 1
	rulesOrder.forEach((ruleName, position) => {
		if (ruleName.startsWith('departure')) {
			result *= myTicket[position]
		}
	})

	return result
}

module.exports = contestResponse