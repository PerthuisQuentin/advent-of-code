import inquirer from 'inquirer'

import { EditionAndExerciceResponse, EditionResponse } from '../challenge'

const YEAR_REGEX = /^\d{4}$/
const QUEST_REGEX = /^(0?[1-9]|1\d|20)$/

const yearQuestion: Parameters<typeof inquirer.prompt>[0] = {
  type: 'input',
  name: 'year',
  message: 'Which year ?',
  default: () => new Date().getFullYear().toString(),
  validate: (input: string) => {
    if (!YEAR_REGEX.test(input)) return 'Invalid year format, must be a 4-digit number'
    return true
  },
}

const questQuestion: Parameters<typeof inquirer.prompt>[0] = {
  type: 'input',
  name: 'quest',
  message: 'Which quest ?',
  default: () => new Date().getDate().toString(),
  validate: (input: string) => {
    if (!QUEST_REGEX.test(input)) return 'Invalid quest format, must be between 1 and 20'
    return true
  },
}

export const askYear = async (): Promise<EditionResponse> => {
  const response = await inquirer.prompt([yearQuestion])
  return { edition: response.year }
}

export const askYearAndQuest = async (): Promise<EditionAndExerciceResponse> => {
  const responses = await inquirer.prompt([yearQuestion, questQuestion])
  return { edition: responses.year, exercice: responses.quest }
}
