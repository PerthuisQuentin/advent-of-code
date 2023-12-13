const { ArrayUtils } = require('../../../utils')

const parseGrid = gridInput => {
	const rows = gridInput
	const columns = []

	for (let columnIndex = 0; columnIndex < rows[0].length; columnIndex++) {
		columns.push(rows.map(row => row[columnIndex]).join(''))
	}

	return {
		rows,
		columns
	}
}

const parseGrids = input => ArrayUtils.split(input, '').map(parseGrid)

const findTwinRowsIndexes = rows => {
 	const twinRowsIndexes = []

	for (let rowIndex = 0; rowIndex < rows.length - 1; rowIndex++) {
		if (rows[rowIndex] === rows[rowIndex + 1]) {
			twinRowsIndexes.push(rowIndex)
		}
	}

	return twinRowsIndexes
}

const findTwinColumnsIndexes = columns => {
 	const twinColumnsIndexes = []

	for (let columnIndex = 0; columnIndex < columns.length - 1; columnIndex++) {
		if (columns[columnIndex] === columns[columnIndex + 1]) {
			twinColumnsIndexes.push(columnIndex)
		}
	}

	return twinColumnsIndexes
}

const isReflectionInRowValid = (rows, reflectionIndex) => {
	const rowsAmount = rows.length
	const halfRowsAmount = Math.floor(rowsAmount / 2)
	const reflectionLength = (reflectionIndex + 1) > halfRowsAmount
		? rowsAmount - (reflectionIndex + 1)
		: reflectionIndex + 1

	for (let i = 0; i < reflectionLength; i++) {
		const row = rows[reflectionIndex - reflectionLength + 1 + i]
		const mirrorRow = rows[reflectionIndex + reflectionLength - i]
		if (row !== mirrorRow) return false
	}

	return true
}

const isReflectionInColumnValid = (columns, reflectionIndex) => {
	const columnsAmount = columns.length
	const halfColumnsAmount = Math.floor(columnsAmount / 2)
	const reflectionLength = (reflectionIndex + 1) > halfColumnsAmount
		? columnsAmount - (reflectionIndex + 1)
		: reflectionIndex + 1

	for (let i = 0; i < reflectionLength; i++) {
		const column = columns[reflectionIndex - reflectionLength + 1 + i]
		const mirrorColumn = columns[reflectionIndex + reflectionLength - i]
		if (column !== mirrorColumn) return false
	}

	return true
}

const findReflections = grid => {
	const twinRowsIndexes = findTwinRowsIndexes(grid.rows)
	const twinColumnsIndexes = findTwinColumnsIndexes(grid.columns)

	const validRowsIndexes = twinRowsIndexes.filter(rowIndex => isReflectionInRowValid(grid.rows, rowIndex))
	const validColumnsIndexes = twinColumnsIndexes.filter(columnIndex => isReflectionInColumnValid(grid.columns, columnIndex))

	return {
		rowReflections: validRowsIndexes,
		columnReflections: validColumnsIndexes
	}
}

const countResult = reflectionsResult => {
	const { rowReflections, columnReflections } = reflectionsResult

	if (rowReflections.length) {
		return (rowReflections[0] + 1) * 100
	}
	else if (columnReflections.length) {
		return columnReflections[0] + 1
	}
	else return 0
}

const contestResponse = input => {
	const grids = parseGrids(input)

	return grids
		.map(findReflections)
		.map(countResult)
		.reduce((sum, value) => sum + value, 0)
}

module.exports = contestResponse