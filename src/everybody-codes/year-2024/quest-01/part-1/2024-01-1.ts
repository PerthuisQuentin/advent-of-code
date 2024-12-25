import { sum } from 'src/utils/array'

export enum Monster {
  AncientAnt = 'A',
  BadassBeetle = 'B',
  CreepyCockroach = 'C',
  DiabolicalDragonfly = 'D',
  Nothing = 'x',
}

export const POTIONS_BY_MONSTER: Record<Monster, number> = {
  [Monster.Nothing]: 0,
  [Monster.AncientAnt]: 0,
  [Monster.BadassBeetle]: 1,
  [Monster.CreepyCockroach]: 3,
  [Monster.DiabolicalDragonfly]: 5,
}

export const getResponse = (input: string[]): string => {
  const monters: Monster[] = input[0]!.split('') as Monster[]

  return sum(monters.map((monster) => POTIONS_BY_MONSTER[monster])).toString()
}
