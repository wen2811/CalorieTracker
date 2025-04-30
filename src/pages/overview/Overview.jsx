import React, { useState, useEffect } from "react";
import { DateRangeSelector } from "../../components/dateRangeSelector/DateRangeSelector.jsx";
import { StatCard } from "../../components/statCard/StatCard.jsx";
import { Card } from "../../components/UI/card/Card.jsx";
import { Flame, Beef, Pizza, Droplet } from "lucide-react";
import { Button } from "../../components/UI/button/Button.jsx";
import "./Overview.css";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export const Overview = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 6);

    const [startDate, setStartDate] = useState(oneWeekAgo.toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);
    const [periodEntries, setPeriodEntries] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [periodStats, setPeriodStats] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        avgCalories: 0,
        avgProtein: 0,
        avgCarbs: 0,
        avgFat: 0,
        daysWithEntries: 0
    });

    const handleViewLastWeek = () => {
        const newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 6);
        setStartDate(newStartDate.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
    };

    const handleViewLastMonth = () => {
        const newStartDate = new Date(today);
        newStartDate.setDate(today.getDate() - 29);
        setStartDate(newStartDate.toISOString().split("T")[0]);
        setEndDate(today.toISOString().split("T")[0]);
    };

    const handleRangeChange = (newStart, newEnd) => {
        setStartDate(newStart);
        setEndDate(newEnd);
    };

    const formatDateForDisplay = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("nl-NL", { month: "short", day: "numeric" });
    };

    useEffect(() => {
        const loadEntriesForDateRange = () => {
            const allEntries = [];
            const daysWithData = new Set();
            const dailyData = {};
            const chartDataArray = [];

            const currentDate = new Date(startDate);
            const lastDate = new Date(endDate);

            while (currentDate <= lastDate) {
                const dateString = currentDate.toISOString().split("T")[0];
                const entriesForDay = JSON.parse(localStorage.getItem(`entries-${dateString}`) || "[]");

                if (entriesForDay.length > 0) {
                    allEntries.push(...entriesForDay);
                    daysWithData.add(dateString);

                    const dayTotals = entriesForDay.reduce(
                        (acc, entry) => ({
                            calories: acc.calories + entry.calories,
                            protein: acc.protein + entry.protein,
                            carbs: acc.carbs + entry.carbs,
                            fat: acc.fat + entry.fat
                        }),
                        { calories: 0, protein: 0, carbs: 0, fat: 0 }
                    );

                    dailyData[dateString] = {
                        date: formatDateForDisplay(dateString),
                        calories: Math.round(dayTotals.calories),
                        protein: Math.round(dayTotals.protein),
                        carbs: Math.round(dayTotals.carbs),
                        fat: Math.round(dayTotals.fat)
                    };
                } else {
                    dailyData[dateString] = {
                        date: formatDateForDisplay(dateString),
                        calories: 0,
                        protein: 0,
                        carbs: 0,
                        fat: 0
                    };
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }

            const sortedDates = Object.keys(dailyData).sort();
            sortedDates.forEach(date => chartDataArray.push(dailyData[date]));

            setPeriodEntries(allEntries);
            setChartData(chartDataArray);

            const totals = allEntries.reduce(
                (acc, entry) => ({
                    totalCalories: acc.totalCalories + entry.calories,
                    totalProtein: acc.totalProtein + entry.protein,
                    totalCarbs: acc.totalCarbs + entry.carbs,
                    totalFat: acc.totalFat + entry.fat
                }),
                { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
            );

            const daysWithEntries = daysWithData.size;

            setPeriodStats({
                ...totals,
                avgCalories: daysWithEntries > 0 ? Math.round(totals.totalCalories / daysWithEntries) : 0,
                avgProtein: daysWithEntries > 0 ? Math.round(totals.totalProtein / daysWithEntries) : 0,
                avgCarbs: daysWithEntries > 0 ? Math.round(totals.totalCarbs / daysWithEntries) : 0,
                avgFat: daysWithEntries > 0 ? Math.round(totals.totalFat / daysWithEntries) : 0,
                daysWithEntries,
                daysInRange:
                    Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
            });
        };

        loadEntriesForDateRange();
    }, [startDate, endDate]);

    return (
        <div className="overview-page">
            <h1>Overzicht</h1>
            <p>Inzicht in je voedingspatroon over tijd</p>

            <div className="date-controls-container">
                <DateRangeSelector
                    startDate={startDate}
                    endDate={endDate}
                    onRangeChange={handleRangeChange}
                />

                <div className="preset-buttons">
                    <Button variant="outline" onClick={handleViewLastWeek}>
                        Laatste 7 dagen
                    </Button>
                    <Button variant="outline" onClick={handleViewLastMonth}>
                        Laatste 30 dagen
                    </Button>
                </div>
            </div>

            <div className="stats-section">
                <h2>Gemiddeld per dag</h2>
                <p className="stats-subtitle">
                    Gebaseerd op {periodStats.daysWithEntries} geregistreerde dag{periodStats.daysWithEntries !== 1 ? 'en' : ''}
                </p>

                <div className="stats-grid">
                    <StatCard title="Calorieën" value={periodStats.avgCalories} unit="kcal" icon={<Flame />} color="primary" />
                    <StatCard title="Eiwitten" value={periodStats.avgProtein} unit="g" icon={<Beef />} color="success" />
                    <StatCard title="Koolhydraten" value={periodStats.avgCarbs} unit="g" icon={<Pizza />} color="warning" />
                    <StatCard title="Vetten" value={periodStats.avgFat} unit="g" icon={<Droplet />} color="danger" />
                </div>
            </div>

            <div className="stats-section">
                <h2>Totaal deze periode</h2>
                <p className="stats-subtitle">Alles bij elkaar voor de geselecteerde periode</p>

                <div className="stats-grid">
                    <StatCard title="Calorieën" value={periodStats.totalCalories} unit="kcal" icon={<Flame />} color="primary" />
                    <StatCard title="Eiwitten" value={periodStats.totalProtein} unit="g" icon={<Beef />} color="success" />
                    <StatCard title="Koolhydraten" value={periodStats.totalCarbs} unit="g" icon={<Pizza />} color="warning" />
                    <StatCard title="Vetten" value={periodStats.totalFat} unit="g" icon={<Droplet />} color="danger" />
                </div>
            </div>

            <Card className="nutrition-trends">
                <h2 className="card-title">Trends in voeding</h2>
                <p className="card-description">Dagelijkse inname per categorie</p>

                {chartData.length > 0 ? (
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                data={chartData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="calories" name="Calorieën" stroke="#E84A7F" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="protein" name="Eiwitten (g)" stroke="#22c55e" />
                                <Line type="monotone" dataKey="carbs" name="Koolhydraten (g)" stroke="#f59e0b" />
                                <Line type="monotone" dataKey="fat" name="Vetten (g)" stroke="#ef4444" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="chart-placeholder">
                        Nog geen gegevens voor deze periode — begin met loggen!
                    </div>
                )}
            </Card>
        </div>
    );
};