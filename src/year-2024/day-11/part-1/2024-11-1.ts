const BLINKS = 25

export type StonesByNumber = Map<number, number>

export class BlinkingStones {
  public stonesByNumber: StonesByNumber

  constructor(stones: number[] = []) {
    this.stonesByNumber = new Map()
    stones.forEach((stone) => this.addStone(this.stonesByNumber, stone, 1))
  }

  addStone(stonesByNumber: StonesByNumber, value: number, amount: number): void {
    if (!stonesByNumber.has(value)) stonesByNumber.set(value, 0)
    stonesByNumber.set(value, stonesByNumber.get(value)! + amount)
  }

  blink(): void {
    const newStonesByNumber = new Map<number, number>()

    this.stonesByNumber.forEach((value, key) => {
      if (key === 0) {
        this.addStone(newStonesByNumber, 1, value)
        return
      }

      const stringNumber = key.toString()
      if (stringNumber.length % 2 === 0) {
        const left = stringNumber.slice(0, stringNumber.length / 2)
        const right = stringNumber.slice(stringNumber.length / 2)
        this.addStone(newStonesByNumber, Number(left), value)
        this.addStone(newStonesByNumber, Number(right), value)
      } else {
        this.addStone(newStonesByNumber, key * 2024, value)
      }
    })

    this.stonesByNumber = newStonesByNumber
  }

  count(): number {
    let count = 0
    this.stonesByNumber.forEach((value) => (count += value))
    return count
  }
}

export const parseInput = (input: string): number[] => input.split(' ').map(Number)

export const getResponse = (input: string[]): string => {
  const stones = parseInput(input[0]!)
  const blinkingStones = new BlinkingStones(stones)

  for (let i = 0; i < BLINKS; i++) {
    blinkingStones.blink()
  }

  return blinkingStones.count().toString()
}
