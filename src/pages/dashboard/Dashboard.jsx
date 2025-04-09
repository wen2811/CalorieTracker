import React, {useState} from "react";
import './Dashboard.css'
import {DailyControls} from "../../components/dailyControls/DailyControls.jsx";
import {MacroSummary} from "../../components/macroSummary/MacroSummary.jsx";
import {FoodEntryList} from "../../components/foodEntryList/FoodEntryList.jsx";
import {FoodEntryForm} from "../../components/foodEntryForm/FoodEntryForm.jsx";
import {EditEntryDialog} from "../../components/editEntryDialog/EditEntryDialog.jsx";
import {SavedRecipes} from "../savedRecipes/SavedRecipes.jsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../../components/UI/dialog/Dialog.jsx";
import {Toaster, ToastProvider} from "../../components/UI/toast/Toast.jsx";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);
    const [expandedEntry, setExpandedEntry] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [isMealModalOpen, setIsMealModalOpen] = useState(false);

    const handleAddEntry = (name, quantity, unit, macros) => {
        const entry = {
            id: `entry-${Date.now()}`,
            name,
            quantity,
            unit,
            date: selectedDate,
            ...macros,
        };

        setEntries((prev) => [...prev, entry]);
    };

    const handleUpdateEntry = () => {
        if (editingEntry) {
            setEntries((prev) =>
                prev.map((entry) =>
                    entry.id === editingEntry.id ? editingEntry : entry
                )
            );
            setEditingEntry(null);
        }
    };

    const handleDeleteEntry = (entryId) => {
        setEntries(entries.filter(entry => entry.id !== entryId));
        setExpandedEntry(null);
    };

    const dailyMacros = entries
        .filter(entry => entry.date === selectedDate)
        .reduce(
        (acc, entry) => ({
            totalCalories: acc.totalCalories + entry.calories,
            totalProtein: acc.totalProtein + entry.protein,
            totalCarbs: acc.totalCarbs + entry.carbs,
            totalFat: acc.totalFat + entry.fat,
        }),
        { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
        );


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
        setEntries((prev) => [...prev, entry]);
    };


    return (
        <ToastProvider>
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <p>Welkom terug! Hier zie je jouw dagelijkse voeding en macro’s.</p>

            <DailyControls
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onAddMeal={() => setIsMealModalOpen(true)}
                onAddFood={() => setIsMealModalOpen(true)}
            />

            <MacroSummary dailyMacros={dailyMacros} />

            <FoodEntryList
                entries={entries}
                selectedDate={selectedDate}
                expandedEntry={expandedEntry}
                onExpandEntry={setExpandedEntry}
                onEditEntry={setEditingEntry}
                onDeleteEntry={handleDeleteEntry}
                onAddMeal={() => setIsMealModalOpen(true)}
                onAddFood={() => setIsModalOpen(true)}
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
                onSave={handleUpdateEntry}
            />

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
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
        </ToastProvider>
    );
};

export default Dashboard;