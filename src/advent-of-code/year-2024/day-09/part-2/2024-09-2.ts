import {
  calculateChecksum,
  DiskSpace,
  DiskSpaceType,
  FreeSpace,
  mergeDiskSpaces,
  parseInputToDiskSpaces,
} from '../part-1/2024-09-1'

export const findFirstFreeSpaceBigEnough = (
  diskSpaces: DiskSpace[],
  length: number,
  maxIndex: number,
): number => {
  return diskSpaces.findIndex((diskSpace, index) => {
    if (index > maxIndex) return false
    if (diskSpace.type === DiskSpaceType.File) return false
    if (diskSpace.length < length) return false
    return true
  })
}

export const optimizeDiskSpaces = (diskSpaces: DiskSpace[]): DiskSpace[] => {
  let index = diskSpaces.length

  while (index > 0) {
    mergeDiskSpaces(diskSpaces)

    index--
    const currentDiskSpace = diskSpaces[index]
    if (!currentDiskSpace) throw new Error('Disk space not found')

    // Ignore free spaces
    if (currentDiskSpace.type === DiskSpaceType.Free) continue

    // Find the first free space big enough to store the file space
    const indexOfFreeSpace = findFirstFreeSpaceBigEnough(diskSpaces, currentDiskSpace.length, index)

    if (indexOfFreeSpace !== -1) {
      const freeSpace = diskSpaces[indexOfFreeSpace]!

      // Remove file space from its origin and replace it with free space
      const newFreeSpace: FreeSpace = {
        length: currentDiskSpace.length,
        type: DiskSpaceType.Free,
      }
      diskSpaces.splice(index, 1, newFreeSpace)

      // Replace found free space with the file space
      diskSpaces.splice(indexOfFreeSpace, 1, currentDiskSpace)

      // Add free space after the file space when the free space is bigger than the file space
      if (freeSpace.length > currentDiskSpace.length) {
        const newFreeSpace: FreeSpace = {
          length: freeSpace.length - currentDiskSpace.length,
          type: DiskSpaceType.Free,
        }
        diskSpaces.splice(indexOfFreeSpace + 1, 0, newFreeSpace)
      }
    }
  }

  mergeDiskSpaces(diskSpaces)

  return diskSpaces
}

export const getResponse = (input: string[]): string => {
  const diskSpaces = parseInputToDiskSpaces(input[0]!)
  const optimizedDiskSpaces = optimizeDiskSpaces(diskSpaces)
  return calculateChecksum(optimizedDiskSpaces).toString()
}
