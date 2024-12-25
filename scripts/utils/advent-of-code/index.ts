import { Challenge, ChallengeName } from '../challenge'
import { getDayPaths, getPartPaths, getYearPaths } from '../paths'

import { getDayInput } from './api'
import { askYear, askYearAndDay } from './prompts'

const CHALLENGE_FOLDER_NAME = 'advent-of-code'
const EDITION_FILE_NAME = 'year'
const EXERCICE_FILE_NAME = 'day'
const SYMBOL = 'AOC'

export const AdventOfCode: Challenge = {
  name: ChallengeName.AdventOfCode,
  symbol: SYMBOL,
  exerciceName: 'Day',
  exerciceAmount: 25,
  partAmount: 2,
  askEdition: askYear,
  askEditionAndExercice: askYearAndDay,
  getEditionPaths: getYearPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME),
  getExercicePaths: getDayPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME, EXERCICE_FILE_NAME),
  getPartPaths: getPartPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME, EXERCICE_FILE_NAME, SYMBOL),
  getInput: getDayInput,
}
