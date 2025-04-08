import React, {useEffect, useState} from "react";
import {useToast} from "../../components/UI/toast/Toast.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import {PlusCircle} from "lucide-react";
import { Dialog, DialogContent,DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../../components/UI/dialog/Dialog.jsx";
import {Input} from "../../components/UI/input/Input.jsx";
import {Card} from "../../components/UI/card/Card.jsx";
import {useAuth} from "../../context/authContext.jsx";


export const SavedRecipes = ({ onAddRecipeToMeal }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [expandedRecipe, setExpandedRecipe] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [servings, setServings] = useState(1);

    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(`savedRecipes-${user.id}`);
            if (stored) {
                setSavedRecipes(JSON.parse(stored));
            }
        }
    }, [user]);

    const handleDeleteRecipe = (recipeId) => {
        const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
        setSavedRecipes(updatedRecipes);
        localStorage.setItem(`savedRecipes-${user.id}`, JSON.stringify(updatedRecipes));

        toast({
            title: "Recipe deleted",
            description: "The recipe has been removed from your collection.",
        });
    };

    const handleAddToMeal = (recipe) => {
        setSelectedRecipe(recipe);
        setServings(1);
    };

    const confirmAddToMeal = () => {
        if (selectedRecipe) {
            const newSavedRecipe = {
                ...selectedRecipe,
                id: `saved-${Date.now()}`, // unieker ID
                userId: user.id,
                savedAt: new Date().toISOString()
            };

            const updatedRecipes = [...savedRecipes, newSavedRecipe];
            setSavedRecipes(updatedRecipes);
            localStorage.setItem(`savedRecipes-${user.id}`, JSON.stringify(updatedRecipes));

            setSelectedRecipe(null);
            toast({
                title: "Recipe added",
                description: `${selectedRecipe.title} has been added to your saved recipes.`,
            });
        }
    };

    const formatIngredients = (ingredients) => {
        return ingredients.split('|').map((ingredient, index) => (
            <li key={index} className="ingredient-item">{ingredient.trim()}</li>
        ));
    };

    return (
        <div className="saved-recipes">
            <Card className="recipes-card">
                <div className="recipes-header">
                    <h2>Saved Recipes</h2>
                    <p>Your collection of saved recipes</p>
                </div>

                <div className="recipes-list">
                    {savedRecipes.length > 0 ? (
                        savedRecipes.map((recipe) => (
                            <Card key={recipe.id} className="recipe-card">
                                <div className="recipe-header">
                                    <h3>{recipe.title}</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
                                    >
                                        {expandedRecipe === recipe.id ? (
                                            <ChevronUp className="icon" />
                                        ) : (
                                            <ChevronDown className="icon" />
                                        )}
                                    </Button>
                                </div>
                                <p className="recipe-servings">{recipe.servings}</p>

                                {expandedRecipe === recipe.id && (
                                    <div className="recipe-details">
                                        <div className="ingredients">
                                            <h4>Ingredients:</h4>
                                            <ul>{formatIngredients(recipe.ingredients)}</ul>
                                        </div>

                                        <div className="nutrition">
                                            <h4>Nutrition (per serving):</h4>
                                            <div className="nutrition-grid">
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Calories</span>
                                                    <span className="nutrition-value">{Math.round(recipe.calories)}</span>
                                                </div>
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Protein</span>
                                                    <span className="nutrition-value">{Math.round(recipe.protein)}g</span>
                                                </div>
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Carbs</span>
                                                    <span className="nutrition-value">{Math.round(recipe.carbs)}g</span>
                                                </div>
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Fat</span>
                                                    <span className="nutrition-value">{Math.round(recipe.fat)}g</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="recipe-footer">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                    >
                                        <Trash2 className="icon" />
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAddToMeal(recipe)}
                                    >
                                        <PlusCircle className="icon" />
                                        Add to Meal
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>No saved recipes yet</p>
                            <p>Search for recipes and save them to your collection</p>
                        </div>
                    )}
                </div>
            </Card>

            <Dialog open={selectedRecipe !== null} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Recipe to Meal</DialogTitle>
                        <DialogDescription>
                            Specify how many servings you want to add to your daily log.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRecipe && (
                        <div className="servings-form">
                            <div className="recipe-info">
                                <h3>{selectedRecipe.title}</h3>
                                <p>{selectedRecipe.servings}</p>
                            </div>
                            <div className="servings-input">
                                <label htmlFor="servings">Number of Servings</label>
                                <Input
                                    id="servings"
                                    type="number"
                                    min="0.25"
                                    step="0.25"
                                    value={servings}
                                    onChange={(e) => setServings(Number(e.target.value))}
                                />
                            </div>
                            <div className="nutrition-preview">
                                <h4>Nutrition (for {servings} serving{servings !== 1 ? 's' : ''}):</h4>
                                <div className="nutrition-grid">
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Calories</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.calories * servings)}</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Protein</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.protein * servings)}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Carbs</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.carbs * servings)}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Fat</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.fat * servings)}g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedRecipe(null)}>
                            Cancel
                        </Button>
                        <Button onClick={confirmAddToMeal}>Add to Meal</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};