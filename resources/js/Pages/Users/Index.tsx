import PrimaryButton from '@/Components/PrimaryButton';
import SuccessAlert from '@/Components/SuccessAlert';
import UserDisplay from '@/Components/UserDisplay';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Role, User } from '@/types/user.entity';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

const Index: React.FC<PageProps & { users: Record<string, User[]> }> = ({
    auth,
    flash,
    users,
}) => {
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
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {flash?.message && (
                        <SuccessAlert>{flash.message}</SuccessAlert>
                    )}
                    {auth.user.role === Role.Lecturer && (
                        <Link href={route('users.create')}>
                            <PrimaryButton>Add User</PrimaryButton>
                        </Link>
                    )}
                    <h2 className="mt-10 text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">
                        Students • {users[Role.Student].length}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-4">
                        {users[Role.Student].map((user) => {
                            return <UserDisplay user={user} key={user.id} />;
                        })}
                    </div>
                    <h2 className="mt-6 text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">
                        Lecturers • {users[Role.Lecturer].length}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-4">
                        {users[Role.Lecturer].map((user) => {
                            return <UserDisplay user={user} key={user.id} />;
                        })}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
