import React, {useState} from "react";
import './Dashboard.css'
import {DailyControls} from "../../components/dailyControls/DailyControls.jsx";
import {MacroSummary} from "../../components/macroSummary/MacroSummary.jsx";
import {FoodEntryList} from "../../components/foodEntryList/FoodEntryList.jsx";
import {FoodEntryForm} from "../../components/foodEntryForm/FoodEntryForm.jsx";
import {EditEntryDialog} from "../../components/editEntryDialog/EditEntryDialog.jsx";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [entries, setEntries] = useState([]);
    const [editingEntry, setEditingEntry] = useState(null);

    const handleAddEntry = (name, quantity, unit, macros) => {
        const entry = {
            id: `entry-${Date.now()}`,
            name,
            quantity,
            unit,
            date: new Date().toISOString().split("T")[0],
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

    const dailyMacros = entries.reduce(
        (acc, entry) => ({
            totalCalories: acc.totalCalories + entry.calories,
            totalProtein: acc.totalProtein + entry.protein,
            totalCarbs: acc.totalCarbs + entry.carbs,
            totalFat: acc.totalFat + entry.fat,
        }),
        { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }

    );

    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <p>Welkom terug! Hier zie je jouw dagelijkse voeding en macro’s.</p>

            <DailyControls
                selectedDate={new Date().toISOString().split("T")[0]}
                onAddClick={() => console.log("Maaltijd toevoegen")}
                onDateChange={(date) => console.log("Gekozen datum:", date)}
            />

            <MacroSummary dailyMacros={dailyMacros} />

            <FoodEntryList
                entries={entries}
                selectedDate={new Date().toISOString().split("T")[0]}
                expandedEntry={null}
                onExpandEntry={() => {}}
                onEditEntry={setEditingEntry}
                onDeleteEntry={handleDeleteEntry}
                onAddMeal={() => {}}
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
        </div>
    );
};

export default Dashboard;