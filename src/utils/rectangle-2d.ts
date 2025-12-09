import { Point2D } from './point-2d'
import { Segment2D } from './segment-2d'

export class Rectangle2D {
  public minX: number
  public minY: number
  public maxX: number
  public maxY: number

  //            maxY
  //        x -------- x
  //        |          |
  //   minX |          | maxX
  //        |          |
  //        x -------- x
  //            minY

  constructor({
    minX,
    minY,
    maxX,
    maxY,
  }: {
    minX: number
    minY: number
    maxX: number
    maxY: number
  }) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

  clone(): Rectangle2D {
    return new Rectangle2D({ minX: this.minX, minY: this.minY, maxX: this.maxX, maxY: this.maxY })
  }

  public contains(point2D: Point2D): boolean {
    return (
      this.minX <= point2D.x &&
      point2D.x <= this.maxX &&
      this.minY <= point2D.y &&
      point2D.y <= this.maxY
    )
  }

  public getCorners(): Point2D[] {
    return [
      new Point2D({ x: this.minX, y: this.minY }),
      new Point2D({ x: this.maxX, y: this.minY }),
      new Point2D({ x: this.maxX, y: this.maxY }),
      new Point2D({ x: this.minX, y: this.maxY }),
    ]
  }

  public getEdges(): Segment2D[] {
    const topLeft = new Point2D({ x: this.minX, y: this.maxY })
    const topRight = new Point2D({ x: this.maxX, y: this.maxY })
    const bottomLeft = new Point2D({ x: this.minX, y: this.minY })
    const bottomRight = new Point2D({ x: this.maxX, y: this.minY })

    return [
      new Segment2D({ start: topLeft, end: topRight }), // top
      new Segment2D({ start: topRight, end: bottomRight }), // right
      new Segment2D({ start: bottomRight, end: bottomLeft }), // bottom
      new Segment2D({ start: bottomLeft, end: topLeft }), // left
    ]
  }
}
