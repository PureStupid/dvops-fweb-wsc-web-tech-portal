import {
    forwardRef,
    TextareaHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextArea(
    {
        className = '',
        isFocused = false,
        trailingHelperText = '',
        leadingHelperText = '',
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & {
        isFocused?: boolean;
        trailingHelperText?: string;
        leadingHelperText?: string;
    },
    ref,
) {
    const internalRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => internalRef.current);

    useEffect(() => {
        if (isFocused && internalRef.current) {
            internalRef.current.focus();
        }
    }, [isFocused]);

    return (
        <div className={`flex flex-col ${className}`}>
            {leadingHelperText && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {leadingHelperText}
                </span>
            )}
            <textarea
                {...props}
                ref={internalRef}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-blue-500"
            />
            {trailingHelperText && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {trailingHelperText}
                </span>
            )}
        </div>
    );
});
