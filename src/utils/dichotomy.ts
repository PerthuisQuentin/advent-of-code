/**
 * Returns the first element that satisfies the provided testing function using dichotomy
 */
export const findIndexByDichotomy = <T>(
  elements: T[],
  isValid: (element: T, index: number, array: T[]) => boolean,
): number => {
  let left = 0
  let right = elements.length - 1

  while (left < right) {
    const mid = Math.floor((left + right) / 2)

    if (isValid(elements[mid]!, mid, elements)) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return left
}
