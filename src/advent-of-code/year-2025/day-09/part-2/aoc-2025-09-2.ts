import { Point2D } from 'src/utils/point-2d'
import { Polygon2D } from 'src/utils/polygon-2d'
import { Rectangle2D } from 'src/utils/rectangle-2d'
import { Segment2D } from 'src/utils/segment-2d'

import { getArea, parseInput } from '../part-1/aoc-2025-09-1'

export function isRectangleFullyInPolygon(
  rectangle: Rectangle2D,
  polygon: Polygon2D,
  polygonEdges: Segment2D[],
): boolean {
  if (!rectangle.getCorners().every((corner) => polygon.contains(corner))) {
    return false
  }

  const rectEdges = rectangle.getEdges()

  for (const rectEdge of rectEdges) {
    for (const polygonEdge of polygonEdges) {
      if (rectEdge.properlyIntersects(polygonEdge)) {
        return false
      }
    }
  }

  return true
}

export const getAllAreas = (points: Point2D[]): number[] => {
  const polygon = new Polygon2D(points)
  const polygonEdges = polygon.getEdges()
  const areas: number[] = []

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const pointA = points[i]!
      const pointB = points[j]!

      if (Math.abs(pointA.x - pointB.x) < 1 || Math.abs(pointA.y - pointB.y) < 1) {
        continue
      }

      const rectangle = new Rectangle2D({
        minX: pointA.x,
        minY: pointB.y,
        maxX: pointB.x,
        maxY: pointA.y,
      })
      if (isRectangleFullyInPolygon(rectangle, polygon, polygonEdges)) {
        const area = getArea(pointA, pointB)
        areas.push(area)
      }
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
