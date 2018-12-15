const contestResponse = input => {
	const pattern = input[0]
	const patternLength = pattern.length
	const recipes = [3, 7]

	let worker1Id = 0
	let worker2Id = 1
	let worker1RecipeScore, worker2RecipeScore
	let findAfter

	while(findAfter === undefined) {
		worker1RecipeScore = recipes[worker1Id]
		worker2RecipeScore = recipes[worker2Id]

		const sum = worker1RecipeScore + worker2RecipeScore

		if (sum > 9) {
			const newRecipeScore1 = Math.floor(sum / 10)
			const newRecipeScore2 = sum % 10

			recipes.push(newRecipeScore1)
			if (recipes.slice(-patternLength).join('') === pattern) findAfter = recipes.length - patternLength

			recipes.push(newRecipeScore2)
			if (recipes.slice(-patternLength).join('') === pattern) findAfter = recipes.length - patternLength
		} else {
			recipes.push(sum)
			if (recipes.slice(-patternLength).join('') === pattern) findAfter = recipes.length - patternLength
		}

		worker1Id = (worker1Id + 1 + worker1RecipeScore) % recipes.length
		worker2Id = (worker2Id + 1 + worker2RecipeScore) % recipes.length
	}

	return findAfter.toString()
}

module.exports = contestResponse