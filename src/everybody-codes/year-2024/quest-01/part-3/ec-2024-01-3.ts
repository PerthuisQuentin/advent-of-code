import { stackBy, sum } from 'src/utils/array'

import { Monster, POTIONS_BY_MONSTER } from '../part-1/ec-2024-01-1'

export const getResponse = (input: string[]): string => {
  const monsterCouples: Monster[][] = stackBy(input[0]!.split(''), 3) as Monster[][]

  return sum(
    monsterCouples.map((monsters) => {
      const realMonsters = monsters.filter((monster) => monster !== Monster.Nothing)
      if (realMonsters.length === 0) return 0
      const groupBonus = realMonsters.length - 1
      return sum(realMonsters.map((monster) => POTIONS_BY_MONSTER[monster] + groupBonus))
    }),
  ).toString()
}
