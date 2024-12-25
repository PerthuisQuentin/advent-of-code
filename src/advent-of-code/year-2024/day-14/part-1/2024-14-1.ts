import { multiply } from 'src/utils/array'
import { Point2D } from 'src/utils/point-2d'

export type Robot = {
  position: Point2D
  velocity: Point2D
}

const ROBOT_REGEX = /p=([-\d]+),([-\d]+) v=([-\d]+),([-\d]+)/

export const parseInput = (input: string[]): { size: Point2D; robots: Robot[] } => {
  const rawSize = input[0]!.split(',').map(Number)
  const size = new Point2D({ x: rawSize[0]!, y: rawSize[1]! })

  const robots = input.slice(1).map((line) => {
    const [, x, y, vx, vy] = line.match(ROBOT_REGEX)!

    return {
      position: new Point2D({ x: Number(x), y: Number(y) }),
      velocity: new Point2D({ x: Number(vx), y: Number(vy) }),
    }
  })

  return { size, robots }
}

export const moveRobot = (size: Point2D, robot: Robot, times: number = 1): Robot => {
  const position = robot.position.add(robot.velocity.multiply(times))
  const velocity = robot.velocity

  if (position.x < 0) position.x = size.x + (position.x % size.x)
  if (position.y < 0) position.y = size.y + (position.y % size.y)
  if (position.x >= size.x) position.x = position.x % size.x
  if (position.y >= size.y) position.y = position.y % size.y

  return { position, velocity }
}

export const moveRobots = (size: Point2D, robots: Robot[], times: number = 1): Robot[] => {
  return robots.map((robot) => moveRobot(size, robot, times))
}

export const countRobotsInQuadrant = (size: Point2D, robots: Robot[]): number[] => {
  const middleX = Math.floor(size.x / 2)
  const middleY = Math.floor(size.y / 2)

  const topLeftRobots = robots.filter(
    (robot) => robot.position.x < middleX && robot.position.y < middleY,
  ).length
  const topRightRobots = robots.filter(
    (robot) => robot.position.x > middleX && robot.position.y < middleY,
  ).length
  const bottomLeftRobots = robots.filter(
    (robot) => robot.position.x < middleX && robot.position.y > middleY,
  ).length
  const bottomRightRobots = robots.filter(
    (robot) => robot.position.x > middleX && robot.position.y > middleY,
  ).length

  return [topLeftRobots, topRightRobots, bottomLeftRobots, bottomRightRobots]
}

export const getResponse = (input: string[]): string => {
  const { size, robots } = parseInput(input)
  const robotsAfter100Seconds = moveRobots(size, robots, 100)
  const robotsInQuadrant = countRobotsInQuadrant(size, robotsAfter100Seconds)

  return multiply(robotsInQuadrant).toString()
}
