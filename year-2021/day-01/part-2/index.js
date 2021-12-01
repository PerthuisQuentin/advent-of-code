const WINDOW_SCALE = 3

const getSmoothedValue = (list, index, windowScale) => {
	const offset = Math.floor(windowScale / 2)
	const values = list.slice(index - offset, index + offset + 1)

	return values.length === windowScale
		? values.reduce((a, b) => a + b)
		: undefined
}

const contestResponse = input => {
	return input
		.map(Number)
		.reduce((totalIncrements, currentValue, index, list) => {
			const previousSmootedValue = getSmoothedValue(list, index - 1, WINDOW_SCALE)
			const nextSmootedValue = getSmoothedValue(list, index, WINDOW_SCALE)

			if (previousSmootedValue === undefined || nextSmootedValue === undefined) return totalIncrements

			return nextSmootedValue > previousSmootedValue
				? totalIncrements + 1
				: totalIncrements
		}, 0)
}

module.exports = contestResponse