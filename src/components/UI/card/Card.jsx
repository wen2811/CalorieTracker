import './Card.css';
export const Card = ({
                         children,
                         className = '',
                         ...props
                     }) => {
    const cardClasses = [
        'card',
        className
    ].filter(Boolean).join(' ');

    return (
        <div
            className={cardClasses}
            {...props}
        >
            {children}
        </div>
    );
};