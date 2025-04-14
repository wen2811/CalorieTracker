import React from "react";
import {Card} from "../UI/card/Card.jsx";
import {Button} from "../UI/button/Button.jsx";
import { ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import './RecipeList.css';


export const RecipeList = ({ recipes, expandedRecipe, onExpandRecipe, onSaveRecipe }) => {

    if (recipes.length === 0) {
        return (
            <div className="empty-state">
                <p>No foods found</p>
            </div>
        );
    }

    return (
        <div className="results-list">
            {recipes.map((recipe) => (
                <Card key={recipe.id} className="recipe-card">
                    <div className="recipe-header">
                        <h3>{recipe.title}</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onExpandRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
                        >
                            {expandedRecipe === recipe.id ? <ChevronUp className="icon" /> : <ChevronDown className="icon" />}
                        </Button>
                    </div>

                    {expandedRecipe === recipe.id && (
                        <div className="recipe-details">
                            <div className="nutrition">
                                <h4>Nutrition (per {recipe.quantity ? recipe.quantity : '100'} {recipe.unit === 'g' ? 'gram' : (recipe.unit || 'serving')})</h4>
                                <div className="nutrition-grid">
                                    <div className="nutrition-item"><span>Calories</span> {recipe.calories}</div>
                                    <div className="nutrition-item"><span>Protein</span> {recipe.protein}g</div>
                                    <div className="nutrition-item"><span>Carbs</span> {recipe.carbs}g</div>
                                    <div className="nutrition-item"><span>Fat</span> {recipe.fat}g</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="recipe-footer">
                        <Button
                            variant="outline"
                            onClick={() => onSaveRecipe(recipe)}
                        >
                            <Bookmark className="icon" />
                            Save Food
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};