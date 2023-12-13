const BROKEN_SPRING = '#'
const FUNCTIONAL_SPRING = '.'
const UNKNOWN_SPRING = '?'

const parseSpringRow = line => {
	const [springs, groups] = line.split(' ')
	return {
		springs: springs.split(''),
		groups: groups.split(',').map(Number),
		size: springs.length
	}
}

function getMinSize(groups) {
    return groups.reduce((acc, x) => acc + x, 0) + groups.length - 1
}

// Thanks to my Picross Solver :D
// https://github.com/PerthuisQuentin/picross-solver/blob/main/solver.js
function generateArrangementsRec(arrangements, size, groups, arrangement, initOffset) {
    if (groups.length === 0) {
        arrangements.push(arrangement)
        return
    }

    const minSize = getMinSize(groups)
    const maxOffset = (size - initOffset) - minSize

    for (let offset = initOffset; offset <= initOffset + maxOffset; offset++) {
        const value = groups[0]
        const arrangementCopy = arrangement.slice()

        for (let i = offset; i < offset + value; i++) {
            arrangementCopy[i] = BROKEN_SPRING
        }

        const nextOffset = offset + value + 1
        generateArrangementsRec(arrangements, size, groups.slice(1), arrangementCopy, nextOffset)
    }
}

function generateArrangements(springRow) {
    const arrangements = []

    const emptyArrangement = []
    for (let i = 0; i < springRow.size; i++) {
        emptyArrangement.push(UNKNOWN_SPRING)
    }

    generateArrangementsRec(arrangements, springRow.size, springRow.groups, emptyArrangement, 0)

    return arrangements
}

function isArrangementCompatible(currentArrangement, possibleArrangement) {
    for (let i = 0; i < currentArrangement.length; i++) {
        const currentSpring = currentArrangement[i]
        const possibleSpring = possibleArrangement[i]
        if (possibleSpring === BROKEN_SPRING && currentSpring === FUNCTIONAL_SPRING) {
            return false
        }
        if (possibleSpring === UNKNOWN_SPRING && currentSpring === BROKEN_SPRING) {
            return false
        }
    }
    return true
}

function getPossibleArrangements(springRow) {
    const arrangements = generateArrangements(springRow)
    const filteredArrangements = arrangements.filter(possibleArrangement => isArrangementCompatible(springRow.springs, possibleArrangement))
    return filteredArrangements
}

const contestResponse = input => {
	const springRows = input.map(parseSpringRow)

	return springRows
		.map(getPossibleArrangements)
		.map(possibleArrangements => possibleArrangements.length)
		.reduce((sum, value) => sum + value, 0)
}

module.exports = contestResponse