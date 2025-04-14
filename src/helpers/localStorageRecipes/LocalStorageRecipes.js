
export const getSavedRecipes = (userId) => {
    try {
        if (!userId) {
            console.error("No user ID provided when getting saved recipes");
            return [];
        }

        const stored = localStorage.getItem(`savedRecipes-${userId}`);
        console.log(`Getting saved recipes for user ${userId}:`, stored);
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


        if (!recipe.id) {
            recipe.id = `recipe-${Date.now()}`;
        }

        const saved = getSavedRecipes(userId);
        const alreadyExists = saved.some((r) => r.title === recipe.title);
        if (alreadyExists) return false;

        const updated = [...saved, recipe];
        localStorage.setItem(`savedRecipes-${userId}`, JSON.stringify(updated));

        console.log(`Recipe saved for user ${userId}:`, recipe);
        console.log("Current saved recipes:", updated);

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

        console.log(`Recipe ${recipeId} deleted for user ${userId}`);

        return true;
    } catch (error) {
        console.error("Error deleting recipe:", error);
        return false;
    }
};


export const inspectLocalStorage = () => {
    console.log('---- LocalStorage Contents ----');

    console.log('Keys in localStorage:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${i+1}. ${key}`);
    }

    console.log('\nSaved Recipes:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('savedRecipes-')) {
            try {
                const value = JSON.parse(localStorage.getItem(key));
                console.log(`${key}:`, value);
            } catch (e) {
                console.log(`${key}: [Error parsing]`, localStorage.getItem(key));
            }
        }
    }

    console.log('\nEntry Data:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('entries-')) {
            try {
                const value = JSON.parse(localStorage.getItem(key));
                console.log(`${key}:`, value);
            } catch (e) {
                console.log(`${key}: [Error parsing]`, localStorage.getItem(key));
            }
        }
    }

    console.log('-----------------------------');
};



