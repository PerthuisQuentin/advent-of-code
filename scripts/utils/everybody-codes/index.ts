import { Challenge, ChallengeName } from '../challenge'
import { getDayPaths, getPartPaths, getYearPaths } from '../paths'

import { askYear, askYearAndQuest } from './prompts'

const CHALLENGE_FOLDER_NAME = 'everybody-codes'
const EDITION_FILE_NAME = 'year'
const EXERCICE_FILE_NAME = 'quest'
const SYMBOL = 'EC'

export const EverybodyCodes: Challenge = {
  name: ChallengeName.EverybodyCodes,
  symbol: SYMBOL,
  exerciceName: 'Quest',
  exerciceAmount: 20,
  partAmount: 3,
  askEdition: askYear,
  askEditionAndExercice: askYearAndQuest,
  getEditionPaths: getYearPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME),
  getExercicePaths: getDayPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME, EXERCICE_FILE_NAME),
  getPartPaths: getPartPaths(CHALLENGE_FOLDER_NAME, EDITION_FILE_NAME, EXERCICE_FILE_NAME, SYMBOL),
  getInput: () => Promise.resolve('data'),
}
