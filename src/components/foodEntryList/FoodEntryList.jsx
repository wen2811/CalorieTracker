import React from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import {Button} from "../UI/button/Button.jsx";
import './FoodEntryList.css';

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

    const handleAddMealClick = (e) => {
        e.preventDefault();
        if (onAddMeal) onAddMeal();
    };

    const handleAddFoodClick = (e) => {
        e.preventDefault();
        if (onAddFood) onAddFood();
    };

    if (filteredEntries.length === 0) {
        return (
            <div className="empty-state">
                <p>Geen voedselregistraties voor deze dag</p>
                <div className="empty-actions">
                    <Button
                        variant="default"
                        onClick={handleAddMealClick}
                        type="button"
                    >
                        Maaltijd Toevoegen
                    </Button>
                    <Button
                        variant="default"
                        onClick={handleAddFoodClick}
                        type="button"
                    >
                        Voedsel Toevoegen
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="section-title">Voedingsregistraties</h2>
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
                        <span>{entry.quantity} {entry.unit}</span>
                        <span className="dot"></span>
                        <span className="entry-calories">{Math.round(entry.calories)} kcal</span>
                        <span className="dot"></span>
                        <span>{entry.time || ""}</span>
                    </div>
                </div>
                <div className="entry-actions">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(entry)}>
                        <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(entry.id)}>
                        <Trash2 size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onExpand(isExpanded ? null : entry.id)}
                    >
                        {isExpanded ? (
                            <ChevronUp size={16} />
                        ) : (
                            <ChevronDown size={16} />
                        )}
                    </Button>
                </div>
            </div>
            {isExpanded && (
                <div className="entry-details">
                    <div className="detail-item">
                        <div className="detail-label">Eiwitten</div>
                        <div className="detail-value">{Math.round(entry.protein)}g</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-label">Koolhydraten</div>
                        <div className="detail-value">{Math.round(entry.carbs)}g</div>
                    </div>
                    <div className="detail-item">
                        <div className="detail-label">Vetten</div>
                        <div className="detail-value">{Math.round(entry.fat)}g</div>
                    </div>
                </div>
            )}
        </div>
    );
};