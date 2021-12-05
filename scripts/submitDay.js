// Draft, doesn't work

const Axios = require('axios')
const argv = require('yargs').argv

require('dotenv').config()

const config = {
	headers : {
		cookie: `session=${process.env.AOC_SESSION_COOKIE}`
	}
}

Axios.get(`https://adventofcode.com/${argv.year}/day/${argv.day}/input`, config)
	.then(response => {
		let splittedInput = response.data.split('\n')
		const input = splittedInput.slice(0, -1)
		const partCode = require(`../year-${argv.year}/day-${argv.day.toString().padStart(2, '0')}/part-${argv.part}/index.js`)
		const answser = partCode(input).toString()

		console.log(`Submit: ${answser}`)

		const data = {
			level: argv.part,
			answser: '451'
		}

		return Axios.post(`https://adventofcode.com/${argv.year}/day/${argv.day}/answer`, data, config)
	})
	.then(() => {
		console.log('Good !')
	})
	.catch(() => {
		console.log('Bad !')
	})