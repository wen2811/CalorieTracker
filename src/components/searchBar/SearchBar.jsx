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
        <form onSubmit={handleSubmit} className="search-form">
            <Input
                type="text"
                placeholder="Search for recipes..."
                value={query}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Searching...' : (
                    <>
                        <Search className="icon" />
                        Search
                    </>
                )}
            </Button>
        </form>
    );
};