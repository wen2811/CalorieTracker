import React from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import {Button} from "../UI/button/Button.jsx";
import './FoodEntryList.css'

export const FoodEntryList = ({
                                  entries,
                                  selectedDate,
                                  expandedEntry,
                                  onExpandEntry,
                                  onEditEntry,
                                  onDeleteEntry,
                                  onAddMeal,
                                  onAddFood
                              }) => {
    const filteredEntries = entries.filter(entry => entry.date === selectedDate);

    if (filteredEntries.length === 0) {
        return (
            <div className="empty-state">
                <p>No food entries for this day</p>
                <div className="empty-actions">
                    <Button variant="outline" onClick={onAddMeal}>
                        Add Meal
                    </Button>
                    <Button variant="outline" onClick={onAddFood}>
                        Add Food
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="entries-list">
            {filteredEntries.map((entry) => (
                <FoodEntryItem
                    key={entry.id}
                    entry={entry}
                    isExpanded={expandedEntry === entry.id}
                    onExpand={onExpandEntry}
                    onEdit={onEditEntry}
                    onDelete={onDeleteEntry}
                />
            ))}
        </div>
    );
};

const FoodEntryItem = ({ entry, isExpanded, onExpand, onEdit, onDelete }) => {
    return (
        <div className="entry-item">
            <div className="entry-content">
                <div
                    className="entry-summary"
                    onClick={() => onExpand(isExpanded ? null : entry.id)}
                >
                    <div className="entry-name">{entry.name}</div>
                    <div className="entry-info">
                        {entry.quantity} {entry.unit} • {Math.round(entry.calories)} kcal
                    </div>
                </div>
                <div className="entry-actions">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(entry)}>
                        <Pencil className="icon" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(entry.id)}>
                        <Trash2 className="icon" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onExpand(isExpanded ? null : entry.id)}
                    >
                        {isExpanded ? (
                            <ChevronUp className="icon" />
                        ) : (
                            <ChevronDown className="icon" />
                        )}
                    </Button>
                </div>
            </div>
            {isExpanded && (
                <div className="entry-details">
                    <div className="detail-item">
                        <div className="detail-label">Protein</div>
                        <div className="detail-value">{Math.round(entry.protein)}g</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-label">Carbs</div>
                        <div className="detail-value">{Math.round(entry.carbs)}g</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-label">Fat</div>
                        <div className="detail-value">{Math.round(entry.fat)}g</div>
                    </div>
                </div>
            )}
        </div>
    );
};