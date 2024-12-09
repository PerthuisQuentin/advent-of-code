export enum DiskSpaceType {
  File = 'file',
  Free = 'free',
}

export type FileSpace = {
  fileId: number
  type: DiskSpaceType.File
  length: number
}

export type FreeSpace = {
  type: DiskSpaceType.Free
  length: number
}

export type DiskSpace = FileSpace | FreeSpace

export const diskSpaceToString = (diskSpaces: DiskSpace[]): string => {
  let result = ''
  diskSpaces.forEach((diskSpace) => {
    if (diskSpace.type === DiskSpaceType.File) {
      result += ''.padEnd(diskSpace.length, diskSpace.fileId.toString())
    } else {
      result += ''.padEnd(diskSpace.length, '.')
    }
  })
  return result
}

export const parseInputToDiskSpaces = (input: string): DiskSpace[] => {
  let fileId = 0

  return input.split('').reduce((diskSpaces, current, index) => {
    const isFile = index % 2 === 0

    if (isFile) {
      diskSpaces.push({
        fileId: fileId++,
        type: DiskSpaceType.File,
        length: Number(current),
      })
    } else {
      diskSpaces.push({
        type: DiskSpaceType.Free,
        length: Number(current),
      })
    }

    return diskSpaces
  }, [] as DiskSpace[])
}

const getLastFileIndex = (diskSpaces: DiskSpace[]): number => {
  const lastIndex = diskSpaces.length - 1
  if (diskSpaces[lastIndex]?.type === DiskSpaceType.Free) return lastIndex - 1
  return lastIndex
}

const getLastFreeIndex = (diskSpaces: DiskSpace[]): number => {
  const lastIndex = diskSpaces.length - 1
  if (diskSpaces[lastIndex]?.type === DiskSpaceType.File) return lastIndex - 1
  return lastIndex
}

export const mergeDiskSpaces = (diskSpaces: DiskSpace[]): void => {
  let index = -1

  while (index < diskSpaces.length - 1) {
    index++
    const currentSpace = diskSpaces[index]
    const nextSpace = diskSpaces[index + 1]

    if (!currentSpace || !nextSpace) continue
    if (currentSpace.type !== nextSpace.type) continue

    if (
      currentSpace.type === DiskSpaceType.File &&
      nextSpace.type === DiskSpaceType.File &&
      currentSpace.fileId !== nextSpace.fileId
    )
      continue

    currentSpace.length += nextSpace.length
    diskSpaces.splice(index + 1, 1)
    index--
  }
}

export const optimizeDiskSpaces = (diskSpaces: DiskSpace[]): DiskSpace[] => {
  let index = 0

  while (index < diskSpaces.length - 1) {
    const currentSpace = diskSpaces[index]
    if (!currentSpace) throw new Error('No current space')

    mergeDiskSpaces(diskSpaces)

    // Ignore file spaces
    if (currentSpace.type === DiskSpaceType.File) {
      index++
      continue
    }

    // Remove empty spaces
    if (currentSpace.length === 0) {
      diskSpaces.splice(index, 1)
      continue
    }

    const lastFileIndex = getLastFileIndex(diskSpaces)
    const lastFile = diskSpaces[lastFileIndex]!
    if (lastFile.type !== DiskSpaceType.File) throw new Error('Last file not found')

    const lastFreeIndex = getLastFreeIndex(diskSpaces)
    const lastFree = diskSpaces[lastFreeIndex]!
    if (lastFree.type !== DiskSpaceType.Free) throw new Error('Last free not found')

    // Current free space is smaller than last file space
    if (currentSpace.length < lastFile.length) {
      // Replace free space by file space
      const newFileSpace: FileSpace = {
        fileId: lastFile.fileId,
        type: DiskSpaceType.File,
        length: currentSpace.length,
      }
      diskSpaces.splice(index, 1, newFileSpace)

      // Update last file to remove moved length
      lastFile.length -= currentSpace.length

      // Add free space at end with moved length
      const newFreeSpace: FreeSpace = {
        type: DiskSpaceType.Free,
        length: currentSpace.length,
      }
      diskSpaces.push(newFreeSpace)

      // Current free space is equal to last file space
    } else if (currentSpace.length === lastFile.length) {
      // Replace free space by file space
      const newFileSpace: FileSpace = {
        fileId: lastFile.fileId,
        type: DiskSpaceType.File,
        length: currentSpace.length,
      }
      diskSpaces.splice(index, 1, newFileSpace)

      // Replace last file by free space of same length
      const newFreeSpace: FreeSpace = {
        type: DiskSpaceType.Free,
        length: currentSpace.length,
      }
      diskSpaces.splice(lastFileIndex, 1, newFreeSpace)

      // Current free space is bigger than last file space
    } else {
      // Add file space at current index
      const newFileSpace: FileSpace = {
        fileId: lastFile.fileId,
        type: DiskSpaceType.File,
        length: lastFile.length,
      }
      diskSpaces.splice(index, 0, newFileSpace)

      // Reduce current free space by last file length
      currentSpace.length -= lastFile.length

      // Replace last file by free space of same length (index + 1 because we added an item in array)
      const newFreeSpace: FreeSpace = {
        type: DiskSpaceType.Free,
        length: lastFile.length,
      }
      diskSpaces.splice(lastFileIndex + 1, 1, newFreeSpace)
    }

    index++
  }

  mergeDiskSpaces(diskSpaces)

  return diskSpaces
}

export const calculateChecksum = (diskSpaces: DiskSpace[]): number => {
  let result = 0
  let index = 0

  diskSpaces.forEach((diskSpace) => {
    if (diskSpace.type === DiskSpaceType.Free) {
      index += diskSpace.length
      return
    }

    for (let i = 0; i < diskSpace.length; i++) {
      result += diskSpace.fileId * index
      index++
    }
  })

  return result
}

export const getResponse = (input: string[]): string => {
  const diskSpaces = parseInputToDiskSpaces(input[0]!)
  const optimizedDiskSpaces = optimizeDiskSpaces(diskSpaces)
  return calculateChecksum(optimizedDiskSpaces).toString()
}
