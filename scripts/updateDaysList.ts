import Fs from 'fs'

import { getExampleFilesPaths, getPaths, getYearPaths } from './utils/paths'
import { askYear } from './utils/prompts'

const run = async (): Promise<void> => {
  const { year } = await askYear()
  const yearPaths = getYearPaths(year)
  const filesPaths = getExampleFilesPaths()

  // Get base content
  const readmeHeaderContent = Fs.readFileSync(filesPaths.readmePath, 'utf-8').replace(
    '${year}',
    year,
  )

  // Generate days list
  const days: string[] = []

  for (let day = 1; day <= 25; day++) {
    const paths = getPaths(year, day.toString())
    let line = `#${day.toString().padEnd(2, ' ')} | `

    line += Fs.existsSync(paths.code1Path)
      ? `[Part 1](.${paths.code1Path.replace(paths.yearPath, '')})`
      : 'Soon™                           '
    line += ' - '
    line += Fs.existsSync(paths.code2Path)
      ? `[Part 2](.${paths.code2Path.replace(paths.yearPath, '')})`
      : 'Soon™'

    days.push(line)
  }

  // Write to README
  const readmeContent = [readmeHeaderContent, ...days].join('\n')
  Fs.writeFileSync(yearPaths.readmePath, readmeContent)

  console.log('Done ! 🎉')
}

run().catch(console.error)
