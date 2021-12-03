const parseRoom = line => {
	const checksumIndex = line.indexOf('[')

	const checksum = line.slice(checksumIndex + 1, checksumIndex + 6)
	const values = line.slice(0, checksumIndex).split('-')

	const id = Number(values[values.length - 1])
	const words = values.slice(0, values.length - 1)

	return {
		checksum,
		id,
		words
	}
}

const veryfyRoom = room => {
	const occurences = {}

	room.words.forEach(word => {
		word.split('').forEach(letter => {
			if (!occurences[letter]) occurences[letter] = 0
			occurences[letter]++
		})
	})

	const sortedOccurences = Object.entries(occurences)
		.sort((occurenceA, occurenceB) => {
			const [letterA, quantityA] = occurenceA
			const [letterB, quantityB] = occurenceB

			if (quantityA === quantityB) {
				return letterA.localeCompare(letterB)
			} else {
				return quantityB - quantityA
			}
		})

	const checksum = sortedOccurences
		.slice(0, 5)
		.map(x => x[0])
		.join('')

	return checksum === room.checksum
}

const contestResponse = input => {
	const rooms = input.map(parseRoom)
	const validRooms = rooms.filter(veryfyRoom)
	const sum = validRooms.reduce((total, room) => total + room.id, 0)

	return sum
}

module.exports = contestResponse