import Calendar from '@/Components/Calendar';
import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Mode, TrainingSession } from '@/types/training-session.entity';
import { formatDuration } from '@/utils/utils';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    MdAccessTimeFilled,
    MdCalendarToday,
    MdDescription,
    MdLocationPin,
} from 'react-icons/md';

const Index: React.FC<
    PageProps & {
        trainingSessions: Record<string, TrainingSession[]>;
    }
> = ({ trainingSessions }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSession, setSelectedSession] =
        useState<TrainingSession | null>(null);

    const virtualTrainingSessions = trainingSessions[Mode.Virtual].map(
        (trainingSession) => {
            const [startHours, startMinutes] = trainingSession.start_time
                .split(':')
                .map(Number);
            const [endHours, endMinutes] = trainingSession.end_time
                .split(':')
                .map(Number);
            const startDate = new Date(`${trainingSession.date}`);
            const endDate = new Date(`${trainingSession.date}`);
            startDate.setHours(startHours, startMinutes);
            endDate.setHours(endHours, endMinutes);

            return {
                id: trainingSession.id,
                title: trainingSession.title,
                start: startDate,
                end: endDate,
                extendedProps: {
                    description: trainingSession.description,
                    venue: trainingSession.venue,
                    date: trainingSession.date,
                },
            };
        },
    );

    const physicalTrainingSessions = trainingSessions[Mode.Physical].map(
        (trainingSession) => {
            const [startHours, startMinutes] = trainingSession.start_time
                .split(':')
                .map(Number);
            const [endHours, endMinutes] = trainingSession.end_time
                .split(':')
                .map(Number);
            const startDate = new Date(`${trainingSession.date}`);
            const endDate = new Date(`${trainingSession.date}`);
            startDate.setHours(startHours, startMinutes);
            endDate.setHours(endHours, endMinutes);
            return {
                id: trainingSession.id,
                title: trainingSession.title,
                start: startDate,
                end: endDate,
                extendedProps: {
                    description: trainingSession.description,
                    venue: trainingSession.venue,
                    date: trainingSession.date,
                },
            };
        },
    );

    const trainingSession = [
        ...virtualTrainingSessions,
        ...physicalTrainingSessions,
    ];

    const handleEventClick = (event: EventClickArg) => {
        const session = trainingSessions[Mode.Virtual]
            .concat(trainingSessions[Mode.Physical])
            .find((session) => session.id === Number(event.event.id));
        setSelectedSession(session || null);
        setShowModal(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <Calendar
                                events={trainingSession}
                                eventClick={handleEventClick}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                {selectedSession && (
                    <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-700">
                        <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                            {selectedSession.title}
                        </h2>
                        <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                            <MdDescription className="mr-2" />
                            {selectedSession.description}
                        </span>
                        <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                            <MdLocationPin className="mr-2" />
                            {selectedSession.venue}
                        </span>
                        <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                            <MdCalendarToday className="mr-2" />
                            {new Date(
                                selectedSession.date,
                            ).toLocaleDateString()}
                        </span>
                        <span className="mt-1 flex w-full items-center break-words text-sm text-gray-600 dark:text-gray-400">
                            <MdAccessTimeFilled className="mr-2" />
                            {selectedSession.start_time} -{' '}
                            {selectedSession.end_time}{' '}
                            {formatDuration(selectedSession.duration)}
                        </span>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
