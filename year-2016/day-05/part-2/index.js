const Crypto = require('crypto')

const contestResponse = input => {
	const id = input[0]

	let password = ['_', '_', '_', '_', '_', '_', '_', '_']
	let counter = -1
	let hash

	do {
		do {
			counter++
			hash = Crypto.createHash('md5').update(id + counter).digest("hex")
		} while (!hash.startsWith('00000'))

		const position = hash[5]
		const value = hash[6]

		if (!isNaN(Number(position)) && position < 8 && password[position] === '_') {
			password[position] = value
		}

	} while(password.indexOf('_') !== -1)

	return password.join('')
}

module.exports = contestResponse