import Path from 'path'

import { readTestFile } from 'tests/test-files'

import {
  calculateChecksum,
  DiskSpace,
  DiskSpaceType,
  getResponse,
  mergeDiskSpaces,
  optimizeDiskSpaces,
  parseInputToDiskSpaces,
} from './2024-09-1'

describe('2024-09-1', () => {
  describe('Sub methods tests', () => {
    describe('parseInputToDiskSpaces', () => {
      it('Should parse correctly 12345', () => {
        expect(parseInputToDiskSpaces('12345')).toEqual([
          { length: 1, type: DiskSpaceType.File, fileId: 0 },
          { length: 2, type: DiskSpaceType.Free },
          { length: 3, type: DiskSpaceType.File, fileId: 1 },
          { length: 4, type: DiskSpaceType.Free },
          { length: 5, type: DiskSpaceType.File, fileId: 2 },
        ])
      })

      it('Should parse correctly 2333133121414131402', () => {
        expect(parseInputToDiskSpaces('2333133121414131402')).toEqual([
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
        ])
      })
    })

    describe('mergeDiskSpaces', () => {
      it('Should merge all free spaces', () => {
        const diskSpaces: DiskSpace[] = [
          { length: 2, type: DiskSpaceType.Free },
          { length: 3, type: DiskSpaceType.Free },
          { length: 1, type: DiskSpaceType.Free },
        ]

        mergeDiskSpaces(diskSpaces)

        expect(diskSpaces).toEqual([{ length: 6, type: DiskSpaceType.Free }])
      })

      it('Should merge all file spaces with the same id', () => {
        const diskSpaces: DiskSpace[] = [
          { length: 2, type: DiskSpaceType.File, fileId: 0 },
          { length: 2, type: DiskSpaceType.File, fileId: 1 },
          { length: 3, type: DiskSpaceType.File, fileId: 1 },
          { length: 4, type: DiskSpaceType.File, fileId: 2 },
          { length: 7, type: DiskSpaceType.File, fileId: 3 },
          { length: 2, type: DiskSpaceType.File, fileId: 3 },
          { length: 1, type: DiskSpaceType.File, fileId: 1 },
        ]

        mergeDiskSpaces(diskSpaces)

        expect(diskSpaces).toEqual([
          { length: 2, type: DiskSpaceType.File, fileId: 0 },
          { length: 5, type: DiskSpaceType.File, fileId: 1 },
          { length: 4, type: DiskSpaceType.File, fileId: 2 },
          { length: 9, type: DiskSpaceType.File, fileId: 3 },
          { length: 1, type: DiskSpaceType.File, fileId: 1 },
        ])
      })

      it('Should merge all disk spaces', () => {
        const diskSpaces: DiskSpace[] = [
          { length: 2, type: DiskSpaceType.File, fileId: 0 },
          { length: 2, type: DiskSpaceType.File, fileId: 2 },
          { length: 3, type: DiskSpaceType.File, fileId: 2 },
          { length: 4, type: DiskSpaceType.Free },
          { length: 7, type: DiskSpaceType.File, fileId: 3 },
          { length: 1, type: DiskSpaceType.Free },
          { length: 2, type: DiskSpaceType.Free },
          { length: 2, type: DiskSpaceType.File, fileId: 3 },
          { length: 1, type: DiskSpaceType.File, fileId: 1 },
        ]

        mergeDiskSpaces(diskSpaces)

        expect(diskSpaces).toEqual([
          { length: 2, type: DiskSpaceType.File, fileId: 0 },
          { length: 5, type: DiskSpaceType.File, fileId: 2 },
          { length: 4, type: DiskSpaceType.Free },
          { length: 7, type: DiskSpaceType.File, fileId: 3 },
          { length: 3, type: DiskSpaceType.Free },
          { length: 2, type: DiskSpaceType.File, fileId: 3 },
          { length: 1, type: DiskSpaceType.File, fileId: 1 },
        ])
      })
    })

    describe('optimizeDiskSpaces', () => {
      it('Should optimize correctly 12345.', () => {
        expect(
          optimizeDiskSpaces([
            { length: 1, type: DiskSpaceType.File, fileId: 0 },
            { length: 2, type: DiskSpaceType.Free },
            { length: 3, type: DiskSpaceType.File, fileId: 1 },
            { length: 4, type: DiskSpaceType.Free },
            { length: 5, type: DiskSpaceType.File, fileId: 2 },
          ]),
        ).toEqual([
          { length: 1, type: DiskSpaceType.File, fileId: 0 },
          { length: 2, type: DiskSpaceType.File, fileId: 2 },
          { length: 3, type: DiskSpaceType.File, fileId: 1 },
          { length: 3, type: DiskSpaceType.File, fileId: 2 },
          { length: 6, type: DiskSpaceType.Free },
        ])
      })

      it('Should optimize correctly 2333133121414131402', () => {
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
          { length: 1, type: DiskSpaceType.File, fileId: 8 },
          { length: 3, type: DiskSpaceType.File, fileId: 1 },
          { length: 3, type: DiskSpaceType.File, fileId: 8 },
          { length: 1, type: DiskSpaceType.File, fileId: 2 },
          { length: 3, type: DiskSpaceType.File, fileId: 7 },
          { length: 3, type: DiskSpaceType.File, fileId: 3 },
          { length: 1, type: DiskSpaceType.File, fileId: 6 },
          { length: 2, type: DiskSpaceType.File, fileId: 4 },
          { length: 1, type: DiskSpaceType.File, fileId: 6 },
          { length: 4, type: DiskSpaceType.File, fileId: 5 },
          { length: 2, type: DiskSpaceType.File, fileId: 6 },
          { length: 14, type: DiskSpaceType.Free },
        ])
      })
    })

    describe('calculateChecksum', () => {
      it('Should return 60 for 12345', () => {
        expect(
          calculateChecksum([
            { length: 1, type: DiskSpaceType.File, fileId: 0 },
            { length: 2, type: DiskSpaceType.File, fileId: 2 },
            { length: 3, type: DiskSpaceType.File, fileId: 1 },
            { length: 3, type: DiskSpaceType.File, fileId: 2 },
            { length: 6, type: DiskSpaceType.Free },
          ]),
        ).toBe(60)
      })

      it('Should return 1928 for 2333133121414131402', () => {
        expect(
          calculateChecksum([
            { length: 2, type: DiskSpaceType.File, fileId: 0 },
            { length: 2, type: DiskSpaceType.File, fileId: 9 },
            { length: 1, type: DiskSpaceType.File, fileId: 8 },
            { length: 3, type: DiskSpaceType.File, fileId: 1 },
            { length: 3, type: DiskSpaceType.File, fileId: 8 },
            { length: 1, type: DiskSpaceType.File, fileId: 2 },
            { length: 3, type: DiskSpaceType.File, fileId: 7 },
            { length: 3, type: DiskSpaceType.File, fileId: 3 },
            { length: 1, type: DiskSpaceType.File, fileId: 6 },
            { length: 2, type: DiskSpaceType.File, fileId: 4 },
            { length: 1, type: DiskSpaceType.File, fileId: 6 },
            { length: 4, type: DiskSpaceType.File, fileId: 5 },
            { length: 2, type: DiskSpaceType.File, fileId: 6 },
            { length: 14, type: DiskSpaceType.Free },
          ]),
        ).toBe(1928)
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
