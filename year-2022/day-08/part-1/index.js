const Grid = require('../../../utils/grid')

const checkVisibleTrees = (treeGrid, visibleTreesGrid, initX, initY, stepX, stepY) => {
	let biggestTree = -1

	for (
		let [x, y] = [initX, initY];
		treeGrid.getCell({ x, y }) !== -1;
		[x, y] = [x + stepX, y + stepY]
	) {
		const tree = treeGrid.getCell({ x, y })
		if (tree > biggestTree) {
			visibleTreesGrid.setCell({ x, y }, true)
			biggestTree = tree
		}
	}
}

const contestResponse = input => {
	const treeGrid = new Grid(-1)

	input.forEach((row, y) => {
		row.split('').forEach((cell, x) => {
			treeGrid.setCell({ x, y }, Number(cell))
		})
	})

	const { minX, minY, maxX, maxY } = treeGrid.getBounds()
	const visibleTreesGrid = new Grid(false)
	let biggestTree

	// Horizontal lines 0 -> N
	for(let y = minY; y <= maxY; y++) {
		checkVisibleTrees(treeGrid, visibleTreesGrid, minX, y, 1, 0)
	}

	// Horizontal lines N -> 0
	for(let y = minY; y <= maxY; y++) {
		checkVisibleTrees(treeGrid, visibleTreesGrid, maxX, y, -1, 0)
	}

	// Vertical lines 0 -> N
	for(let x = minX; x <= maxX; x++) {
		checkVisibleTrees(treeGrid, visibleTreesGrid, x, minY, 0, 1)
	}

	// Vertical lines N -> 0
	for(let x = minX; x <= maxX; x++) {
		checkVisibleTrees(treeGrid, visibleTreesGrid, x, maxY, 0, -1)
	}

	return visibleTreesGrid.count(true)
}

module.exports = contestResponse