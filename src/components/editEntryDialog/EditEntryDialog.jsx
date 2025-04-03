import React from "react";
import {Button} from "../UI/button/Button.jsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../UI/dialog/Dialog.jsx";
import {Input} from "../UI/input/Input.jsx";
import "./EditEntryDialog.css"

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
                    <DialogTitle>Edit Food Entry</DialogTitle>
                    <DialogDescription>
                        Update the details of your food entry.
                    </DialogDescription>
                </DialogHeader>
                <div className="edit-form">
                    <div className="form-group">
                        <label htmlFor="edit-name">Food Name</label>
                        <Input
                            id="edit-name"
                            value={entry.name}
                            onChange={(e) => onChange({ ...entry, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-quantity">Quantity ({entry.unit})</label>
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
                        Cancel
                    </Button>
                    <Button onClick={onSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};