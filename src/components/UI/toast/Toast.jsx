import {createContext, useContext, useState} from "react";
import { X } from "lucide-react";
import './Toast.css';

const ToastContext = createContext({
    toasts: [],
    addToast: () => {},
    removeToast: () => {},
});

let toastCount = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        const id = `toast-${toastCount++}`;
        const newToast = { ...toast, id };
        setToasts((prev) => [...prev, newToast]);

        // Auto dismiss
        if (toast.duration !== Infinity) {
            setTimeout(() => {
                removeToast(id);
            }, toast.duration || 5000);
        }

        return id;
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    const toast = (props) => {
        return context.addToast(props);
    };

    return {
        toast,
        dismiss: context.removeToast,
        toasts: context.toasts,
    };
};

const ToastContainer = () => {
    const { toasts, removeToast } = useContext(ToastContext);

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

const Toast = ({ toast, onClose }) => {
    const { title, description, variant = 'default' } = toast;

    const toastClasses = [
        'toast',
        `toast-${variant}`,
    ].filter(Boolean).join(' ');

    return (
        <div className={toastClasses}>
            <div className="toast-content">
                {title && <div className="toast-title">{title}</div>}
                {description && <div className="toast-description">{description}</div>}
            </div>
            <button className="toast-close" onClick={onClose}>
                <X className="toast-close-icon" />
            </button>
        </div>
    );
};

export const Toaster = () => {
    return null; // The ToastContainer is rendered by the ToastProvider
};