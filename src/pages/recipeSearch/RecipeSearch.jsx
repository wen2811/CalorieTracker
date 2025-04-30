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
        inspectLocalStorage();
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        try {
            const results = await searchRecipes(searchQuery);
            setSearchResults(results);
        } catch (error) {
            console.error('Fout bij het zoeken naar recepten:', error);
            toast({
                title: "Oeps...",
                description: "Er ging iets mis bij het ophalen van recepten. Probeer het straks nog eens.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveRecipe = (recipe) => {
        const userId = user?.id || "1";

        const success = saveRecipe(userId, recipe);

        if (success) {
            toast({
                title: "Toegevoegd aan je favorieten",
                description: `${recipe.title} is opgeslagen in je collectie.`,
            });

            if (typeof reloadRecipes === 'function') {
                reloadRecipes();
            }
        } else {
            toast({
                title: "Al opgeslagen",
                description: `${recipe.title} stond al in je collectie.`,
            });
        }
    };

    return (
        <div className="recipe-search">
            <Card className="search-card">
                <div className="search-header">
                    <h2>Zoek naar iets lekkers</h2>
                    <p>Vind inspirerende gerechten en bewaar je favorieten</p>
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
                            <p>Waar heb je trek in vandaag?</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};