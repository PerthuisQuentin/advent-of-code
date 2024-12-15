export const isRound = (n: number): boolean => n % 1 === 0

export const roundToPrecision = (num: number, precision: number = 10): number => {
  const factor = Math.pow(10, precision)
  return Math.round(num * factor) / factor
}
