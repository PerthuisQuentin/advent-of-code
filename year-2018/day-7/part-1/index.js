const contestResponse = input => {
	const conditions = {}

	input.forEach(line => {
		const split = line.split(' ')
		const needed = split[1]
		const step = split[7]

		if (!conditions[needed]) conditions[needed] = []

		if (!conditions[step]) conditions[step] = [needed]
		else conditions[step].push(needed)
	})

	for (let i in conditions) {
		conditions[i].sort()
	}

	let order = ''
	let free

	do {
		free = []
		for (let i in conditions) {
			if (conditions[i] && conditions[i].length === 0) free.push(i)
		}
		if (free.length === 0) break;
		free.sort()
		order += free[0]
		conditions[free[0]] = false
		for (let i in conditions) {
			if (conditions[i] && conditions[i].length > 0) {
				const index = conditions[i].indexOf(free[0])
				if (index !== -1) conditions[i].splice(index, 1)
			}
		}
	} while (free.length !== 0)

	return order
}

module.exports = contestResponse