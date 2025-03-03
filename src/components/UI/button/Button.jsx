import './Button.css';

export const Button = ({
                           children,
                           type = 'button',
                           variant = 'default',
                           size = 'default',
                           className = '',
                           ...props
                       }) => {
    const buttonClasses = [
        'button',
        `button-${variant}`,
        `button-${size}`,
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={buttonClasses}
            {...props}
        >
            {children}
        </button>
    );
};