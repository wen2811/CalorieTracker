import React from 'react'
import {Button} from "../UI/button/Button.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./DateRangeSelector.css"
import {Input} from "../UI/input/Input.jsx";

export const DateRangeSelector = ({
                                      startDate,
                                      endDate,
                                      onRangeChange
                                  }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const moveRange = (direction) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = end.getTime() - start.getTime();
        const days = diff / (1000 * 60 * 60 * 24);

        let newStart, newEnd;

        if (direction === "prev") {
            newStart = new Date(start);
            newStart.setDate(newStart.getDate() - days - 1);
            newEnd = new Date(start);
            newEnd.setDate(newEnd.getDate() - 1);
        } else {
            newStart = new Date(end);
            newStart.setDate(newStart.getDate() + 1);
            newEnd = new Date(end);
            newEnd.setDate(newEnd.getDate() + days + 1);
        }

        onRangeChange(
            newStart.toISOString().split("T")[0],
            newEnd.toISOString().split("T")[0]
        );
    };

    const handleStartDateChange = (e) => {
        const newStart = e.target.value;
        onRangeChange(newStart, endDate);
    };

    const handleEndDateChange = (e) => {
        const newEnd = e.target.value;
        onRangeChange(startDate, newEnd);
    };

    return (
        <div className="date-range-selector">
            <div className="date-inputs">
                <div className="date-input">
                    <label>Start</label>
                    <Input
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="date-input">
                    <label>End</label>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>

            <div className="navigation-buttons">
                <Button variant="ghost" size="sm" onClick={() => moveRange("prev")}>
                    <ChevronLeft className="icon" />
                    Previous
                </Button>
                <Button variant="ghost" size="sm" onClick={() => moveRange("next")}>
                    Next
                    <ChevronRight className="icon" />
                </Button>
            </div>
        </div>
    );
};