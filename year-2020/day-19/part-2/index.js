const characterRegex = /"([\w]+)"/
const subRulesRegex = /([\d ]+)/g

const MAX_RECURSIVE = 5

const parseRecursiveRule = (id, subRules) => {
	const ruleWithRec = subRules.find(subRule => subRule.some(ruleId => ruleId === id))
	const result = []
	const current = [...ruleWithRec]

	for (let i = 0; i < MAX_RECURSIVE; i++) {
		const copyToAdd = [...current]
		copyToAdd.splice(copyToAdd.findIndex(ruleId => ruleId === id), 1)
		result.push(copyToAdd)

		current.splice(current.findIndex(ruleId => ruleId === id), 1, ...ruleWithRec)
	}

	return result
}

const parseRule = ruleLine => {
	const [id, ruleText] = ruleLine.split(': ')
	const rule = { id }

	if (characterRegex.test(ruleText)) {
		rule.character = ruleText.match(characterRegex)[1]
	} else if (subRulesRegex.test(ruleText)) {
		const subRules = ruleText
			.match(subRulesRegex)
			.map(s => s.trim().split(' '))

		if (subRules.some(subRule => subRule.some(ruleId => ruleId === id))) {
			rule.subRules = parseRecursiveRule(id, subRules)
		} else {
			rule.subRules = subRules
		}
	}

	return rule
}

const parseInput = input => {
	const index = input.findIndex(line => line === ';')
	const rules = new Map()

	input
		.slice(0, index)
		.forEach(ruleLine => {
			const rule = parseRule(ruleLine)
			rules.set(rule.id, rule) 
		})

	const messages = input
		.slice(index + 1)
	
	return {
		rules,
		messages
	}
}

const getRegexPart = (rules, ruleId) => {
	const rule = rules.get(ruleId)

	if (rule.subRules && rule.subRules.length === 1) {
		return rule.subRules[0].map(subRuleId => getRegexPart(rules, subRuleId)).join('')

	} if (rule.subRules && rule.subRules.length > 1) {
		const subRules = rule.subRules.map(subRule =>
			subRule.map(subRuleId => getRegexPart(rules, subRuleId)).join('')
		).join('|')
		return `(${subRules})`

	} else if (rule.character) {
		return rule.character
	}
}

const buildRegex = (rules, startRuleId) => {
	const regexPart = getRegexPart(rules, startRuleId)
	return new RegExp(`^${regexPart}$`)
}

const contestResponse = input => {
	const { rules, messages } = parseInput(input)
	const regex = buildRegex(rules, '0')

	const validMessages = messages
		.filter(message => regex.test(message))

	return validMessages.length
}

module.exports = contestResponse