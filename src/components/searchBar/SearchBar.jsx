import React from "react";
import {Button} from "../UI/button/Button.jsx";
import {Input} from "../UI/input/Input.jsx";
import { Search } from 'lucide-react';
import './SearchBar.css';

export const SearchBar = ({ query, onChange, onSearch, isLoading }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar-form">
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Waar heb je trek in vandaag? ✨"
                    value={query}
                    onChange={(e) => onChange(e.target.value)}
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="search-button"
                >
                    {isLoading ? (
                        'Zoeken...'
                    ) : (
                        <>
                            Zoeken
                            <Search className="icon" size={16} />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};