import React from "react";
import {BookmarkIcon, PlusCircle} from "lucide-react";
import {Input} from "../UI/input/Input.jsx";
import {Button} from "../UI/button/Button.jsx";
import './DailyControls.css';

export const DailyControls = ({ selectedDate, onDateChange, onAddMeal, onAddFood }) => {
    return (
        <div className="daily-controls">
            <Input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
            />
            <Button variant="outline" onClick={onAddMeal}>
                <BookmarkIcon className="icon" />
                Add Meal
            </Button>
            <Button onClick={onAddFood}>
                <PlusCircle className="icon" />
                Add Food
            </Button>
        </div>
    );
};