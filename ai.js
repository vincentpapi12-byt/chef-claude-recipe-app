
const API_URL = "https://chef-claude-ai.vincentpapi12.workers.dev/";

export async function getRecipeFromChefClaude(ingredientsArr, turnstileToken) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        ingredients: ingredientsArr,
        turnstileToken: turnstileToken,
}),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to generate a recipe.");
    }

    return data.recipe;
}

