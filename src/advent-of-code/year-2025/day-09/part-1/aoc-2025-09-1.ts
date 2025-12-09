import { Point2D } from 'src/utils/point-2d'

export const parseInput = (input: string[]): Point2D[] => {
  return input.map((line) => {
    const [x, y] = line.split(',').map(Number)
    return new Point2D({ x: x!, y: y! })
  })
}

export const getArea = (pointA: Point2D, pointB: Point2D): number => {
  const width = Math.abs(pointA.x - pointB.x) + 1
  const height = Math.abs(pointA.y - pointB.y) + 1
  return width * height
}

export const getAllAreas = (points: Point2D[]): number[] => {
  const areas: number[] = []

  for (let i = 0; i < points.length; i++) {
    for (let j = i; j < points.length; j++) {
      const area = getArea(points[i]!, points[j]!)
      areas.push(area)
    }
  }

  return areas
}

export const getResponse = (input: string[]): string => {
  const points = parseInput(input)

  const areas = getAllAreas(points)
  const max = areas.reduce((max, value) => (value > max ? value : max), 0)

  return max.toString()
}
