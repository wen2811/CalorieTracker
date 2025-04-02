import React, {createContext, useContext, useState} from "react";
import { X } from 'lucide-react';
import './Dialog.css';

const DialogContext = createContext({
    open: false,
    setOpen: () => {},
});

export const Dialog = ({
                           children,
                           open,
                           onOpenChange,
                           ...props
                       }) => {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const handleOpenChange = (newOpen) => {
        if (!isControlled) {
            setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    return (
        <DialogContext.Provider value={{ open: isOpen, setOpen: handleOpenChange }}>
            {children}
        </DialogContext.Provider>
    );
};

export const DialogTrigger = ({
                                  children,
                                  ...props
                              }) => {
    const { setOpen } = useContext(DialogContext);

    return React.cloneElement(children, {
        ...props,
        onClick: (e) => {
            children.props.onClick?.(e);
            setOpen(true);
        },
    });
};

export const DialogContent = ({
                                  children,
                                  className = '',
                                  ...props
                              }) => {
    const { open, setOpen } = useContext(DialogContext);

    if (!open) return null;

    const contentClasses = [
        'dialog-content',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className="dialog-overlay" onClick={() => setOpen(false)}>
            <div
                className={contentClasses}
                onClick={(e) => e.stopPropagation()}
                {...props}
            >
                {children}
                <button
                    className="dialog-close"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                >
                    <X className="dialog-close-icon" />
                </button>
            </div>
        </div>
    );
};

export const DialogHeader = ({
                                 children,
                                 className = '',
                                 ...props
                             }) => {
    const headerClasses = [
        'dialog-header',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={headerClasses} {...props}>
            {children}
        </div>
    );
};

export const DialogTitle = ({
                                children,
                                className = '',
                                ...props
                            }) => {
    const titleClasses = [
        'dialog-title',
        className
    ].filter(Boolean).join(' ');

    return (
        <h2 className={titleClasses} {...props}>
            {children}
        </h2>
    );
};

export const DialogDescription = ({
                                      children,
                                      className = '',
                                      ...props
                                  }) => {
    const descriptionClasses = [
        'dialog-description',
        className
    ].filter(Boolean).join(' ');

    return (
        <p className={descriptionClasses} {...props}>
            {children}
        </p>
    );
};

export const DialogFooter = ({
                                 children,
                                 className = '',
                                 ...props
                             }) => {
    const footerClasses = [
        'dialog-footer',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={footerClasses} {...props}>
            {children}
        </div>
    );
};