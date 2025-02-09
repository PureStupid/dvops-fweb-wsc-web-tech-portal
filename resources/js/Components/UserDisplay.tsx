import { Role, User } from '@/types/user.entity';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import DangerButton from './DangerButton';
import Modal from './Modal';
import SecondaryButton from './SecondaryButton';

const UserDisplay: React.FC<{ user: User }> = ({ user }) => {
    const { auth } = usePage().props;

    const { delete: destroy } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setUserToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete !== null) {
            destroy(route('users.destroy', { user: userToDelete }));
            setShowModal(false);
        }
    };

    return (
        <div className="h-full w-64 rounded-lg bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="flex flex-col items-center overflow-hidden px-4 py-6">
                <h5 className="mb-1 w-full break-words text-xl font-medium text-gray-900 dark:text-gray-100">
                    {user.name}
                </h5>
                <br />
                <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                    <MdEmail className="mr-2" />
                    {user.email}
                </span>
                <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                    <MdPhone className="mr-2" />
                    {user.phone_number}
                </span>
                {auth.user.role === Role.Lecturer && (
                    <>
                        <div className="mt-4 flex">
                            <Link href={route('users.edit', { user: user.id })}>
                                <SecondaryButton className="mr-2 bg-amber-400 hover:bg-yellow-200">
                                    Edit
                                </SecondaryButton>
                            </Link>
                            <SecondaryButton
                                className="mr-2 bg-red-400 hover:bg-red-200"
                                onClick={() => handleDeleteClick(user.id)}
                            >
                                Delete
                            </SecondaryButton>
                        </div>
                    </>
                )}
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-100">
                        Confirm Deletion
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this user?
                    </p>
                    <div className="mt-4 flex justify-end">
                        <SecondaryButton
                            className="mr-2 bg-gray-500 text-white hover:bg-gray-400"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </SecondaryButton>
                        <DangerButton
                            className="bg-red-600 text-white hover:bg-red-500"
                            onClick={confirmDelete}
                        >
                            Delete
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserDisplay;
