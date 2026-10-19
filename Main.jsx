
import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromChefClaude } from "./ai"
import { Turnstile } from "@marsidev/react-turnstile"

export default function Main() {
   const [ingredients, setIngredients] = React.useState([])

    const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")
    const [turnstileToken, setTurnstileToken] = React.useState("")
    const turnstileRef = React.useRef(null)

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim()

        // Prevent empty ingredients from being added
        if (!newIngredient) return

        setIngredients(prevIngredients => [
            ...prevIngredients,
            newIngredient
        ])

        setRecipeShown(false)
    }

    function clearIngredients() {
    setIngredients([])
    setRecipe("")
    setRecipeShown(false)
}

    async function getRecipe() {
        try {
            console.log("Requesting recipe with:", ingredients)

            const result = await getRecipeFromChefClaude(ingredients, turnstileToken)

            console.log("Recipe received:", result)

            setRecipe(result)
            setRecipeShown(true)
        } catch (error) {
            console.error("Recipe error:", error)
        }

            finally {
        setTurnstileToken("")
        turnstileRef.current?.reset()
    }
    }

    return (
        <main>

         <Turnstile
            siteKey="0x4AAAAAAFbL-x2HO-7JMNLr"
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            ref={turnstileRef}
        />

            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />

                <button type="submit">Add ingredient</button>
            </form>

        {ingredients.length > 0 && (
    <button type="button" onClick={clearIngredients}>
        Clear ingredients
    </button>
)}

           
{ingredients.length === 0 ? (
    <section className="empty-state">
        <h2>Welcome to Chef Claude!</h2>
        <p>
            Not sure what to cook? Add the ingredients you have,
            and let's find something delicious to make.
        </p>
    </section>
) : (
    <IngredientsList
        ingredients={ingredients}
        getRecipe={getRecipe}
    />
)}


            {recipeShown && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
