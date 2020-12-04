const PASSEPORT_KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const contestResponse = input => {
	const passeports = input
		.join(' ')
		.split(';')
		.map(s => s.trim())
		.map(s => s
			.split(' ')
			.map(keyValue => keyValue.split(':'))
			.reduce((passeport, keyValue) => {
				const [key, value] = keyValue
				passeport[key] = value
				return passeport
			}, {})
		)

	const validPassports = passeports
		.filter(passport => PASSEPORT_KEYS.every(key => passport.hasOwnProperty(key)))

	return validPassports.length
}

module.exports = contestResponse