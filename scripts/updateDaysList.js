const Fs = require('fs')
const Path = require('path')
const argv = require('yargs').argv

const writeResults = (path, name, data) => new Promise((resolve, reject) => {
	Fs.writeFile(Path.join(path, name), data, error => {
		if (error) return reject(error)
	})
	
	resolve()
})

if (!argv.year) return console.log('Need --year parameter')

const yearFolderName = `year-${Number(argv.year)}`
const yearPath = Path.join('./', yearFolderName)

const readmeHeader = `# ${argv.year} Edition - Advent of code

Day | Parts
--- | -------------------------------------------------------------------`

const days = []

for (let d = 1; d <= 25; d++) {
    let line = `#${d.toString().padEnd(2, ' ')} | `

    const dayName = `day-${d.toString().padStart(2, '0')}`
    const dayPath = Path.join(yearPath, dayName)
    line += Fs.existsSync(Path.join(dayPath, 'part-1/index.js')) ? `[Part 1](${dayName}/part-1/index.js)` : 'Soon™                           '
    line += ' - '
    line += Fs.existsSync(Path.join(dayPath, 'part-2/index.js')) ? `[Part 2](${dayName}/part-2/index.js)` : 'Soon™'

    days.push(line)
}

const result = [readmeHeader, ...days].join('\n')

writeResults(yearPath, 'README.md', result)
	.then(() => {
		console.log('Results writed !')
	})
	.catch(console.error)