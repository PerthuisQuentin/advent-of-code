export class Point2D {
  public x: number
  public y: number

  constructor({ x, y }: { x: number; y: number }) {
    this.x = x
    this.y = y
  }

  public clone(): Point2D {
    return new Point2D({ x: this.x, y: this.y })
  }

  public add(point: Point2D): Point2D {
    return new Point2D({ x: this.x + point.x, y: this.y + point.y })
  }

  public multiply(factor: number): Point2D {
    return new Point2D({ x: this.x * factor, y: this.y * factor })
  }
}
