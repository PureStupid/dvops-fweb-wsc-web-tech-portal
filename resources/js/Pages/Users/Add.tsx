import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';

const Index: React.FC<PageProps> = () => {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add User
                </h2>
            }
        >
            <Head title="Add User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8"></div>
            </div>
        </Authenticated>
    );
};

export default Index;
