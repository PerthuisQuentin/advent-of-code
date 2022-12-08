const Grid = require('../../../utils/grid')

const getVisibleTrees = (treeGrid, treePosition, initX, initY, stepX, stepY) => {
	const houseTree = treeGrid.getCell(treePosition)
	let treeCount = 0

	for (
		let [x, y] = [initX + stepX, initY + stepY];
		treeGrid.getCell({ x, y }) !== -1;
		[x, y] = [x + stepX, y + stepY]
	) {
		treeCount++
		if (treeGrid.getCell({ x, y }) >= houseTree) break
	}

	return treeCount
}

const getTreeScenicScore = (treeGrid, treePosition) => {
	return (
		getVisibleTrees(treeGrid, treePosition, treePosition.x, treePosition.y, 0, 1)
		* getVisibleTrees(treeGrid, treePosition, treePosition.x, treePosition.y, 0, -1)
		* getVisibleTrees(treeGrid, treePosition, treePosition.x, treePosition.y, 1, 0)
		* getVisibleTrees(treeGrid, treePosition, treePosition.x, treePosition.y, -1, 0)
	)
}

const contestResponse = input => {
	const treeGrid = new Grid(-1)
	const scenicScoreGrid = new Grid(0)
	let bestScore = 0

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			treeGrid.setCell({ x, y }, Number(cell))
		})
	})

	treeGrid.forEach((_, position) => {
		scenicScoreGrid.setCell(position, getTreeScenicScore(treeGrid, position))
	})

	scenicScoreGrid.forEach((score, p) => {
		if (score > bestScore) bestScore = score
	})

	return bestScore
}

module.exports = contestResponse