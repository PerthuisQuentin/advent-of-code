const LINE_REGEX = /(\w+) \((\d+)\)( -> ([\w, ]+))?/

const buildTowersMap = parsedLines => {
	const towersMap = new Map()
	parsedLines.forEach(line => {
		towersMap.set(line.name, line)
	})
	parsedLines.forEach(line => {
		line.childs.forEach(child => {
			towersMap.get(child).parent = line.name
		})
	})
	return towersMap
}

const contestResponse = input => {
	const parsedLines = input
		.map(line => {
			const matches = line.match(LINE_REGEX)
			const tower = {
				name: matches[1],
				childs: []
			}
			if (matches[4]) tower.childs = matches[4].split(', ')
			return tower
		})

	const towersMap = buildTowersMap(parsedLines)

	let root = towersMap.get(parsedLines[0].name)
	while(root.parent) {
		root = towersMap.get(root.parent)
	}

	return root.name
}

module.exports = contestResponse