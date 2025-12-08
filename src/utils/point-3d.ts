export class Point3D {
  public x: number
  public y: number
  public z: number

  constructor({ x, y, z }: { x: number; y: number; z: number }) {
    this.x = x
    this.y = y
    this.z = z
  }

  get hash(): string {
    return `${this.x}/${this.y}/${this.z}`
  }

  static fromHash(hash: string): Point3D {
    const [x, y, z] = hash.split('/').map(Number)
    return new Point3D({ x: x!, y: y!, z: z! })
  }

  public clone(): Point3D {
    return new Point3D({ x: this.x, y: this.y, z: this.z })
  }

  public isSame(point: Point3D): boolean {
    return this.x === point.x && this.y === point.y && this.z === point.z
  }

  public getEuclideanDistance(point: Point3D): number {
    const dx = this.x - point.x
    const dy = this.y - point.y
    const dz = this.z - point.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
}
