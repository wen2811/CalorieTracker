import React, {useEffect, useState} from "react";
import {useToast} from "../../components/UI/toast/Toast.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import {PlusCircle} from "lucide-react";
import { Dialog, DialogContent,DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../../components/UI/dialog/Dialog.jsx";
import {Input} from "../../components/UI/input/Input.jsx";
import {Card} from "../../components/UI/card/Card.jsx";
import {useAuth} from "../../context/authContext.jsx";
import {Label} from "../../components/UI/label/Label.jsx";
import {deleteSavedRecipe, getSavedRecipes, inspectLocalStorage} from "../../helpers/localStorageRecipes/LocalStorageRecipes.js";
import { ChevronUp, ChevronDown, Trash2, Pencil } from 'lucide-react';

export const SavedRecipes = ({ onAddRecipeToMeal, reloadRecipes }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [expandedRecipe, setExpandedRecipe] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [servings, setServings] = useState(1);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        console.log("SavedRecipes component mounted");
        console.log("Current auth user in SavedRecipes:", user);
        inspectLocalStorage();
    }, []);

    useEffect(() => {
        const loadSavedRecipes = () => {
            if (user && user.id) {
                console.log("Loading saved recipes for user:", user.id);
                const recipes = getSavedRecipes(user.id);
                console.log("Loaded recipes:", recipes);
                setSavedRecipes(recipes);
            } else {
                console.log("No user found when loading recipes");
                // If no user, try default user ID
                const recipes = getSavedRecipes("1");
                console.log("Trying default user ID (1). Loaded recipes:", recipes);
                setSavedRecipes(recipes);
            }
        };

        loadSavedRecipes();
    }, [user, refreshKey]);

    const handleRefresh = () => {
        console.log("Manual refresh triggered");
        setRefreshKey(prevKey => prevKey + 1);
    };

    const handleDeleteRecipe = (recipeId) => {
        const userId = user?.id || "1"; // Fallback to default user ID

        deleteSavedRecipe(userId, recipeId);
        setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));

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
        if (selectedRecipe && onAddRecipeToMeal) {
            onAddRecipeToMeal(selectedRecipe, servings);

            toast({
                title: "Recipe added to meal",
                description: `${selectedRecipe.title} has been added to your daily log.`,
            });

            setSelectedRecipe(null);
        } else if (!onAddRecipeToMeal) {
            toast({
                title: "Function not available",
                description: "The add to meal functionality is not available in this context.",
                variant: "destructive"
            });
            setSelectedRecipe(null);
        }
    };

    const confirmEditRecipe = () => {
        const userId = user?.id || "1";

        if (editingRecipe) {
            let updatedRecipe = {...editingRecipe};
            if (updatedRecipe.unit === "serving" &&
                (updatedRecipe.calories === 0 || !updatedRecipe.calories)) {

                updatedRecipe = {
                    ...updatedRecipe,
                    unit: "g",
                    quantity: 100,
                    };
            }

            const updated = savedRecipes.map((r) => r.id === updatedRecipe.id ? updatedRecipe : r);
            localStorage.setItem(`savedRecipes-${userId}`, JSON.stringify(updated));
            setSavedRecipes(updated);
            setEditingRecipe(null);

            toast({ title: "Recipe updated", description: "The recipe has been updated." });
        }
    };

    const formatIngredients = (ingredients) => {
        if (!ingredients) return <li className="ingredient-item">No ingredients listed</li>;

        return ingredients.split('|').map((ing, idx) =>
            <li key={idx} className="ingredient-item">{ing.trim()}</li>
        );
    };

    console.log("Rendering SavedRecipes with:", savedRecipes);

    return (
        <div className="saved-recipes">
            <Card className="recipes-card">
                <div className="recipes-header">
                    <h2>Saved Recipes</h2>
                    <p>Your collection of saved recipes</p>
                </div>

                <Button onClick={handleRefresh} variant="outline" className="w-full mb-4">
                    Refresh Recipes
                </Button>

                <div className="recipes-list">
                    {savedRecipes && savedRecipes.length > 0 ? (
                        savedRecipes.map((recipe) => (
                            <Card key={recipe.id} className="recipe-card">
                                <div className="recipe-header">
                                    <h3>{recipe.title}</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)
                                        }
                                    >
                                        {expandedRecipe === recipe.id ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
                                    </Button>
                                </div>
                                <p className="recipe-servings">{recipe.servings} serving(s)</p>

                                {expandedRecipe === recipe.id && (
                                    <div className="recipe-details">
                                        <div className="ingredients">
                                            <h4>Ingredients:</h4>
                                            <ul>{formatIngredients(recipe.ingredients)}</ul>
                                        </div>
                                        <div className="nutrition">
                                            <h4>Nutrition (per serving):</h4>
                                            <div className="nutrition-grid">
                                                <div className="nutrition-item"><span className="nutrition-label">Calories</span><span className="nutrition-value">{Math.round(recipe.calories)}</span></div>
                                                <div className="nutrition-item"><span className="nutrition-label">Protein</span><span className="nutrition-value">{Math.round(recipe.protein)}g</span></div>
                                                <div className="nutrition-item"><span className="nutrition-label">Carbs</span><span className="nutrition-value">{Math.round(recipe.carbs)}g</span></div>
                                                <div className="nutrition-item"><span className="nutrition-label">Fat</span><span className="nutrition-value">{Math.round(recipe.fat)}g</span></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="recipe-footer">
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteRecipe(recipe.id)}>
                                        <Trash2 className="icon" /> Delete
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleAddToMeal(recipe)}>
                                        <PlusCircle className="icon" /> Add to Meal
                                    </Button>
                                    <Button variant="ghost" size="sm" className="edit-button" onClick={() => setEditingRecipe(recipe)}>
                                        <Pencil className="icon" /> Edit
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

            {/* Add to Meal Dialog */}
            <Dialog open={selectedRecipe !== null} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Recipe to Meal</DialogTitle>
                        <DialogDescription>Specify how many servings you want to add to your daily log.</DialogDescription>
                    </DialogHeader>
                    {selectedRecipe && (
                        <div className="servings-form">
                            <div className="recipe-info"><h3>{selectedRecipe.title}</h3><p>{selectedRecipe.servings} serving(s)</p></div>
                            <div className="servings-input">
                                <label htmlFor="servings">Number of Servings</label>
                                <Input id="servings" type="number" min="0.25" step="0.25" value={servings} onChange={(e) => setServings(Number(e.target.value))} />
                            </div>
                            <div className="nutrition-preview">
                                <h4>Nutrition (for {servings} serving{servings !== 1 ? 's' : ''}):</h4>
                                <div className="nutrition-grid">
                                    <div className="nutrition-item"><span className="nutrition-label">Calories</span><span className="nutrition-value">{Math.round(selectedRecipe.calories * servings)}</span></div>
                                    <div className="nutrition-item"><span className="nutrition-label">Protein</span><span className="nutrition-value">{Math.round(selectedRecipe.protein * servings)}g</span></div>
                                    <div className="nutrition-item"><span className="nutrition-label">Carbs</span><span className="nutrition-value">{Math.round(selectedRecipe.carbs * servings)}g</span></div>
                                    <div className="nutrition-item"><span className="nutrition-label">Fat</span><span className="nutrition-value">{Math.round(selectedRecipe.fat * servings)}g</span></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedRecipe(null)}>Cancel</Button>
                        <Button onClick={confirmAddToMeal}>Add to Meal</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Recipe Dialog */}
            <Dialog open={editingRecipe !== null} onOpenChange={(open) => !open && setEditingRecipe(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Recipe</DialogTitle>
                        <DialogDescription>Update title, ingredients or servings below.</DialogDescription>
                    </DialogHeader>
                    {editingRecipe && (
                        <div className="edit-recipe-form">
                            <div className="form-group">
                                <Label htmlFor="edit-title">Title</Label>
                                <Input id="edit-title" value={editingRecipe.title} onChange={(e) => setEditingRecipe({ ...editingRecipe, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="edit-ingredients">Ingredients</Label>
                                <textarea id="edit-ingredients" rows="4" value={editingRecipe.ingredients} onChange={(e) => setEditingRecipe({ ...editingRecipe, ingredients: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="edit-servings">Servings</Label>
                                <Input id="edit-servings" type="text" value={editingRecipe.servings} onChange={(e) => setEditingRecipe({ ...editingRecipe, servings: e.target.value })} />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingRecipe(null)}>Cancel</Button>
                        <Button onClick={confirmEditRecipe}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};