import './Input.css';

export const Input = ({
                          type = 'text',
                          className = '',
                          ...props
                      }) => {
    const inputClasses = [
        'input',
        className
    ].filter(Boolean).join(' ');

    return (
        <input
            type={type}
            className={inputClasses}
            {...props}
        />
    );
};