import { stackBy, sum } from 'src/utils/array'

import { Monster, POTIONS_BY_MONSTER } from '../part-1/ec-2024-01-1'

export const getResponse = (input: string[]): string => {
  const monsterCouples: Monster[][] = stackBy(input[0]!.split(''), 2) as Monster[][]

  return sum(
    monsterCouples.map(([monster1, monster2]) => {
      if (monster1 === Monster.Nothing) return POTIONS_BY_MONSTER[monster2!]
      if (monster2 === Monster.Nothing) return POTIONS_BY_MONSTER[monster1!]

      return POTIONS_BY_MONSTER[monster1!] + POTIONS_BY_MONSTER[monster2!] + 2
    }),
  ).toString()
}
