const Crypto = require('crypto')

const regex = /^[0]{6}[a-zA-Z0-9]*$/

const contestResponse = input => {
	let counter = -1
	let hash

	do {
		counter++
		hash = Crypto.createHash('md5').update(input + counter).digest("hex")
	} while (!regex.test(hash))

	return counter
}

module.exports = contestResponse