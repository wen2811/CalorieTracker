import React from "react";
import {useAuth} from "../../context/authContext.jsx";
import {useToast} from "../../components/UI/toast/Toast.jsx";
import {useState} from "react";
import {Card} from "../../components/UI/card/Card.jsx";
import {RecipeList} from "../../components/recipeList/RecipeList.jsx";
import {SearchBar} from "../../components/searchBar/SearchBar.jsx";
import {searchRecipes} from "../../helpers/searchRecipes/SearchRecipes.jsx";
import './RecipSearch.css'

export const RecipeSearch = () => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRecipe, setExpandedRecipe] = useState(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            const results = await searchRecipes(searchQuery);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching recipes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveRecipe = (recipe) => {
        if (!user) return;

        const storageKey = `savedRecipes-${user.id}`;
        const stored = localStorage.getItem(storageKey);
        const saved = stored ? JSON.parse(stored) : [];

        const alreadyExists = saved.some((r) => r.title === recipe.title);
        if (alreadyExists) {
            toast({
                title: "Already saved",
                description: `${recipe.title} is already in your collection.`,
            });
            return;
        }

        const updated = [...saved, recipe];
        localStorage.setItem(storageKey, JSON.stringify(updated));

        toast({
            title: "Food saved",
            description: `${recipe.title} has been added to your collection.`,
        });
    };

    return (
        <div className="recipe-search">
            <Card className="search-card">
                <div className="search-header">
                    <h2>Food Search</h2>
                    <p>Search for food or meals and save them to your collection</p>
                </div>

                <SearchBar
                    query={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />

                <div className="search-results">
                    {searchQuery && !isLoading ? (
                        <RecipeList
                            recipes={searchResults}
                            expandedRecipe={expandedRecipe}
                            onExpandRecipe={setExpandedRecipe}
                            onSaveRecipe={handleSaveRecipe}
                        />
                    ) : (
                        <div className="empty-state">
                            <p>Search for foods to get started</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
