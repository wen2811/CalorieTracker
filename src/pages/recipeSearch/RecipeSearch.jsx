import React, {useEffect} from "react";
import {useAuth} from "../../context/authContext.jsx";
import {useToast} from "../../components/UI/toast/Toast.jsx";
import {useState} from "react";
import {Card} from "../../components/UI/card/Card.jsx";
import {RecipeList} from "../../components/recipeList/RecipeList.jsx";
import {SearchBar} from "../../components/searchBar/SearchBar.jsx";
import {searchRecipes} from "../../helpers/searchRecipes/SearchRecipes.js";
import './RecipeSearch.css'
import {inspectLocalStorage, saveRecipe} from "../../helpers/localStorageRecipes/LocalStorageRecipes.js";

export const RecipeSearch = ({ reloadRecipes }) => {
    const { user } = useAuth();
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedRecipe, setExpandedRecipe] = useState(null);

    useEffect(() => {
        console.log("RecipeSearch component mounted");
        console.log("Current auth user in RecipeSearch:", user);
        inspectLocalStorage();
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            const results = await searchRecipes(searchQuery);
            console.log("Search results:", results);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching recipes:', error);
            toast({
                title: "Search error",
                description: "There was a problem searching for recipes.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveRecipe = (recipe) => {
        const userId = user?.id || "1";

        console.log("Attempting to save recipe for user:", userId);
        console.log("Recipe data:", recipe);

        const success = saveRecipe(userId, recipe);

        if (success) {
            toast({
                title: "Food saved",
                description: `${recipe.title} has been added to your collection.`,
            });

            if (typeof reloadRecipes === 'function') {
                reloadRecipes();
            }
        } else {
            toast({
                title: "Already saved",
                description: `${recipe.title} is already in your collection.`,
            });
        }
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