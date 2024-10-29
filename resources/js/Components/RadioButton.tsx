import React, { InputHTMLAttributes } from 'react';

const RadioButton: React.FC<
    InputHTMLAttributes<HTMLInputElement> & { label: string }
> = ({ className = '', label, ...props }) => {
    return (
        <div className="flex items-center rounded border border-gray-200 bg-white ps-4 dark:border-gray-700">
            <input
                {...props}
                type="radio"
                className={
                    'h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700 ' +
                    className
                }
            />
            <label
                htmlFor={props.id}
                className='class="w-full dark:text-gray-300" ms-2 py-4 text-sm font-medium text-gray-900'
            >
                {label}
            </label>
        </div>
    );
};
export default RadioButton;
