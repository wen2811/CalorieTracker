import React from "react";
import {Card} from "../UI/card/Card.jsx";
import {Button} from "../UI/button/Button.jsx";
import { ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import './RecipeList.css';


export const RecipeList = ({ recipes, expandedRecipe, onExpandRecipe, onSaveRecipe }) => {
    if (recipes.length === 0) {
        return (
            <div className="empty-state">
                <p>Geen recepten gevonden — probeer iets lekkers of specifieks 😋</p>
            </div>
        );
    }

    return (
        <div className="results-list">
            {recipes.map((recipe) => (
                <Card key={recipe.id} className="recipe-item">
                    <div className="recipe-header">
                        <div className="recipe-title">{recipe.title}</div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                onExpandRecipe(expandedRecipe === recipe.id ? null : recipe.id)
                            }
                            aria-label="Toon voedingswaarden"
                        >
                            {expandedRecipe === recipe.id ? (
                                <ChevronUp className="icon" size={16} />
                            ) : (
                                <ChevronDown className="icon" size={16} />
                            )}
                        </Button>
                    </div>

                    {expandedRecipe === recipe.id && (
                        <div className="recipe-details">
                            <div className="nutrition-section">
                                <h4>
                                    Voedingswaarden
                                    <span className="unit-hint">
                                        &nbsp;(per {recipe.quantity || 100}{' '}
                                        {recipe.unit === 'g' ? 'gram' : recipe.unit || 'portie'})
                                    </span>
                                </h4>
                                <div className="nutrition-grid">
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Calorieën</span>
                                        <span className="nutrition-value">{recipe.calories}</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Eiwitten</span>
                                        <span className="nutrition-value">{recipe.protein}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Koolhydraten</span>
                                        <span className="nutrition-value">{recipe.carbs}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="nutrition-label">Vetten</span>
                                        <span className="nutrition-value">{recipe.fat}g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="recipe-footer">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSaveRecipe(recipe)}
                        >
                            <Bookmark className="icon" size={16} />
                            Bewaar dit recept
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};
