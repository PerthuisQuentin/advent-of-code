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

const explorePaths = (cavesMap, paths, currentPath, caveVisitedTwice) => {
	const currentCave = currentPath[currentPath.length - 1]

	if (currentCave.name === END) {
		paths.push(currentPath)
		return
	}

	cavesMap
		.get(currentCave.name)
		.forEach(cave => {
			const newPath = [...currentPath, cave]

			if (cave.isBig) {
				explorePaths(cavesMap, paths, newPath, caveVisitedTwice)
			} else {
				const alreadyVisitedCave = currentPath.find(searchedCave => searchedCave.name === cave.name)
				if (!alreadyVisitedCave) {
					explorePaths(cavesMap, paths, newPath, caveVisitedTwice)
				} else if (!caveVisitedTwice && cave.name !== START) {
					explorePaths(cavesMap, paths, newPath, true)
				}
			}
		})
}

const contestResponse = input => {
	const cavesMap = buildCavesMap(input)

	const paths = []

	explorePaths(cavesMap, paths, [{
		name: START,
		isBig: false
	}], false)

	return paths.length
}

module.exports = contestResponse