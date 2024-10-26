import PrimaryButton from '@/Components/PrimaryButton';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Role } from '@/types/user.entity';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

const Index: React.FC<PageProps> = ({ auth }) => {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {auth.user.role === Role.Lecturer && (
                        <Link href={route('users.create')}>
                            <PrimaryButton>Add User</PrimaryButton>
                        </Link>
                    )}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
