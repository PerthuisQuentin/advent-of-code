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

const contestResponse = input => {
	const orbits = input.map(line => line.split(')'))

	const root = createTree(orbits)
	const totalOrbits = setDepth(root, 0)

	return totalOrbits
}

module.exports = contestResponse