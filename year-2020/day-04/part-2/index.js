const PASSEPORT_KEYS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const EYES_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const FOUR_DIGIT_REGEX = /^[0-9]{4}$/
const HEIGHT_REGEX = /^[0-9]+(?:cm|in)$/
const HAIR_COLOR_REGEX = /^#[0-9a-f]{6}$/
const PASSPORT_ID_REGEX = /^[0-9]{9}$/

const isPassportValid = passeport => {
	const byr = Number(passeport.byr)
	if (!FOUR_DIGIT_REGEX.test(passeport.byr)) return false
	if (byr < 1920 || byr > 2002) return false

	const iyr = Number(passeport.iyr)
	if (!FOUR_DIGIT_REGEX.test(passeport.iyr)) return false
	if (iyr < 2010 || iyr > 2020) return false

	const eyr = Number(passeport.eyr)
	if (!FOUR_DIGIT_REGEX.test(passeport.eyr)) return false
	if (eyr < 2020 || eyr > 2030) return false

	if (!HEIGHT_REGEX.test(passeport.hgt)) return false
	const hgtUnit = passeport.hgt.slice(-2)
	const hgt = Number(passeport.hgt.slice(0, -2))
	if (hgtUnit === 'cm' && (hgt < 150 || hgt > 193)) return false
	if (hgtUnit === 'in' && (hgt < 59 || hgt > 76)) return false

	if (!HAIR_COLOR_REGEX.test(passeport.hcl)) return false

	if (!EYES_COLORS.includes(passeport.ecl)) return false

	if (!PASSPORT_ID_REGEX.test(passeport.pid)) return false

	return true
}

const contestResponse = input => {
	const passeports = input
		.join(' ')
		.split('  ')
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
		.filter(isPassportValid)

	return validPassports.length
}

module.exports = contestResponse