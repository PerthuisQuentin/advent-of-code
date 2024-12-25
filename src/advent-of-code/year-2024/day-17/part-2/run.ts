import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { parseInput } from '../part-1/aoc-2024-17-1'

const { input } = readTestFile(Path.join(__dirname, './test-final.txt'))

const device = parseInput(input)

// device.setRegisterA(47006051)
// const result = device.run()
// console.log(result)

const run = async (): Promise<void> => {
  // const index = 0
  // let i = 0
  // let inc = 1

  // while (index < device.getProgram().length) {
  //   // const instruction = device.getProgram()[device.getProgram().length - 1 - index]



  //   // const copyDevice = device.clone()
  //   // copyDevice.setRegisterA(i)
  //   // const result = copyDevice.run()
  //   // console.log(i, result)

  //   // i += inc

  //   // if (i > 100) break
  //   break
  // }

  let i = 0
  while (i < 100) {
    const copyDevice = device.clone()
    copyDevice.setRegisterA(i)
    const result = copyDevice.run()
    console.log(i.toString().padStart(4, ' '), i.toString(2).padStart(12, ' '), result)

    i++
  }
}

run()
