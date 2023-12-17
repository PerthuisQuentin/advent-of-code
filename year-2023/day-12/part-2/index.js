const BROKEN_SPRING = '#'
const FUNCTIONAL_SPRING = '.'
const UNKNOWN_SPRING = '?'

const COPIES = 5

const DOT_REGEX = /^\.+|\.+$/
const BROKEN_SPRINGS_GROUP_AT_START_REGEX = /^#+(?=\.|$)/
const BROKEN_SPRINGS_REGEX = /#/g

const parseSpringRow = line => {
	const [springs, groups] = line.split(' ')
	return {
		springs: springs,
		groups: groups.split(',').map(Number)
	}
}

const multiplySpringRow = springRow => {
	const { springs, groups } = springRow
	return {
		springs: new Array(COPIES).fill(springs).join(UNKNOWN_SPRING),
		groups: new Array(COPIES).fill(groups).flat(),
	}
}

const memory = new Map()

const countArrangementsRec = (springs, groups) => {
	// Remove all dots at start or end
	let currentSprings = springs.replace(DOT_REGEX, '')
	// With an empty string, it's a possible solution if there are no groups left
	if (currentSprings.length === 0) return groups.length === 0 ? 1 : 0

	// With no groups left, it's a possible solution if there are no broken springs (only dots or unknowns)
	if (groups.length === 0) return springs.includes(BROKEN_SPRING) ? 0 : 1

	// Memoization
	const hash = `${currentSprings} ${groups.join(',')}`
	if (memory.has(hash)) return memory.get(hash)

	let count = 0

	const brokenSpringsGroup = currentSprings.match(BROKEN_SPRINGS_GROUP_AT_START_REGEX)
	// Recurse if there is a complete group of broken springs at the start
	if (brokenSpringsGroup) {
		if (brokenSpringsGroup[0].length === groups[0]) {
			count += countArrangementsRec(currentSprings.slice(groups[0]), groups.slice(1))
		}
		// If the group is not the good size, it's not a possible solution so we should stop here
	}
	else if (currentSprings.includes(UNKNOWN_SPRING)) {
		// Recurse with unknown springs replaced with functional springs
		count += countArrangementsRec(currentSprings.replace(UNKNOWN_SPRING, FUNCTIONAL_SPRING), groups)

		// Only replace unknown springs with broken springs if there aren't enough broken springs
		const groupsSum = groups.reduce((sum, value) => sum + value, 0)
		const brokenSpringMatches = currentSprings.match(BROKEN_SPRINGS_REGEX)
		const brokenSpringAmount = brokenSpringMatches ? brokenSpringMatches.length : 0
		if (brokenSpringAmount < groupsSum) {
			count += countArrangementsRec(currentSprings.replace(UNKNOWN_SPRING, BROKEN_SPRING), groups)
		}
	}

	memory.set(hash, count)
	return count
}

const countArrangements = springRow => countArrangementsRec(springRow.springs, springRow.groups)

const contestResponse = input => {
	const springRows = input
		.map(parseSpringRow)
		.map(multiplySpringRow)

	return springRows
		.map(countArrangements)
		.reduce((sum, value) => sum + value, 0)
}

module.exports = contestResponse