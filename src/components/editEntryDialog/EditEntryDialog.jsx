import React from "react";
import {Button} from "../UI/button/Button.jsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../UI/dialog/Dialog.jsx";
import {Input} from "../UI/input/Input.jsx";
import "./EditEntryDialog.css";

export const EditEntryDialog = ({
                                    entry,
                                    isOpen,
                                    onClose,
                                    onSave,
                                    onChange
                                }) => {
    if (!entry) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Voedingsmoment bewerken</DialogTitle>
                    <DialogDescription>
                        Pas gerust iets aan — kleine tweaks, groot verschil.
                    </DialogDescription>
                </DialogHeader>
                <div className="edit-form">
                    <div className="form-group">
                        <label htmlFor="edit-name">Wat heb je gegeten?</label>
                        <Input
                            id="edit-name"
                            value={entry.name}
                            onChange={(e) => onChange({ ...entry, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-quantity">Hoeveelheid ({entry.unit})</label>
                        <Input
                            id="edit-quantity"
                            type="number"
                            value={entry.quantity}
                            min="0"
                            step="0.1"
                            onChange={(e) => onChange({ ...entry, quantity: parseFloat(e.target.value) })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Terug
                    </Button>
                    <Button onClick={onSave}>Opslaan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};