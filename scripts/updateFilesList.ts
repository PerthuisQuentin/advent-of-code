import Fs from 'fs'

import { getExampleFilesPaths } from './utils/example-paths'
import { identifyChallenge } from './utils/get-challenge'

const run = async (): Promise<void> => {
  const challenge = await identifyChallenge()

  const { edition } = await challenge.askEdition()
  const { editionPath, readmePath } = challenge.getEditionPaths(edition)
  const { readmePath: readmeExamplePath } = getExampleFilesPaths()

  // Get base content
  const readmeHeaderContent = Fs.readFileSync(readmeExamplePath, 'utf-8')
    .replace('${edition}', edition)
    .replace('${challenge}', challenge.name)
    .replace('${exercice}', challenge.exerciceName)

  // Generate exercices list
  const exercices: string[] = []

  for (let exercice = 1; exercice <= challenge.exerciceAmount; exercice++) {
    let line = `#${exercice.toString().padEnd(2, ' ')} | `

    for (let part = 1; part <= challenge.partAmount; part++) {
      const { codePath } = challenge.getPartPaths(edition, exercice.toString(), part.toString())

      line += Fs.existsSync(codePath) ? `[Part 1](.${codePath.replace(editionPath, '')})` : 'Soon™'
      if (part < challenge.partAmount) line += ' - '
    }

    exercices.push(line)
  }

  // Write to README
  const readmeContent = [readmeHeaderContent, ...exercices].join('\n')
  Fs.writeFileSync(readmePath, readmeContent)

  console.log('Done ! 🎉')
}

run().catch(console.error)
