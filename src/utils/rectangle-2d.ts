import { Point2D } from './point-2d'

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
}
