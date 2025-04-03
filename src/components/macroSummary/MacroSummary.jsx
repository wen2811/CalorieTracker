import React from "react";
import {Card} from "../UI/card/Card.jsx";
import './MacroSummary.css';

export const MacroSummary = ({ dailyMacros }) => {
    return (
        <div className="daily-summary">
            <Card className="macro-card">
                <div className="macro-value">{Math.round(dailyMacros.totalCalories)}</div>
                <div className="macro-label">Calories</div>
            </Card>
            <Card className="macro-card">
                <div className="macro-value">{Math.round(dailyMacros.totalProtein)}g</div>
                <div className="macro-label">Protein</div>
            </Card>
            <Card className="macro-card">
                <div className="macro-value">{Math.round(dailyMacros.totalCarbs)}g</div>
                <div className="macro-label">Carbs</div>
            </Card>
            <Card className="macro-card">
                <div className="macro-value">{Math.round(dailyMacros.totalFat)}g</div>
                <div className="macro-label">Fat</div>
            </Card>
        </div>
    );
};