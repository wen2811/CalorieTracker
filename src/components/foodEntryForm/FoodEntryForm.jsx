import {Button} from "../UI/button/Button.jsx";
import React, {useState} from "react";
import {Input} from "../UI/input/Input.jsx";
import axios from "axios";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../UI/dialog/Dialog.jsx";
import {Label} from "../UI/label/Label.jsx";
import { useToast} from "../UI/toast/Toast.jsx";

export const FoodEntryForm = ({ isOpen, onClose, onAddEntry }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(100);
    const [unit, setUnit] = useState('g');
    const { toast } = useToast();

    const fetchNutritionData = async (name, quantity, unit) => {
        const appId = import.meta.env.VITE_EDAMAM_APP_ID;
        const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;
        //const accountUser = import.meta.env.VITE_EDAMAM_ACCOUNT_USER;

        const query = `${quantity}${unit} ${name}`;

        try {
            const response = await axios.get(
                `https://api.edamam.com/api/nutrition-data`,
                {
                    params: { app_id: appId,
                              app_key: appKey,
                              ingr:  query,
                    },
                    headers: {
                        'Accept': "application/json",
                      //  'Edamam-Account-User': accountUser,
                    },
                }
            );

            const { calories, totalNutrients } = response.data;

            return {
                calories: Math.round(calories),
                protein: Math.round(totalNutrients.PROCNT?.quantity || 0),
                carbs: Math.round(totalNutrients.CHOCDF?.quantity || 0),
                fat: Math.round(totalNutrients.FAT?.quantity || 0),
            };
        } catch (error) {
            console.error("Fout bij ophalen voedingswaarden:", error);
            return null;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const macros = await fetchNutritionData(name, quantity, unit);
        if (!macros) return;

        onAddEntry(name, quantity, unit, macros);

        setName('');
        setQuantity(100);
        onClose();

        toast({
            title: "Voedsel toegevoegd",
            description: `${name} (${quantity}${unit}) is toegevoegd aan je log.`,
            variant: "success",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Food Entry</DialogTitle>
                    <DialogDescription>
                        Enter the food details below to add a new entry to your log.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <Label htmlFor="name">Food Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Chicken Breast"
                                list="food-suggestions"
                                required
                            />

                        </div>
                        <div className="form-group">
                            <Label htmlFor="quantity">Quantity (in grams)</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="0"
                                step="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Entry</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};