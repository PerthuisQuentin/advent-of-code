const BEGINS_SHIFT = 0
const FALLS_ASLEEP = 1
const WAKES_UP = 2

const contestResponse = input => {
	const guards = {}
	let lastGuard

	const logs = input.map(line => {
		const data = {}
		const splittedLine = line.split(' ')
		const date = splittedLine[0].replace('[', '').split('-')
		const moment = splittedLine[1].replace(']', '').split(':')
		
		data.date = new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]), Number(moment[0]) + 1, Number(moment[1]))
		switch (splittedLine[2]) {
			case 'Guard':
				data.type = BEGINS_SHIFT
				data.id = Number(splittedLine[3].replace('#', ''))
				break
			case 'falls':
				data.type = FALLS_ASLEEP
				break
			case 'wakes':
				data.type = WAKES_UP
				break
		}

		return data
	})
	.sort((a, b) => a.date.getTime() - b.date.getTime())

	logs.forEach(log => {
		switch(log.type) {
			case BEGINS_SHIFT:
				lastGuard = log.id
				if (!guards[log.id]) guards[log.id] = { minutes: new Array(60).fill(0, 0, 60) }
				break
			case FALLS_ASLEEP:
				log.id = lastGuard
				guards[log.id].sleepSince = log.date.getMinutes()
				break
			case WAKES_UP:
				log.id = lastGuard
				for (let i = guards[log.id].sleepSince; i < log.date.getMinutes(); i++) {
					guards[log.id].minutes[i]++
				}
				break
		}
	})

	let mostSleepyGuyId
	let mostSleepyMinute
	let mostSleepyMinuteValue = 0

	for (let id in guards) {
		for (let minute in guards[id].minutes) {
			const value = guards[id].minutes[minute]
			if (value > mostSleepyMinuteValue) {
				mostSleepyGuyId = id
				mostSleepyMinute = minute
				mostSleepyMinuteValue = value
			}
		}
	}

	return (mostSleepyGuyId * mostSleepyMinute).toString()
}

module.exports = contestResponse