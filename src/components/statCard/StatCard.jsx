import React from 'react';
import {Card} from "../UI/card/Card.jsx";
import "./StatCard.css"

export const StatCard = ({ value, label, icon }) => {
    return (
        <Card className="stat-card">
            {icon && <div className="stat-icon">{icon}</div>}
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
            </div>
        </Card>
    );
};