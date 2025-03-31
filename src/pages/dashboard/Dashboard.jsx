import React from "react";
import './Dashboard.css'
import {DailyControls} from "../../components/dailyControls/DailyControls.jsx";
import {MacroSummary} from "../../components/macroSummary/MacroSummary.jsx";
import {FoodEntryList} from "../../components/foodEntryList/FoodEntryList.jsx";


const Dashboard = () => {
    const dailyMacros = {
        totalCalories: 1800,
        totalProtein: 120,
        totalCarbs: 200,
        totalFat: 70
    };

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
                entries={[
                    {
                        id: "test-1",
                        name: "Kipfilet",
                        quantity: 150,
                        unit: "g",
                        calories: 300,
                        protein: 33,
                        carbs: 0,
                        fat: 7,
                        date: new Date().toISOString().split("T")[0]
                    }
                ]}
                selectedDate={new Date().toISOString().split("T")[0]}
                expandedEntry={null}
                onExpandEntry={() => {}}
                onEditEntry={() => {}}
                onDeleteEntry={() => {}}
                onAddMeal={() => {}}
                onAddFood={() => {}}
            />

        </div>
    );
};

export default Dashboard;