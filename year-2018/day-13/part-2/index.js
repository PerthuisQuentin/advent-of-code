function getNextRail(grid, cart, x, y) {
	if (cart === '<') {
		return {
			rail: grid[x][y - 1].rail,
			x: x,
			y: y - 1
		}
	}
	else if (cart === '>') {
		return {
			rail: grid[x][y + 1].rail,
			x: x,
			y: y + 1
		}
	}
	else if (cart === '^') {
		return {
			rail: grid[x - 1] && grid[x - 1][y].rail,
			x: x - 1,
			y: y 
		}
	}
	else if (cart === 'v') {
		return {
			rail: grid[x + 1] && grid[x + 1][y].rail,
			x: x + 1,
			y: y
		}
	}
}

function getNextDir(cart, dir) {
	if (cart === '<') {
		if (dir === 0) return { cart: 'v', dir: 1 }
		if (dir === 1) return { cart: '<', dir: 2 }
		if (dir === 2) return { cart: '^', dir: 0 }
	}
	else if (cart === '>') {
		if (dir === 0) return { cart: '^', dir: 1 }
		if (dir === 1) return { cart: '>', dir: 2 }
		if (dir === 2) return { cart: 'v', dir: 0 }
	}
	else if (cart === '^') {
		if (dir === 0) return { cart: '<', dir: 1 }
		if (dir === 1) return { cart: '^', dir: 2 }
		if (dir === 2) return { cart: '>', dir: 0 }
	}
	else if (cart === 'v') {
		if (dir === 0) return { cart: '>', dir: 1 }
		if (dir === 1) return { cart: 'v', dir: 2 }
		if (dir === 2) return { cart: '<', dir: 0 }
	}
}

function getCartOnCurve(cart, nextRail) {
	if (cart === '<') {
		if (nextRail === '/') return 'v'
		if (nextRail === '\\') return '^'
	}
	else if (cart === '>') {
		if (nextRail === '/') return '^'
		if (nextRail === '\\') return 'v'
	}
	else if (cart === '^') {
		if (nextRail === '/') return '>'
		if (nextRail === '\\') return '<'
	}
	else if (cart === 'v') {
		if (nextRail === '/') return '<'
		if (nextRail === '\\') return '>'
	}
}

function countCarts(grid) {
	return grid
		.map(row => row.reduce((prev, cur) => cur.cart !== undefined ? prev + 1 : prev, 0))
		.reduce((prev, cur) => prev + cur)
}

const contestResponse = input => {
	let grid = input.map((row, rowId, gridArray) => Array.from(row).map((item, colId) => {
		const data = {}

		if (item === '|' || item === '-' || item === '/' || item === '\\' || item === '+') data.rail = item

		if (item === '^' || item === 'v' || item === '<' || item === '>') {
			data.cart = item
			data.dir = 0
			
			const left = gridArray[rowId][colId - 1]
			const right = gridArray[rowId][colId + 1]
			const up = gridArray[rowId - 1] && gridArray[rowId - 1][colId]
			const down = gridArray[rowId + 1] && gridArray[rowId + 1][colId]
			const railLeft = left === '-' || left === '+' || left === '\\' || left === '/'
			const railRight = right === '-' || right === '+' || right === '\\' || right === '/'
			const railUp = up === '|' || up === '+' || up === '\\' || up === '/'
			const railDown = down === '|' || down === '+' || down === '\\' || down === '/'
			
			if (railUp && railDown && railLeft && railRight) data.rail = '+'
			else if (railUp && railDown) data.rail = '|'
			else if (railLeft && railRight) data.rail = '-'
		} 
		return data 
	}))

	//console.log(grid.map(x => x.map(y => y.cart !== undefined ? y.cart : y.rail !== undefined ? y.rail : ' ').join('')).join('\n'))

	let carts = countCarts(grid)
	let lastGrid = grid
	let newGrid

	while (carts > 1) {
		newGrid = lastGrid.map(a => a.map(b => b))
		let crashsToClean = []

		for (let x = 0; x < lastGrid.length; x++) {
			for (let y = 0; y < lastGrid[x].length; y++) {
				const item = lastGrid[x][y]
				if (item.cart === undefined) continue

				const nextRail = getNextRail(lastGrid, item.cart, x, y)
	
				if (nextRail.rail === undefined || nextRail.rail === ' ') continue

				if (newGrid[nextRail.x][nextRail.y].cart || newGrid[nextRail.x][nextRail.y].crash) {
					//console.log(grid.map(x => x.map(y => y.cart !== undefined ? y.cart : y.rail !== undefined ? y.rail : ' ').join('')).join('\n'))
					crashsToClean.push({ x: nextRail.x, y: nextRail.y })
					newGrid[nextRail.x][nextRail.y] = { rail: item.rail, crash: true }
					newGrid[x][y] = { rail: item.rail }
				} else if (nextRail.rail === '+') {
					const nextDir = getNextDir(item.cart, item.dir)
					newGrid[nextRail.x][nextRail.y] = { rail: nextRail.rail, cart: nextDir.cart, dir: nextDir.dir }
					newGrid[x][y] = { rail: item.rail }
				} else if (nextRail.rail === '-' || nextRail.rail === '|') {
					newGrid[nextRail.x][nextRail.y] = { rail: nextRail.rail, cart: item.cart, dir: item.dir }
					newGrid[x][y] = { rail: item.rail }
				} else if (nextRail.rail === '/' || nextRail.rail === '\\') {
					const nextCart = getCartOnCurve(item.cart, nextRail.rail)
					newGrid[nextRail.x][nextRail.y] = { rail: nextRail.rail, cart: nextCart, dir: item.dir }
					newGrid[x][y] = { rail: item.rail }
				}
			}
		}

		for (let crash of crashsToClean) {
			newGrid[crash.x][crash.y].crash = undefined
		}
		carts = countCarts(newGrid)
		console.log(carts)
		lastGrid = newGrid
	}

	//console.log(grid.map(x => x.map(y => y.cart !== undefined ? y.cart : y.rail !== undefined ? y.rail : ' ').join('')).join('\n'))

	for (let x = 0; x < newGrid.length; x++) {
		for (let y = 0; y < newGrid[x].length; y++) {
			if (newGrid[x][y].cart) return y + ',' + x
		}
	}
}

module.exports = contestResponse