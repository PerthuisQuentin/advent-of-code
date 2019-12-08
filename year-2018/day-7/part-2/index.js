function allDone(conditions) {
	for (let i in conditions) {
		if (!conditions[i].done) return false
	}
	return true
}

function getAvailableTasks(conditions) {
	let free = []
	for (let i in conditions) {
		if (conditions[i].need.length === 0 && !conditions[i].done && !conditions[i].progress) free.push(i)
	}
	return free.sort()
}

function endTask(conditions, task) {
	conditions[task].progress = false
	conditions[task].done = true
	for (let i in conditions) {
		if (conditions[i].need.length > 0) {
			const index = conditions[i].need.indexOf(task)
			if (index !== -1) conditions[i].need.splice(index, 1)
		}
	}

}

const contestResponse = input => {
	const workers = Number(input[0])
	const addTime = Number(input[1])
	const conditions = {}

	input.slice(2).forEach(line => {
		const split = line.split(' ')
		const needed = split[1]
		const step = split[7]

		if (!conditions[needed]) conditions[needed] = { done: false, progress: false, need: [], time: needed.charCodeAt(0) - 64 + addTime }

		if (!conditions[step]) conditions[step] = { done: false, progress: false, need: [needed], time: step.charCodeAt(0) - 64 + addTime}
		else conditions[step].need.push(needed)
	})

	for (let i in conditions) {
		conditions[i].need.sort()
	}

	const works = []
	let time = 0

	while (!allDone(conditions)) {
		for (let i = 0; i < workers; i++) {
			if (!works[i]) {
				const availables = getAvailableTasks(conditions)
				if (availables.length > 0) {
					works[i] = availables[0]
					conditions[availables[0]].progress = true
				}
			}
		}
	
		for (let i in works) {
			if (!works[i]) continue
			conditions[works[i]].time--
			if (conditions[works[i]].time === 0) {
				endTask(conditions, works[i])
				works[i] = undefined
			}
		}

		time++
	}

	return time.toString()
}

module.exports = contestResponse