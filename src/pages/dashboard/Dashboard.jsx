import React, {useEffect, useState} from "react";
import './Dashboard.css';
import {DailyControls} from "../../components/dailyControls/DailyControls.jsx";
import {MacroSummary} from "../../components/macroSummary/MacroSummary.jsx";
import {FoodEntryList} from "../../components/foodEntryList/FoodEntryList.jsx";
import {FoodEntryForm} from "../../components/foodEntryForm/FoodEntryForm.jsx";
import {EditEntryDialog} from "../../components/editEntryDialog/EditEntryDialog.jsx";
import {SavedRecipes} from "../savedRecipes/SavedRecipes.jsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../../components/UI/dialog/Dialog.jsx";
import {Toaster, ToastProvider} from "../../components/UI/toast/Toast.jsx";
import {RecipeSearch} from "../recipeSearch/RecipeSearch.jsx";
import {inspectLocalStorage} from "../../helpers/localStorageRecipes/LocalStorageRecipes.js";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMealModalOpen, setIsMealModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    const [expandedEntry, setExpandedEntry] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [recipesReloadTrigger, setRecipesReloadTrigger] = useState(0);

    useEffect(() => {
        console.log("Dashboard component mounted");
        inspectLocalStorage();
    }, []);

    const loadEntries = () => {
        try {
            console.log(`Loading entries for ${selectedDate}:`, localStorage.getItem(`entries-${selectedDate}`));
            const stored = localStorage.getItem(`entries-${selectedDate}`);

            if (stored) {
                const parsed = JSON.parse(stored);
                console.log("Parsed entries:", parsed);
                setEntries(parsed);
            } else {
                console.log("No entries found for date:", selectedDate);
                setEntries([]);
            }

            console.log("Entries loaded:", entries);
            console.log("Selected date:", selectedDate);
        } catch (error) {
            console.error("Error loading entries:", error);
            setEntries([]);
        }
    };

    useEffect(() => {
        loadEntries();
    }, [selectedDate]);


    useEffect(() => {
        console.log("Entries updated:", entries);
    }, [entries]);

    const handleAddEntry = (name, quantity, unit, macros) => {
        const entry = {
            id: `entry-${Date.now()}`,
            name,
            quantity,
            unit,
            date: selectedDate,
            ...macros,
        };
        const updated = [...entries, entry];
        setEntries(updated);
        localStorage.setItem(`entries-${selectedDate}`, JSON.stringify(updated));
    };

    const handleAddRecipeToMeal = (recipe, servings) => {
        const entry = {
            id: `recipe-${Date.now()}`,
            name: `${recipe.title} (Recipe)`,
            quantity: servings,
            unit: 'serving',
            calories: recipe.calories * servings,
            protein: recipe.protein * servings,
            carbs: recipe.carbs * servings,
            fat: recipe.fat * servings,
            date: selectedDate
        };
        const updated = [...entries, entry];
        setEntries(updated);
        localStorage.setItem(`entries-${selectedDate}`, JSON.stringify(updated));
    };

    const handleDeleteEntry = (id) => {
        const updated = entries.filter(entry => entry.id !== id);
        setEntries(updated);
        localStorage.setItem(`entries-${selectedDate}`, JSON.stringify(updated));
    };

    const handleUpdateEntry = () => {
        if (!editingEntry) return;

        const updated = entries.map(entry =>
            entry.id === editingEntry.id ? editingEntry : entry
        );

        setEntries(updated);
        localStorage.setItem(`entries-${selectedDate}`, JSON.stringify(updated));
        setEditingEntry(null);
    };

    const reloadRecipes = () => {
        setRecipesReloadTrigger(prev => prev + 1);
    };

    const dailyMacros = entries
        .filter(entry => entry.date === selectedDate)
        .reduce((acc, entry) => ({
            totalCalories: acc.totalCalories + entry.calories,
            totalProtein: acc.totalProtein + entry.protein,
            totalCarbs: acc.totalCarbs + entry.carbs,
            totalFat: acc.totalFat + entry.fat,
        }), { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 });

    return (
        <ToastProvider>
            <div className="dashboard-page">
                <h1>Dashboard</h1>
                <p>Welkom terug! Hier zie je jouw dagelijkse voeding en macro's.</p>

                <DailyControls
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onAddMeal={() => setIsMealModalOpen(true)}
                    onAddFood={() => setIsModalOpen(true)}
                />

                <MacroSummary dailyMacros={dailyMacros} />

                <FoodEntryList
                    entries={entries}
                    selectedDate={selectedDate}
                    expandedEntry={expandedEntry}
                    onExpandEntry={setExpandedEntry}
                    onEditEntry={setEditingEntry}
                    onDeleteEntry={(id) => handleDeleteEntry(id)}
                />

                <FoodEntryForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddEntry={handleAddEntry}
                />

                <EditEntryDialog
                    entry={editingEntry}
                    isOpen={editingEntry !== null}
                    onClose={() => setEditingEntry(null)}
                    onChange={setEditingEntry}
                    onSave={() => handleUpdateEntry()}
                />

                <RecipeSearch reloadRecipes={reloadRecipes} />

                <Dialog open={isMealModalOpen} onOpenChange={setIsMealModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Meal from Saved Recipes</DialogTitle>
                            <DialogDescription>
                                Kies een recept om toe te voegen aan je logboek.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="meal-selector">
                            <SavedRecipes
                                onAddRecipeToMeal={(recipe, servings) => {
                                    handleAddRecipeToMeal(recipe, servings);
                                    setIsMealModalOpen(false);
                                }}
                                reloadRecipes={reloadRecipes}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </ToastProvider>
    );
};

export default Dashboard;
