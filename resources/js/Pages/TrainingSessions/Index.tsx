import PrimaryButton from '@/Components/PrimaryButton';
import SuccessAlert from '@/Components/SuccessAlert';
import TrainingSessionDisplay from '@/Components/TrainingSessionDisplay';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Mode, TrainingSession } from '@/types/training-session.entity';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

const Index: React.FC<
    PageProps & {
        trainingSessions: Record<string, TrainingSession[]>;
    }
> = ({ flash, trainingSessions }) => {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Training Sessions
                </h2>
            }
        >
            <Head title="Training Sessions" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    {flash?.message && (
                        <SuccessAlert>{flash.message}</SuccessAlert>
                    )}
                    <Link href={route('training-sessions.create')}>
                        <PrimaryButton>Add Training Session</PrimaryButton>
                    </Link>
                    <h2 className="mt-10 text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">
                        Physical • {trainingSessions[Mode.Physical].length}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-4">
                        {trainingSessions[Mode.Physical].map(
                            (trainingSession) => (
                                <TrainingSessionDisplay
                                    trainingSession={trainingSession}
                                    key={trainingSession.id}
                                />
                            ),
                        )}
                    </div>
                    <h2 className="mt-10 text-xl font-bold text-gray-900 md:text-2xl dark:text-gray-100">
                        Virtual • {trainingSessions[Mode.Virtual].length}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-4">
                        {trainingSessions[Mode.Virtual].map(
                            (trainingSession) => (
                                <TrainingSessionDisplay
                                    trainingSession={trainingSession}
                                    key={trainingSession.id}
                                />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
