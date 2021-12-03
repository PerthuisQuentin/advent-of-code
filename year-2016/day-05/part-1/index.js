const Crypto = require('crypto')

const contestResponse = input => {
	const id = input[0]

	let password = ''
	let counter = -1
	let hash

	for (let i = 0; i < 8; i++) {
		do {
			counter++
			hash = Crypto.createHash('md5').update(id + counter).digest("hex")
		} while (!hash.startsWith('00000'))

		password += hash[5]
	}

	return password
}

module.exports = contestResponse