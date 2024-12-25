import inquirer from 'inquirer'

import { ChallengeName } from './challenge'

const challengeQuestion: Parameters<typeof inquirer.prompt>[0] = {
  type: 'list',
  name: 'challenge',
  message: 'Which challenge ?',
  default: () => 0,
  choices: [ChallengeName.AdventOfCode, ChallengeName.EverybodyCodes],
}

export const askChallenge = async (): Promise<ChallengeName> =>
  (await inquirer.prompt([challengeQuestion])).challenge as ChallengeName
