import inquirer from 'inquirer'

const YEAR_REGEX = /^\d{4}$/
const DAY_REGEX = /^(0?[1-9]|[12][0-9]|3[01])$/

const yearQuestion: Parameters<typeof inquirer.prompt>[0] = {
  type: 'input',
  name: 'year',
  message: "Which year's challenge ?",
  default: () => new Date().getFullYear().toString(),
  validate: (input: string) => {
    if (!YEAR_REGEX.test(input)) return 'Invalid year format'
    return true
  },
}

const dayQuestion: Parameters<typeof inquirer.prompt>[0] = {
  type: 'input',
  name: 'day',
  message: "Which day's challenge ?",
  default: () => new Date().getDate().toString(),
  validate: (input: string) => {
    if (!DAY_REGEX.test(input)) return 'Invalid day format'
    return true
  },
}

export type YearAndDay = { year: string; day: string }
export const askYearAndDay = async (): Promise<YearAndDay> =>
  (await inquirer.prompt([yearQuestion, dayQuestion])) as YearAndDay

export type Year = { year: string }
export const askYear = async (): Promise<Year> => (await inquirer.prompt([yearQuestion])) as Year
