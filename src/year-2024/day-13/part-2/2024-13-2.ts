import { sum } from 'src/utils/array'

import { getMinTokenForClawMachine, parseClawMachines } from '../part-1/2024-13-1'

export const getResponse = (input: string[]): string => {
  const clawMachines = parseClawMachines(input)

  const tokens = clawMachines
    .map((clawMachine) => ({
      aX: clawMachine.aX,
      aY: clawMachine.aY,
      bX: clawMachine.bX,
      bY: clawMachine.bY,
      prizeX: clawMachine.prizeX + 10000000000000,
      prizeY: clawMachine.prizeY + 10000000000000,
    }))
    .map(getMinTokenForClawMachine)
    .filter((token): token is number => token !== null)

  return sum(tokens).toString()
}
