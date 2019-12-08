const contestResponse = input => {
	const recipesNeeded = Number(input[0])
	const recipes = [3, 7]

	let worker1Id = 0
	let worker2Id = 1
	let worker1RecipeScore, worker2RecipeScore

	while(recipes.length < recipesNeeded + 10) {
		worker1RecipeScore = recipes[worker1Id]
		worker2RecipeScore = recipes[worker2Id]

		const sum = worker1RecipeScore + worker2RecipeScore

		if (sum > 9) {
			const newRecipeScore1 = Math.floor(sum / 10)
			const newRecipeScore2 = sum % 10
			recipes.push(newRecipeScore1, newRecipeScore2)
		} else {
			recipes.push(sum)
		}

		worker1Id = (worker1Id + 1 + worker1RecipeScore) % recipes.length
		worker2Id = (worker2Id + 1 + worker2RecipeScore) % recipes.length
	} 

	const result = recipes.slice(recipesNeeded, recipesNeeded + 10).join('')

	return result
}

module.exports = contestResponse