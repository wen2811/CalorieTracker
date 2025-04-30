/**
 * Slaat een recept op in localStorage voor een specifieke gebruiker
 *
 * Deze functie controleert eerst of een recept al bestaat (op basis van titel)
 * om duplicaten te voorkomen, en genereert een uniek ID indien nodig.
 *
 * @param {string} userId - ID van de gebruiker waarvoor het recept wordt opgeslagen
 * @param {Object} recipe - Het receptobject om op te slaan
 * @returns {boolean} - True als het recept is opgeslagen, false als het al bestond
 */

export const getSavedRecipes = (userId) => {
    try {
        if (!userId) {
            console.error("No user ID provided when getting saved recipes");
            return [];
        }

        const stored = localStorage.getItem(`savedRecipes-${userId}`);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error getting saved recipes:", error);
        return [];
    }
};

export const saveRecipe = (userId, recipe) => {
    try {
        if (!userId) {
            console.error("No user ID provided when saving recipe");
            return false;
        }

        // Genereer een uniek ID als het recept er nog geen heeft
        if (!recipe.id) {
            recipe.id = `recipe-${Date.now()}`;
        }

        const saved = getSavedRecipes(userId);
        const alreadyExists = saved.some((r) => r.title === recipe.title);
        if (alreadyExists) return false;

        const updated = [...saved, recipe];
        localStorage.setItem(`savedRecipes-${userId}`, JSON.stringify(updated));

        return true;
    } catch (error) {
        console.error("Error saving recipe:", error);
        return false;
    }
};

export const deleteSavedRecipe = (userId, recipeId) => {
    try {
        if (!userId) {
            console.error("No user ID provided when deleting recipe");
            return false;
        }

        const saved = getSavedRecipes(userId);
        const updated = saved.filter((r) => r.id !== recipeId);
        localStorage.setItem(`savedRecipes-${userId}`, JSON.stringify(updated));


        return true;
    } catch (error) {
        console.error("Error deleting recipe:", error);
        return false;
    }
};





