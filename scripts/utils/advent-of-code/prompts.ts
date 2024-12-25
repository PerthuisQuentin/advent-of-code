import inquirer from 'inquirer'

import { EditionAndExerciceResponse, EditionResponse } from '../challenge'

const YEAR_REGEX = /^\d{4}$/
const DAY_REGEX = /^(0?[1-9]|1\d|2[0-5])$/

const yearQuestion: Parameters<typeof inquirer.prompt>[0] = {
  type: 'input',
  name: 'year',
  message: "Which year's challenge ?",
  default: () => new Date().getFullYear().toString(),
  validate: (input: string) => {
    if (!YEAR_REGEX.test(input)) return 'Invalid year format, must be a 4-digit number'
    return true
  },
}

const dayQuestion: Parameters<typeof inquirer.prompt>[0] = {
  type: 'input',
  name: 'day',
  message: "Which day's challenge ?",
  default: () => new Date().getDate().toString(),
  validate: (input: string) => {
    if (!DAY_REGEX.test(input)) return 'Invalid day format, must be between 1 and 25'
    return true
  },
}

export const askYear = async (): Promise<EditionResponse> => {
  const response = await inquirer.prompt([yearQuestion])
  return { edition: response.year }
}

export const askYearAndDay = async (): Promise<EditionAndExerciceResponse> => {
  const responses = await inquirer.prompt([yearQuestion, dayQuestion])
  return { edition: responses.year, exercice: responses.day }
}
