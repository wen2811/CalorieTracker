import React from 'react';
import {Card} from "../UI/card/Card.jsx";
import "./StatCard.css";

export const StatCard = ({ value, title, unit, icon, color }) => {
    const iconClasses = [
        'stat-icon',
        color ? `stat-icon-${color}` : ''
    ].filter(Boolean).join(' ');

    return (
        <Card className="stat-card">
            {icon && <div className={iconClasses}>{icon}</div>}
            <div className="stat-content">
                <div className="stat-value">{value} {unit}</div>
                <div className="stat-label">{title}</div>
            </div>
        </Card>
    );
};