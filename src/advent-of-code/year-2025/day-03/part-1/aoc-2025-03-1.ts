export const ACTIVABLE_BATTERIES = 2

const getMaxVoltageReccursive = (
  batteries: string,
  index: number,
  remaining: number,
  memo: Map<string, number>,
): number => {
  const key = `${index}-${remaining}`
  if (memo.has(key)) return memo.get(key)!

  if (remaining === 0) return 0
  if (index >= batteries.length) return -Infinity

  const take =
    parseInt(batteries[index]!, 10) * Math.pow(10, remaining - 1) +
    getMaxVoltageReccursive(batteries, index + 1, remaining - 1, memo)

  const skip = getMaxVoltageReccursive(batteries, index + 1, remaining, memo)

  const result = Math.max(take, skip)
  memo.set(key, result)
  return result
}

export const getMaxVoltage = (batteries: string, maxEnabledBatteries: number): number => {
  return getMaxVoltageReccursive(batteries, 0, maxEnabledBatteries, new Map())
}

export const getSumOfMaxVoltages = (
  batteriesLines: string[],
  maxEnabledBatteries: number,
): number => {
  return batteriesLines.reduce(
    (sum, batteries) => sum + getMaxVoltage(batteries, maxEnabledBatteries),
    0,
  )
}

export const getResponse = (input: string[]): string => {
  return getSumOfMaxVoltages(input, ACTIVABLE_BATTERIES).toString()
}
