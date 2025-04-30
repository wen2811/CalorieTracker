import './Label.css';

export const Label = ({
                          children,
                          htmlFor,
                          className = '',
                          ...props
                      }) => {
    const labelClasses = [
        'label',
        className
    ].filter(Boolean).join(' ');

    return (
        <label
            htmlFor={htmlFor}
            className={labelClasses}
            {...props}
        >
            {children}
        </label>
    );
};