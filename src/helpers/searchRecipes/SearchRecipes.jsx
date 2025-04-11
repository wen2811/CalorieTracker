import axios from "axios";

export const searchRecipes = async (query) => {
    const appId = import.meta.env.VITE_EDAMAM_APP_ID;
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

    try {
        const response = await axios.get(
            `https://api.edamam.com/api/nutrition-data`,
            {
                params: {
                    app_id: appId,
                    app_key: appKey,
                    ingr: query,
                },
            }
        );

        const data = response.data;
        const recipe = {
            id: `recipe-${Date.now()}`,
            title: query,
            ingredients: query,
            servings: 1,
            calories: Math.round(data.calories),
            protein: Math.round(data.totalNutrients.PROCNT?.quantity || 0),
            carbs: Math.round(data.totalNutrients.CHOCDF?.quantity || 0),
            fat: Math.round(data.totalNutrients.FAT?.quantity || 0),
        };

        return [recipe];
    } catch (error) {
        console.error("Error fetching recipe data:", error);
        throw error;
    }
};