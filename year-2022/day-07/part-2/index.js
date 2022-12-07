const ArrayUtils = require('../../../utils/array')

const COMMAND_PREFIX = '$'
const ROOT_PATH = '/'
const PARENT_PATH = '..'
const DIRECTORY_PREFIX = 'dir'
const TYPE_DIRECTORY = 'directory'
const TYPE_FILE = 'file'
const LS_COMMAND = 'ls'
const CD_COMMAND = 'cd'
const AVAILABLE_SPACE = 70000000
const REQUIRED_SPACE = 30000000

const parseCommand = line => {
	const name = line.slice(2, 4)
	const value = line.slice(5)
	const command = { name }
	if (value) command.value = value
	return command
}

const parseOutput = line => {
	if (line.startsWith(DIRECTORY_PREFIX)) {
		return {
			type: TYPE_DIRECTORY,
			name: line.slice(4)
		}
	} else {
		const fileLine = line.split(' ')
		return {
			type: TYPE_FILE,
			name: fileLine[1],
			size: Number(fileLine[0])
		}
	}
}

const parseCommands = input => {
	const commands = []

	input.forEach(line => {
		const lastCommand = commands[commands.length - 1]

		if (line.startsWith(COMMAND_PREFIX)) {
			commands.push(parseCommand(line))
		} else {
			if (!lastCommand.result) lastCommand.result = []
			lastCommand.result.push(parseOutput(line))
		}
	})

	return commands
}

const buildFileTree = commands => {
	const root = { name: '/', type: TYPE_DIRECTORY, content: [] }
	let current = root

	commands.forEach(command => {
		if (command.name === CD_COMMAND) {
			if (command.value === ROOT_PATH) {
				current = root
			} else if (command.value === PARENT_PATH) {
				current = current.parent
			} else {
				current = current.content.find(item => item.name === command.value)
			}
		} else if (command.name === LS_COMMAND) {
			command.result.forEach(item => {
				if (item.type === TYPE_DIRECTORY) {
					current.content.push({
						...item,
						content: [],
						parent: current
					})
				} else if (item.type === TYPE_FILE) {
					current.content.push({
						...item,
						parent: current
					})
				}
			})
		}
	})

	return root
}

const calculateSize = item => {
	if (item.type === TYPE_FILE) {
		return item.size
	} else if (item.type === TYPE_DIRECTORY) {
		if (!item.size) item.size = ArrayUtils.sum(item.content.map(subItem => calculateSize(subItem)))
		return item.size
	}
}

const searchSizes = (item, sizeTreshold, result) => {
	const size = calculateSize(item)
	if (size >= sizeTreshold) result.push(size)

	item.content
		.filter(subItem => subItem.type === TYPE_DIRECTORY)
		.forEach(subItem => searchSizes(subItem, sizeTreshold, result))
}

const contestResponse = input => {
	const commands = parseCommands(input)
	const fileTree = buildFileTree(commands)

	const rootSize = calculateSize(fileTree)
	const remainingSpace = AVAILABLE_SPACE - rootSize
	const neededSpace = REQUIRED_SPACE - remainingSpace

	const sizes = []
	searchSizes(fileTree, neededSpace, sizes)

	return ArrayUtils.min(sizes)
}

module.exports = contestResponse