const WALL = '#'
const EMPTY = '.'
const ELF = 'E'
const GOBLIN = 'G'

const GOBLIN_ATTACK_POWER = 3
const MAX_HEALTH_POINT = 200

function drawGrid(cells, entities) {
	console.log(cells.grid.map(row => {
		let line = ''
		let endLine = ' - '

		for (let cellId of row) {
			const cell = cells[cellId]

			if (cell.entity !== undefined) {
				const entity = entities[cell.entity]
				line += entity.type
				if (endLine.length > 3) endLine += ', '
				endLine += `${entity.type}(${entity.healthPoint})`
			} else {
				line += cell.type
			}
		}

		return line + endLine
	}).join('\n'))
}

function getAdjacentCells(cells, x, y) {
	const leftCell = cells[cells.grid[y][x - 1]]
	const rightCell = cells[cells.grid[y][x + 1]]
	const upCell = cells[cells.grid[y - 1][x]]
	const downCell = cells[cells.grid[y + 1][x]]

	return [leftCell, rightCell, upCell, downCell]
}

function getAttackableEntities(cells, entities, entity) {
	const targetType = entity.type === ELF ? GOBLIN : ELF
	const adjacentCells = getAdjacentCells(cells, entity.x, entity.y)

	return adjacentCells
		.filter(cell => cell.entity !== undefined && entities[cell.entity].type === targetType)
		.map(cell => entities[cell.entity])
}

function attack(entity, attackableEntities) {
	if (attackableEntities.length === 0) return
	let target

	if (attackableEntities.length === 1) {
		target = attackableEntities[0]
	} else {
		const lowestHealthPoint = attackableEntities.reduce((prev, cur) => cur.healthPoint < prev.healthPoint ? cur : prev).healthPoint
		const targets = attackableEntities
			.filter(entity => entity.healthPoint === lowestHealthPoint)
			.sort((entityA, entityB) => entityA.y !== entityB.y ? entityA.y - entityB.y : entityA.x - entityB.x)
		target = targets[0]
	}

	if (target) {
		target.healthPoint -= entity.attackPower
	}

	return target
}

function getInRangeCells(cells, entities, entity) {
	const targetType = entity.type === ELF ? GOBLIN : ELF
	const addedIds = {}
	const inRange = []

	for (let entityId of entities.alives) {
		const target = entities[entityId]
		if (target.type !== targetType || target.id === entity.id) continue

		getAdjacentCells(cells, target.x, target.y)
			.filter(cell => cell.type === EMPTY && cell.entity === undefined && addedIds[cell.id] === undefined)
			.forEach(cell => {
				inRange.push(cell)
				addedIds[cell.id] = true
			})
	}

	return inRange
}

function getReachableCells(cells, entity) {
	const startCellId = cells.grid[entity.y][entity.x]
	const reachableCells = { [startCellId]: 0 }
	let cellsToAnalyse = [cells[startCellId]]
	let newCells = []
	let distance = 1

	while (cellsToAnalyse.length > 0) {
		for (let cell of cellsToAnalyse) {
			for (let neighbor of getAdjacentCells(cells, cell.x, cell.y)) {
				if (neighbor.type === EMPTY && neighbor.entity === undefined && reachableCells[neighbor.id] === undefined) {
					reachableCells[neighbor.id] = distance
					newCells.push(neighbor)
				}
			}
		}

		cellsToAnalyse = newCells
		newCells = []
		distance++
	}

	return reachableCells
}

function getNextCellTo(cells, entity, target) {
	const entityCellId = cells.grid[entity.y][entity.x]
	const reachableCells = { [target.id]: 0 }
	let cellsToAnalyse = [target]
	let newCells = []
	let distance = 1

	while (reachableCells[entityCellId] === undefined) {
		for (let cell of cellsToAnalyse) {
			for (let neighbor of getAdjacentCells(cells, cell.x, cell.y)) {
				if (neighbor.type === EMPTY && (neighbor.entity === undefined || neighbor.entity === entity.id) && reachableCells[neighbor.id] === undefined) {
					reachableCells[neighbor.id] = distance
					newCells.push(neighbor)
				}
			}
		}

		cellsToAnalyse = newCells
		newCells = []
		distance++
	}

	const possibleCells = getAdjacentCells(cells, entity.x, entity.y)
		.filter(cell => cell.type === EMPTY && cell.entity === undefined)
		.filter(cell => reachableCells[cell.id] !== undefined)
	const lowestDistance = reachableCells[possibleCells.reduce((prev, cur) => reachableCells[cur.id] < reachableCells[prev.cur] ? cur : prev).id]
	const nextCells = possibleCells
		.filter(cell => reachableCells[cell.id] === lowestDistance)
		.sort((cellA, cellB) => cellA.id - cellB.id)

	return nextCells[0]
}

function move(cells, entities, entity) {
	const reachableCells = getReachableCells(cells, entity)
	const inRangeCells = getInRangeCells(cells, entities, entity).filter(cell => reachableCells[cell.id] !== undefined)
	if (inRangeCells.length === 0) return
	const lowestDistance = reachableCells[inRangeCells.reduce((prev, cur) => reachableCells[cur.id] < reachableCells[prev.id] ? cur : prev).id]
	const nearestCells = inRangeCells
		.filter(cell => reachableCells[cell.id] === lowestDistance)
		.sort((cellA, cellB) => cellA.id - cellB.id)
	const targetCell = nearestCells[0]
	const nextCell = getNextCellTo(cells, entity, targetCell)

	cells[cells.grid[entity.y][entity.x]].entity = undefined
	cells[nextCell.id].entity = entity.id
	entity.x = nextCell.x
	entity.y = nextCell.y
}

function killEntity(cells, entities, target) {
	cells[cells.grid[target.y][target.x]].entity = undefined
	entities[target.id] = undefined
	const indexOf = entities.alives.indexOf(target.id)
	if (indexOf !== -1) entities.alives.splice(indexOf, 1)
}

function makeARound(cells, entities) {
	const turnOrder = Array
		.from(entities.alives)
		.sort((entityA, entityB) => entities[entityA].y !== entities[entityB].y ? entities[entityA].y - entities[entityB].y : entities[entityA].x - entities[entityB].x)

	while (turnOrder.length > 0) {
		if (isFightFinished(entities)) {
			return false
		}

		const entity = entities[turnOrder.shift()]
		const attackableEntities = getAttackableEntities(cells, entities, entity)

		if (attackableEntities.length > 0) {
			const target = attack(entity, attackableEntities)

			if (target !== undefined && target.healthPoint < 1) {
				killEntity(cells, entities, target)
				const indexOf = turnOrder.indexOf(target.id)
				if (indexOf !== -1)	turnOrder.splice(indexOf, 1)
			}

		} else {
			move(cells, entities, entity)

			const newAttackableEntities = getAttackableEntities(cells, entities, entity)
			const target = attack(entity, newAttackableEntities)

			if (target !== undefined && target.healthPoint < 1) {
				killEntity(cells, entities, target)
				const indexOf = turnOrder.indexOf(target.id)
				if (indexOf !== -1)	turnOrder.splice(indexOf, 1)
			}
		}
	}

	return true
}

function countElvesAndGoblins(entities) {
	let goblins = 0
	let elves = 0

	for (let entityId of entities.alives) {
		const entity = entities[entityId]
		if (entity.type === ELF) elves++
		else if (entity.type === GOBLIN) goblins++
	}

	return { elves, goblins }
}

function isFightFinished(entities) {
	const count = countElvesAndGoblins(entities)
	return count.elves === 0 || count.goblins === 0
}

function makeAFight(input, elvesAttackPower) {
	const cells = { grid: [] }
	const entities = { alives: [] }
	let cellId = 0
	let entityId = 0

	cells.grid = input.map((row, rowId) => row.split('').map((type, colId) => {
		const cell = {
			id: cellId++,
			type,
			x: colId,
			y: rowId
		}
		
		if (type === ELF || type === GOBLIN) {
			const entity = {
				id: entityId++,
				attackPower: type === ELF ? elvesAttackPower : GOBLIN_ATTACK_POWER,
				healthPoint: MAX_HEALTH_POINT, 
				type: type,
				x: colId,
				y: rowId
			}

			cell.entity = entity.id
			cell.type = EMPTY
			entities[entity.id] = entity
			entities.alives.push(entity.id)
		}

		cells[cell.id] = cell
		return cell.id
	}))

	let turns = 0
	while (!isFightFinished(entities)) {
		if (makeARound(cells, entities)) turns++
	}

	const sumHealthPoints = entities.alives.reduce((prev, cur) => prev + entities[cur].healthPoint, 0)
	const result = sumHealthPoints * turns
	const count = countElvesAndGoblins(entities)

	return {
		outcome: result,
		elves: count.elves,
		goblins: count.goblins
	}
}

const contestResponse = input => {
	let initElves = 0
	let elvesAttackPower = 4
	input.forEach(line => line.split('').forEach(cell => cell === ELF ? initElves++ : undefined))
	let result

	do {
		const fightResult = makeAFight(input, elvesAttackPower++)
		if (fightResult.elves === initElves && fightResult.goblins === 0) result = fightResult.outcome
	} while (!result)

	return result.toString()
}

module.exports = contestResponse