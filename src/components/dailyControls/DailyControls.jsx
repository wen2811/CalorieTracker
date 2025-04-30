import React from "react";
import { Bookmark, PlusCircle, CalendarDays } from 'lucide-react';
import { Button } from "../UI/button/Button.jsx";
import './DailyControls.css';

export const DailyControls = ({ selectedDate, onDateChange, onAddMeal, onAddFood }) => {
    return (
        <div className="daily-controls">
            <div className="date-control-wrapper">
                <div className="date-control">
                    <span className="date-icon">
                        <CalendarDays size={18} color="#E84A7F" />
                    </span>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="custom-date-input"
                    />
                </div>
            </div>

            <div className="action-buttons">
                <Button
                    type="button"
                    variant="default"
                    onClick={onAddMeal}
                    className="meal-button"
                >
                    <Bookmark size={16} className="meal-icon" />
                    Maaltijd toevoegen
                </Button>

                <Button
                    type="button"
                    variant="default"
                    onClick={onAddFood}
                    className="add-button"
                >
                    <PlusCircle size={16} className="add-icon" />
                    Voedsel toevoegen
                </Button>
            </div>
        </div>
    );
};
