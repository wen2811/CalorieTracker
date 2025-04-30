import React, {useEffect, useState} from "react";
import {useToast} from "../../components/UI/toast/Toast.jsx";
import {Button} from "../../components/UI/button/Button.jsx";
import {PlusCircle} from "lucide-react";
import { Dialog, DialogContent,DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../../components/UI/dialog/Dialog.jsx";
import {Input} from "../../components/UI/input/Input.jsx";
import {Card} from "../../components/UI/card/Card.jsx";
import {useAuth} from "../../context/authContext.jsx";
import {Label} from "../../components/UI/label/Label.jsx";
import {deleteSavedRecipe, getSavedRecipes} from "../../helpers/localStorageRecipes/LocalStorageRecipes.js";
import { ChevronUp, ChevronDown, Trash2, Pencil } from 'lucide-react';
import './SavedRecipes.css';

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
        const loadSavedRecipes = () => {
            const userId = user?.id || "1";
            const recipes = getSavedRecipes(userId);
            setSavedRecipes(recipes);
        };

        loadSavedRecipes();
    }, [user, refreshKey]);

    const handleDeleteRecipe = (recipeId) => {
        const userId = user?.id || "1";
        deleteSavedRecipe(userId, recipeId);
        setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));

        toast({
            title: "Recept verwijderd",
            description: "Dit recept is niet langer in je collectie.",
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
                title: "Toegevoegd aan je dagboek",
                description: `${selectedRecipe.title} is toegevoegd aan je maaltijd.`,
            });
            setSelectedRecipe(null);
        } else {
            toast({
                title: "Actie niet beschikbaar",
                description: "Je kunt dit recept op dit moment niet toevoegen.",
                variant: "destructive"
            });
            setSelectedRecipe(null);
        }
    };

    const confirmEditRecipe = () => {
        const userId = user?.id || "1";

        if (editingRecipe) {
            let updated = { ...editingRecipe };

            if (updated.unit === "portie" && (!updated.calories || updated.calories === 0)) {
                updated = { ...updated, unit: "g", quantity: 100 };
            }

            const newList = savedRecipes.map(r =>
                r.id === updated.id ? updated : r
            );

            localStorage.setItem(`savedRecipes-${userId}`, JSON.stringify(newList));
            setSavedRecipes(newList);
            setEditingRecipe(null);

            toast({
                title: "Recept bijgewerkt",
                description: "Je wijzigingen zijn opgeslagen.",
            });
        }
    };

    const formatIngredients = (ingredients) => {
        if (!ingredients) {
            return <li className="ingredient-item">Geen ingrediënten opgegeven</li>;
        }

        return ingredients.split("|").map((ing, idx) => (
            <li key={idx} className="ingredient-item">{ing.trim()}</li>
        ));
    };

    return (
        <div className="saved-recipes">
            <div className="saved-recipes-header">
                <h1>Je Recepten</h1>
                <p>Een overzicht van alles wat je hebt bewaard</p>
            </div>

            <Card className="recipes-card">
                <div className="recipes-list">
                    {savedRecipes.length > 0 ? (
                        savedRecipes.map((recipe) => (
                            <Card key={recipe.id} className="recipe-card">
                                <div className="recipe-header">
                                    <h3>{recipe.title}</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setExpandedRecipe(
                                                expandedRecipe === recipe.id ? null : recipe.id
                                            )
                                        }
                                    >
                                        {expandedRecipe === recipe.id ? (
                                            <ChevronUp className="icon" />
                                        ) : (
                                            <ChevronDown className="icon" />
                                        )}
                                    </Button>
                                </div>
                                <p className="recipe-servings">{recipe.servings} portie(s)</p>

                                {expandedRecipe === recipe.id && (
                                    <div className="recipe-details">
                                        <div className="ingredients">
                                            <h4>Ingrediënten</h4>
                                            <ul>{formatIngredients(recipe.ingredients)}</ul>
                                        </div>
                                        <div className="nutrition">
                                            <h4>Voedingswaarden (per portie)</h4>
                                            <div className="nutrition-grid">
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Calorieën</span>
                                                    <span className="nutrition-value">{Math.round(recipe.calories)}</span>
                                                </div>
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Eiwitten</span>
                                                    <span className="nutrition-value">{Math.round(recipe.protein)}g</span>
                                                </div>
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Koolhydraten</span>
                                                    <span className="nutrition-value">{Math.round(recipe.carbs)}g</span>
                                                </div>
                                                <div className="nutrition-item">
                                                    <span className="nutrition-label">Vetten</span>
                                                    <span className="nutrition-value">{Math.round(recipe.fat)}g</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="recipe-footer">
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteRecipe(recipe.id)}>
                                        <Trash2 className="icon" /> Verwijder
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleAddToMeal(recipe)}>
                                        <PlusCircle className="icon" /> Voeg toe aan maaltijd
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => setEditingRecipe(recipe)}>
                                        <Pencil className="icon" /> Bewerken
                                    </Button>
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>Nog geen recepten opgeslagen</p>
                            <p>Zoek iets lekkers en sla je favorieten op</p>
                        </div>
                    )}
                </div>
            </Card>

            <Dialog open={!!selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Voeg toe aan je maaltijd</DialogTitle>
                        <DialogDescription>Kies hoeveel porties je wilt loggen.</DialogDescription>
                    </DialogHeader>
                    {selectedRecipe && (
                        <div className="servings-form">
                            <div className="recipe-info">
                                <h3>{selectedRecipe.title}</h3>
                                <p>{selectedRecipe.servings} portie(s)</p>
                            </div>
                            <div className="servings-input">
                                <label htmlFor="servings">Aantal porties</label>
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
                                <h4>Voedingswaarden ({servings} portie{servings !== 1 ? 's' : ''})</h4>
                                <div className="nutrition-grid">
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Calorieën</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.calories * servings)}</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Eiwitten</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.protein * servings)}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Koolhydraten</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.carbs * servings)}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Vetten</span>
                                        <span className="nutrition-value">{Math.round(selectedRecipe.fat * servings)}g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedRecipe(null)}>Annuleer</Button>
                        <Button onClick={confirmAddToMeal}>Toevoegen</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!editingRecipe} onOpenChange={(open) => !open && setEditingRecipe(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Recept bewerken</DialogTitle>
                        <DialogDescription>Pas de titel, ingrediënten of porties aan.</DialogDescription>
                    </DialogHeader>
                    {editingRecipe && (
                        <div className="edit-recipe-form">
                            <div className="form-group">
                                <Label htmlFor="edit-title">Titel</Label>
                                <Input
                                    id="edit-title"
                                    value={editingRecipe.title}
                                    onChange={(e) =>
                                        setEditingRecipe({ ...editingRecipe, title: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="edit-ingredients">Ingrediënten</Label>
                                <textarea
                                    id="edit-ingredients"
                                    rows="4"
                                    value={editingRecipe.ingredients}
                                    onChange={(e) =>
                                        setEditingRecipe({ ...editingRecipe, ingredients: e.target.value })
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="edit-servings">Porties</Label>
                                <Input
                                    id="edit-servings"
                                    type="text"
                                    value={editingRecipe.servings}
                                    onChange={(e) =>
                                        setEditingRecipe({ ...editingRecipe, servings: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingRecipe(null)}>Annuleer</Button>
                        <Button onClick={confirmEditRecipe}>Bewaar aanpassingen</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};