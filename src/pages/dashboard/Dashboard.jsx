import React from "react";
import './Dashboard.css'
import {DailyControls} from "../../components/dailyControls/DailyControls.jsx";
import {MacroSummary} from "../../components/macroSummary/MacroSummary.jsx";


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
        </div>
    );
};

export default Dashboard;