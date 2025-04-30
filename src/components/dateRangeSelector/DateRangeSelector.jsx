import React from "react";
import {Button} from "../UI/button/Button.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./DateRangeSelector.css";

export const DateRangeSelector = ({ startDate, endDate, onRangeChange }) => {
    const handleStartChange = (e) => {
        const newStart = e.target.value;
        onRangeChange(newStart, endDate);
    };

    const handleEndChange = (e) => {
        const newEnd = e.target.value;
        onRangeChange(startDate, newEnd);
    };

    const handlePreviousPeriod = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const duration = end.getTime() - start.getTime();
        const days = Math.ceil(duration / (1000 * 60 * 60 * 24));

        const newEnd = new Date(start);
        newEnd.setDate(newEnd.getDate() - 1);

        const newStart = new Date(newEnd);
        newStart.setDate(newStart.getDate() - days + 1);

        onRangeChange(
            newStart.toISOString().split("T")[0],
            newEnd.toISOString().split("T")[0]
        );
    };

    const handleNextPeriod = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const duration = end.getTime() - start.getTime();
        const days = Math.ceil(duration / (1000 * 60 * 60 * 24));

        const newStart = new Date(end);
        newStart.setDate(newStart.getDate() + 1);

        const newEnd = new Date(newStart);
        newEnd.setDate(newEnd.getDate() + days - 1);

        const today = new Date();
        if (newEnd > today) {
            newEnd.setTime(today.getTime());
        }

        onRangeChange(
            newStart.toISOString().split("T")[0],
            newEnd.toISOString().split("T")[0]
        );
    };

    return (
        <div className="date-range-selector">
            <div className="date-field">
                <label htmlFor="startDate">Vanaf</label>
                <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={handleStartChange}
                />
            </div>

            <div className="date-field">
                <label htmlFor="endDate">Tot en met</label>
                <input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={handleEndChange}
                />
            </div>

            <div className="date-navigation">
                <Button variant="outline" onClick={handlePreviousPeriod}>
                    <ChevronLeft className="icon" size={16} />
                    Terug in de tijd
                </Button>

                <Button variant="outline" onClick={handleNextPeriod}>
                    Vooruit
                    <ChevronRight className="icon" size={16} />
                </Button>
            </div>
        </div>
    );
};