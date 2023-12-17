const DASH = '-'
const EQUAL = '='

const parseStep = step => {
	const isDash = step.includes(DASH)
	const [label, value] = isDash ? step.split(DASH) : step.split(EQUAL)

	return {
		name: step,
		label,
		sign: isDash ? DASH : EQUAL,
		value: Number(value)
	}
}

const parseSteps = input => input[0].split(',').map(parseStep)

const hash = step => {
	let count = 0

	for (let i = 0; i < step.length; i++) {
		count += step.charCodeAt(i)
		count *= 17
		count %= 256
	}

	return count
}

const removeLens = (box, step) => {
	if (!box) return []

	const index = box.findIndex((lens) => lens.label === step.label)
	if (index === -1) return box

	return [
		...box.slice(0, index),
		...box.slice(index + 1)
	]
}

const putLens = (box, step) => {
	const lens = { label: step.label, focal: step.value }
	if (!box) return [lens]

	const index = box.findIndex((lens) => lens.label === step.label)
	if (index === -1) return [...box, lens]

	return [
		...box.slice(0, index),
		lens,
		...box.slice(index + 1)
	]
}

const performSteps = steps => {
	const boxes = new Map()

	steps.forEach(step => {
		const { label, sign } = step
		const boxNumber = hash(label)

		const box = boxes.get(boxNumber)
		const newBox = sign === DASH ? removeLens(box, step) : putLens(box, step)
		boxes.set(boxNumber, newBox)
	})

	return boxes
}

const getBoxFocusPower = (boxNumber, box) => box.map((lens, index) => lens.focal * (index + 1) * (boxNumber + 1))

const getFocusPower = boxes => {
	return Array.from(boxes.entries())
		.map(([boxNumber, box]) => getBoxFocusPower(boxNumber, box))
		.flat()
		.reduce((sum, value) => sum + value, 0)
}

const contestResponse = input => {
	const steps = parseSteps(input)
	const boxes = performSteps(steps)
	const focusPower = getFocusPower(boxes)

	return focusPower
}

module.exports = contestResponse