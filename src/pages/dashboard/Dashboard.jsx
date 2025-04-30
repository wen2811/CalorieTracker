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


const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMealModalOpen, setIsMealModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    const [expandedEntry, setExpandedEntry] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [recipesReloadTrigger, setRecipesReloadTrigger] = useState(0);


    const loadEntries = () => {
        try {
            const stored = localStorage.getItem(`entries-${selectedDate}`);
            if (stored) {
                setEntries(JSON.parse(stored));
            } else {
                setEntries([]);
            }
        } catch {
            setEntries([]);
        }
    };

    useEffect(() => {
        loadEntries();
    }, [selectedDate]);

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
            name: `${recipe.title} (Recept)`,
            quantity: servings,
            unit: 'portie',
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

    // Create explicit handler functions for better debugging
    const handleAddFood = () => {
        setIsModalOpen(true);
    };

    const handleAddMeal = () => {
        setIsMealModalOpen(true);
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
                <h1>Jouw Dag in Balans</h1>
                <p className="dashboard-subtitle">
                    Een overzicht van wat je vandaag eet, telt én voelt.
                </p>

                <DailyControls
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    onAddMeal={handleAddMeal}
                    onAddFood={handleAddFood}
                />

                <section>
                    <h2 className="section-header">Macro-overzicht</h2>
                    <MacroSummary dailyMacros={dailyMacros} />
                </section>

                <section>
                    <h2 className="section-header">Voedingsinvoer</h2>
                    <FoodEntryList
                        entries={entries}
                        selectedDate={selectedDate}
                        expandedEntry={expandedEntry}
                        onExpandEntry={setExpandedEntry}
                        onEditEntry={setEditingEntry}
                        onDeleteEntry={handleDeleteEntry}
                        onAddMeal={handleAddMeal}
                        onAddFood={handleAddFood}
                    />
                </section>

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
                    onSave={handleUpdateEntry}
                />

                <section>
                    <h2 className="section-header">Recepten Zoeken</h2>
                    <RecipeSearch reloadRecipes={reloadRecipes} />
                </section>

                <Dialog open={isMealModalOpen} onOpenChange={setIsMealModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Een recept toevoegen aan je dag</DialogTitle>
                            <DialogDescription>
                                Kies uit je opgeslagen recepten en voeg toe wat bij je past vandaag.
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