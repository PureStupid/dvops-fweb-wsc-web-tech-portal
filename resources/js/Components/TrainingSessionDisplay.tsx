import { TrainingSession } from '@/types/training-session.entity';
import { formatDuration } from '@/utils/utils';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    MdAccessTimeFilled,
    MdCalendarToday,
    MdLocationPin,
} from 'react-icons/md';
import DangerButton from './DangerButton';
import Modal from './Modal';
import SecondaryButton from './SecondaryButton';

const TrainingSessionDisplay: React.FC<{
    trainingSession: TrainingSession;
}> = ({ trainingSession }) => {
    const { delete: destroy } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState<number | null>(null);

    const handleDeleteClick = (id: number) => {
        setSessionToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (sessionToDelete !== null) {
            destroy(
                route('training-sessions.destroy', {
                    training_session: sessionToDelete,
                }),
            );
            setShowModal(false);
        }
    };

    return (
        <div className="h-full w-64 rounded-lg bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="flex flex-col items-center overflow-hidden px-4 py-6">
                <h5 className="mb-1 w-full break-words text-xl font-medium text-gray-900 dark:text-gray-100">
                    {trainingSession.title}
                </h5>
                <br />
                <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                    <MdLocationPin className="mr-2" />
                    {trainingSession.venue}
                </span>
                <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                    <MdCalendarToday className="mr-2" />
                    {new Date(trainingSession.date).toLocaleDateString()}
                </span>
                <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                    <MdAccessTimeFilled className="mr-2" />
                    {trainingSession.start_time} - {trainingSession.end_time} (
                    {formatDuration(trainingSession.duration)})
                </span>
                <div className="mt-4 flex">
                    <Link
                        href={route('training-sessions.edit', {
                            training_session: trainingSession,
                        })}
                    >
                        <SecondaryButton className="mr-2 bg-amber-400 hover:bg-yellow-200">
                            Edit
                        </SecondaryButton>
                    </Link>
                    <SecondaryButton
                        className="mr-2 bg-red-400 hover:bg-red-200"
                        onClick={() => handleDeleteClick(trainingSession.id)}
                    >
                        Delete
                    </SecondaryButton>
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-semibold leading-tight text-gray-900 dark:text-gray-100">
                        Confirm Deletion
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this training session?
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

export default TrainingSessionDisplay;
