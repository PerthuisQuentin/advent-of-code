const subExpressionsRegex = /(\([\d +*]+\))/g
const additionRegex = /([\d]+) \+ ([\d]+)/
const multiplicationRegex = /([\d]+) \* ([\d]+)/

const eval = expression => {
	let newExpression = expression

	while (subExpressionsRegex.test(newExpression)) {
		const subExpressions = newExpression.match(subExpressionsRegex)

		subExpressions.forEach(subExpression => {
			newExpression = newExpression.replace(subExpression, eval(subExpression.slice(1, -1)))
		})
	}

	while (additionRegex.test(newExpression)) {
		const [operation, value1, value2] = newExpression.match(additionRegex)
		newExpression = newExpression.replace(operation, Number(value1) + Number(value2))
	}
	while (multiplicationRegex.test(newExpression)) {
		const [operation, value1, value2] = newExpression.match(multiplicationRegex)
		newExpression = newExpression.replace(operation, Number(value1) * Number(value2))
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