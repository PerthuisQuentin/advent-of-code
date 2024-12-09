import Path from 'path'

import { readTestFile } from 'tests/test-files'

import { DiskSpaceType } from '../part-1/2024-09-1'

import { findFirstFreeSpaceBigEnough, getResponse, optimizeDiskSpaces } from './2024-09-2'

describe('2024-09-2', () => {
  describe('Sub methods tests', () => {
    describe('findFirstFreeSpaceBigEnough', () => {
      it('Should return the second free space', () => {
        expect(
          findFirstFreeSpaceBigEnough(
            [
              { length: 2, type: DiskSpaceType.File, fileId: 0 },
              { length: 2, type: DiskSpaceType.Free },
              { length: 3, type: DiskSpaceType.File, fileId: 1 },
              { length: 4, type: DiskSpaceType.Free },
              { length: 1, type: DiskSpaceType.File, fileId: 2 },
              { length: 6, type: DiskSpaceType.Free },
            ],
            3,
            5,
          ),
        ).toBe(3)
      })

      it('Should return the first free space', () => {
        expect(
          findFirstFreeSpaceBigEnough(
            [
              { length: 2, type: DiskSpaceType.File, fileId: 0 },
              { length: 7, type: DiskSpaceType.Free },
              { length: 3, type: DiskSpaceType.File, fileId: 1 },
              { length: 8, type: DiskSpaceType.Free },
              { length: 1, type: DiskSpaceType.File, fileId: 2 },
              { length: 2, type: DiskSpaceType.Free },
            ],
            5,
            5,
          ),
        ).toBe(1)
      })

      it('Should return not found', () => {
        expect(
          findFirstFreeSpaceBigEnough(
            [
              { length: 2, type: DiskSpaceType.File, fileId: 0 },
              { length: 2, type: DiskSpaceType.Free },
              { length: 3, type: DiskSpaceType.File, fileId: 1 },
              { length: 2, type: DiskSpaceType.Free },
              { length: 1, type: DiskSpaceType.File, fileId: 2 },
              { length: 2, type: DiskSpaceType.Free },
            ],
            3,
            5,
          ),
        ).toBe(-1)
      })

      it('Should return not found when a big enough free space exists but after the max index', () => {
        expect(
          findFirstFreeSpaceBigEnough(
            [
              { length: 2, type: DiskSpaceType.File, fileId: 0 },
              { length: 2, type: DiskSpaceType.Free },
              { length: 3, type: DiskSpaceType.File, fileId: 1 },
              { length: 2, type: DiskSpaceType.Free },
              { length: 3, type: DiskSpaceType.File, fileId: 2 },
              { length: 4, type: DiskSpaceType.Free },
              { length: 2, type: DiskSpaceType.File, fileId: 3 },
            ],
            3,
            4,
          ),
        ).toBe(-1)
      })
    })

    describe('optimizeDiskSpaces', () => {
      it('Should optimize correctly a simple example with free space of same length', () => {
        expect(
          optimizeDiskSpaces([
            { length: 2, type: DiskSpaceType.File, fileId: 0 },
            { length: 3, type: DiskSpaceType.Free },
            { length: 3, type: DiskSpaceType.File, fileId: 1 },
          ]),
        ).toEqual([
          { length: 2, type: DiskSpaceType.File, fileId: 0 },
          { length: 3, type: DiskSpaceType.File, fileId: 1 },
          { length: 3, type: DiskSpaceType.Free },
        ])
      })

      it('Should optimize correctly a simple example with a bigger free space', () => {
        expect(
          optimizeDiskSpaces([
            { length: 2, type: DiskSpaceType.File, fileId: 0 },
            { length: 5, type: DiskSpaceType.Free },
            { length: 3, type: DiskSpaceType.File, fileId: 1 },
          ]),
        ).toEqual([
          { length: 2, type: DiskSpaceType.File, fileId: 0 },
          { length: 3, type: DiskSpaceType.File, fileId: 1 },
          { length: 5, type: DiskSpaceType.Free },
        ])
      })

      it('Should optimize correctly a big example', () => {
        expect(
          optimizeDiskSpaces([
            { length: 2, type: DiskSpaceType.File, fileId: 0 },
            { length: 3, type: DiskSpaceType.Free },
            { length: 3, type: DiskSpaceType.File, fileId: 1 },
            { length: 3, type: DiskSpaceType.Free },
            { length: 1, type: DiskSpaceType.File, fileId: 2 },
            { length: 3, type: DiskSpaceType.Free },
            { length: 3, type: DiskSpaceType.File, fileId: 3 },
            { length: 1, type: DiskSpaceType.Free },
            { length: 2, type: DiskSpaceType.File, fileId: 4 },
            { length: 1, type: DiskSpaceType.Free },
            { length: 4, type: DiskSpaceType.File, fileId: 5 },
            { length: 1, type: DiskSpaceType.Free },
            { length: 4, type: DiskSpaceType.File, fileId: 6 },
            { length: 1, type: DiskSpaceType.Free },
            { length: 3, type: DiskSpaceType.File, fileId: 7 },
            { length: 1, type: DiskSpaceType.Free },
            { length: 4, type: DiskSpaceType.File, fileId: 8 },
            { length: 0, type: DiskSpaceType.Free },
            { length: 2, type: DiskSpaceType.File, fileId: 9 },
          ]),
        ).toEqual([
          { length: 2, type: DiskSpaceType.File, fileId: 0 },
          { length: 2, type: DiskSpaceType.File, fileId: 9 },
          { length: 1, type: DiskSpaceType.File, fileId: 2 },
          { length: 3, type: DiskSpaceType.File, fileId: 1 },
          { length: 3, type: DiskSpaceType.File, fileId: 7 },
          { length: 1, type: DiskSpaceType.Free },
          { length: 2, type: DiskSpaceType.File, fileId: 4 },
          { length: 1, type: DiskSpaceType.Free },
          { length: 3, type: DiskSpaceType.File, fileId: 3 },
          { length: 4, type: DiskSpaceType.Free },
          { length: 4, type: DiskSpaceType.File, fileId: 5 },
          { length: 1, type: DiskSpaceType.Free },
          { length: 4, type: DiskSpaceType.File, fileId: 6 },
          { length: 5, type: DiskSpaceType.Free },
          { length: 4, type: DiskSpaceType.File, fileId: 8 },
          { length: 2, type: DiskSpaceType.Free },
        ])
      })
    })
  })

  describe('Test files', () => {
    it('Test-01', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-01.txt'))

      expect(getResponse(input)).toEqual(output)
    })

    it('Test-final', () => {
      const { input, output } = readTestFile(Path.join(__dirname, './test-final.txt'))

      expect(getResponse(input)).toEqual(output)
    })
  })
})
