import React from "react";
import {Card} from "../UI/card/Card.jsx";
import { Flame, Beef, Pizza, Droplet } from 'lucide-react';
import './MacroSummary.css';

export const MacroSummary = ({ dailyMacros }) => {
    return (
        <div className="daily-summary">
            <Card className="macro-card calories">
                <div className="macro-icon"><Flame size={20} /></div>
                <div className="macro-content">
                    <div className="macro-label">Calorieën</div>
                    <div className="macro-value">{Math.round(dailyMacros.totalCalories)}</div>
                    <div className="macro-unit">kcal</div>
                </div>
            </Card>
            <Card className="macro-card protein">
                <div className="macro-icon"><Beef size={20} /></div>
                <div className="macro-content">
                    <div className="macro-label">Eiwitten</div>
                    <div className="macro-value">{Math.round(dailyMacros.totalProtein)}</div>
                    <div className="macro-unit">g</div>
                </div>
            </Card>
            <Card className="macro-card carbs">
                <div className="macro-icon"><Pizza size={20} /></div>
                <div className="macro-content">
                    <div className="macro-label">Koolhydraten</div>
                    <div className="macro-value">{Math.round(dailyMacros.totalCarbs)}</div>
                    <div className="macro-unit">g</div>
                </div>
            </Card>
            <Card className="macro-card fat">
                <div className="macro-icon"><Droplet size={20} /></div>
                <div className="macro-content">
                    <div className="macro-label">Vetten</div>
                    <div className="macro-value">{Math.round(dailyMacros.totalFat)}</div>
                    <div className="macro-unit">g</div>
                </div>
            </Card>
        </div>
    );
};