const subExpressionsRegex = /(\([\d +*]+\))/g
const operationRegex = /([\d]+) ([+*]) ([\d]+)/

const eval = expression => {
	let newExpression = expression

	while (subExpressionsRegex.test(newExpression)) {
		const subExpressions = newExpression.match(subExpressionsRegex)

		subExpressions.forEach(subExpression => {
			newExpression = newExpression.replace(subExpression, eval(subExpression.slice(1, -1)))
		})
	}

	while (operationRegex.test(newExpression)) {
		const [operation, value1, operator, value2] = newExpression.match(operationRegex)
		let result
		if (operator === '+') result = Number(value1) + Number(value2)
		else if (operator === '*') result = Number(value1) * Number(value2)
		newExpression = newExpression.replace(operation, result)
	}

	return newExpression
}

const contestResponse = input => {
	const result = input
		.map(eval)
		.reduce((result, expressionResult) => result + Number(expressionResult), 0)

	return result
}

module.exports = contestResponse