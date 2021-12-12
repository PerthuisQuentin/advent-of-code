const START = 'start'
const END = 'end'

const buildCavesMap = input => {
	const cavesMap = new Map()

	input
		.map(line => {
			const [a, b] = line.split('-')
			return [
				{
					name: a,
					isBig: a.toUpperCase() === a
				},
				{
					name: b,
					isBig: b.toUpperCase() === b
				}
			]
		})
		.forEach(caves => {
			const [caveA, caveB] = caves
			if (!cavesMap.has(caveA.name)) cavesMap.set(caveA.name, [])
			if (!cavesMap.has(caveB.name)) cavesMap.set(caveB.name, [])
			cavesMap.get(caveA.name).push(caveB)
			cavesMap.get(caveB.name).push(caveA)
		})

	return cavesMap
}

const explorePaths = (cavesMap, paths, currentPath) => {
	const currentCave = currentPath[currentPath.length - 1]

	if (currentCave.name === END) {
		paths.push(currentPath)
		return
	}

	cavesMap
		.get(currentCave.name)
		.filter(cave => {
			if (cave.isBig) return true
			return !currentPath.find(searchedCave => searchedCave.name === cave.name)
		})
		.forEach(cave => {
			const newPath = [...currentPath, cave]
			explorePaths(cavesMap, paths, newPath)
		})
}

const contestResponse = input => {
	const cavesMap = buildCavesMap(input)

	const paths = []

	explorePaths(cavesMap, paths, [{
		name: START,
		isBig: false
	}])

	return paths.length
}

module.exports = contestResponse