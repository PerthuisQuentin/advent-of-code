const ORIGIN = 'YOU'
const DESTINATION = 'SAN'

const createNode = name => ({
	name,
	parent: null,
	children: []
})

const createTree = orbits => {
	const orbitsByName = {}

	orbits.forEach(orbit => {
		const center = orbit[0]
		const inOrbit = orbit[1]

		if (!orbitsByName[center]) orbitsByName[center] = createNode(center)
		if (!orbitsByName[inOrbit]) orbitsByName[inOrbit] = createNode(inOrbit)

		orbitsByName[center].children.push(orbitsByName[inOrbit])
		orbitsByName[inOrbit].parent = orbitsByName[center]
	})

	const root = Object.values(orbitsByName).find(orbit => !orbit.parent)

	return root
}

const setDepth = (orbit, depth) => {
	orbit.depth = depth
	const nextDepth = depth + 1
	let total = depth

	orbit.children.forEach(child => {
		total += setDepth(child, nextDepth)
	})

	return total
}

const getLengthBetween = (orbit, from, to) => {
	if (orbit.name === from || orbit.name === to) return { inc: true, value: 0 }
	if (orbit.children.length === 0) return { inc: false, value: 0 }

	const orbitsSearched = orbit.children
		.map(child => getLengthBetween(child, from, to))
		.filter(data => data.inc || data.value > 0)

	if (orbitsSearched.length === 1) {
		if (orbitsSearched[0].inc) orbitsSearched[0].value++
		return orbitsSearched[0]
	} else if (orbitsSearched.length > 1) {
		return {
			inc: false,
			value: orbitsSearched.reduce((a, b) => a.value + b.value)
		}
	} else {
		return { inc: false, value: 0 }
	}
}

const contestResponse = input => {
	const orbits = input.map(line => line.split(')'))

	const root = createTree(orbits)
	const totalOrbits = setDepth(root, 0)
	const moves = getLengthBetween(root, ORIGIN, DESTINATION, 0)

	return moves.value
}

module.exports = contestResponse