const parseRoom = line => {
	const checksumIndex = line.indexOf('[')

	const checkssum = line.slice(checksumIndex + 1, checksumIndex + 6)
	const values = line.slice(0, checksumIndex).split('-')

	const id = Number(values[values.length - 1])
	const words = values.slice(0, values.length - 1)

	return {
		checkssum,
		id,
		words
	}
}

const rotateChar = (char, rounds) => {
	const index = char.charCodeAt(0) - 97
	const next = (index + rounds) % 26
	return String.fromCharCode(97 + next)
}

const rotateString = (value, rounds) => {
	let result = ''

	for (let i = 0; i < value.length; i++) {
		result += rotateChar(value[i], rounds)
	}

	return result
}

const decipherRoom = room => ({
	...room,
	name: room.words.map(word => rotateString(word, room.id)).join('-')
})

const contestResponse = input => {
	const rooms = input.map(parseRoom).map(decipherRoom)

	const storageRoom = rooms.find(room => room.name === 'northpole-object-storage')

	return storageRoom.id
}

module.exports = contestResponse