const ORE = 'ORE'
const FUEL = 'FUEL'

const MAX_ORE = 1000000000000

const parseRecipes = recipes => {
	return recipes.map(recipe => {
		const [inputs, output] = recipe.split(' => ')
		const [outputQuantity, outputName] = output.split(' ')

		return {
			inputs: inputs
				.split(', ')
				.map(input => {
					const [inputQuantity, inputName] = input.split(' ')
					return {
						name: inputName,
						quantity: Number(inputQuantity)
					}
				}),
			output: {
				name: outputName,
				quantity: Number(outputQuantity)
			}
		}
	})
}

const orderRecipesByOutput = recipes => {
	const recipesByOutputs = {}

	recipes.forEach(recipe => {
		const outputName = recipe.output.name
		if (!recipesByOutputs[outputName]) recipesByOutputs[outputName] = []
		recipesByOutputs[outputName].push(recipe)
	})

	return recipesByOutputs
}

const produce = (recipesByOutputs, name, quantity, leftovers) => {
	if (name === ORE) return { quantity, leftovers }

	const recipes = recipesByOutputs[name]
	if (!recipes) throw new Error(`No recipes for ${name}`)

	const bestResult = recipes
		.map(recipe => {
			const coef = Math.ceil(quantity / recipe.output.quantity)
			let leftoversCopy = Object.assign({} ,leftovers)
			let ore = 0

			recipe.inputs
				.forEach(input => {
					const leftover = leftoversCopy[input.name] || 0
					const need = (input.quantity * coef)

					if (need < leftover) {
						leftoversCopy[input.name] -= need
					} else {
						const realNeed = need - leftover
						leftoversCopy[input.name] = 0
						const result = produce(recipesByOutputs, input.name, realNeed, leftoversCopy)
						leftoversCopy = result.leftovers
						ore += result.quantity
					}
				})

			const produced = recipe.output.quantity * coef

			if (!leftoversCopy[name]) leftoversCopy[name] = 0
			leftoversCopy[name] += produced - quantity
			return { quantity: ore, leftovers: leftoversCopy }
		})
		.reduce((minOre, result) => result.quantity < minOre.quantity ? result : minOre, { quantity: Infinity })

	return bestResult
}

const contestResponse = input => {
	const recipes = parseRecipes(input)
	const recipesByOutputs = orderRecipesByOutput(recipes)

	let min = 1
	let max = 10
	let result = produce(recipesByOutputs, FUEL, max, {})

	while (result.quantity < MAX_ORE) {
		max *= 10
		result = produce(recipesByOutputs, FUEL, max, {})
	}

	while ((min + 1) !== max) {
		const test = Math.floor((min + max) / 2)
		result = produce(recipesByOutputs, FUEL, test, {})
		if (result.quantity > MAX_ORE) {
			max = test
		} else {
			min = test
		}
	}

	return min
}

module.exports = contestResponse