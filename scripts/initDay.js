const Axios = require('axios')
const Fs = require('fs')
const Path = require('path')
const argv = require('yargs').argv

require('dotenv').config()

const writeResults = (path, name, data) => new Promise((resolve, reject) => {
	Fs.writeFile(Path.join(path, name), data, error => {
		if (error) return reject(error)
	})

	resolve()
})

if (!argv.year) return console.log('Need --year parameter')
if (!argv.day) return console.log('Need --day parameter')

const yearFolderName = `year-${Number(argv.year)}`
const dayFolderName = `day-${Number(argv.day).toString().padStart(2, '0')}`

const yearPath = Path.join('./', yearFolderName)
const dayPath = Path.join(yearPath, dayFolderName)

if (!Fs.existsSync(yearPath)) Fs.mkdirSync(yearPath)

if (Fs.existsSync(dayPath)) return console.log('Day folder already exists')

Fs.mkdirSync(dayPath)

const part1Path = Path.join(dayPath, 'part-1')
const part2Path = Path.join(dayPath, 'part-2')

Fs.mkdirSync(part1Path)
Fs.mkdirSync(part2Path)

const indesJsContent = `const contestResponse = input => {

	return
}

module.exports = contestResponse`

const test1Content = `--input--

--output--
something`

const createTestFinalContent = input => `--input--
${input}
--output--
something`

Axios.get(`https://adventofcode.com/${argv.year}/day/${argv.day}/input`, {
	headers: {
		cookie: `session=${process.env.AOC_SESSION_COOKIE}`
	}
})
	.then(response => {
		const input = response.data
		const testFinalContent = createTestFinalContent(input)

		return Promise.resolve()
			.then(writeResults(part1Path, 'index.js', indesJsContent))
			.then(writeResults(part1Path, 'test-01.txt', test1Content))
			.then(writeResults(part1Path, 'test-final.txt', testFinalContent))
			.then(writeResults(part2Path, 'index.js', indesJsContent))
			.then(writeResults(part2Path, 'test-01.txt', test1Content))
			.then(writeResults(part2Path, 'test-final.txt', testFinalContent))
			.then(() => console.log('Done !'))
	})
	.catch(console.error)
