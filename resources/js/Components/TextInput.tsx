import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        trailingHelperText = '',
        leadingHelperText = '',

        ...props
    }: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean;
        trailingHelperText?: string;
        leadingHelperText?: string;
    },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="mt-1 flex">
            {leadingHelperText !== '' && (
                <span className="inline-flex items-center rounded rounded-e-none border border-e-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    {leadingHelperText}
                </span>
            )}
            <input
                {...props}
                ref={localRef}
                type={type}
                className={
                    'block w-full min-w-0 flex-1 rounded border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ' +
                    className +
                    (trailingHelperText !== '' ? ' rounded-e-none' : '') +
                    (trailingHelperText !== '' ? ' rounded-s-none' : '')
                }
            />
            {trailingHelperText !== '' && (
                <span className="inline-flex items-center rounded rounded-s-none border border-s-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    {trailingHelperText}
                </span>
            )}
        </div>
    );
});
