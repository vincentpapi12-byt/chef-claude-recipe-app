
import recipes from "./recipes"

export async function getRecipeFromChefClaude(ingredientsArr) {
    const userIngredients = ingredientsArr.map(ingredient =>
        ingredient.trim().toLowerCase()
    )

    const matchingRecipes = recipes.filter(recipe =>
        recipe.ingredients.every(ingredient =>
            userIngredients.includes(ingredient.toLowerCase())
        )
    )

    if (matchingRecipes.length === 0) {
        return `## No exact recipe found yet

Try adding ingredients such as pasta, ground beef, and tomato paste to discover our Beef and Tomato Pasta recipe.`
    }

    return matchingRecipes.map(recipe => `
## ${recipe.name}

### Ingredients
${recipe.ingredients.map(ingredient => `- ${ingredient}`).join("\n")}

### Instructions
${recipe.instructions.map((instruction, index) =>
        `${index + 1}. ${instruction}`
    ).join("\n")}
    `).join("\n\n---\n\n")
}
