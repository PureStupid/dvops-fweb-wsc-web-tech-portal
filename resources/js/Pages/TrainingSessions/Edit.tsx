import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioButton from '@/Components/RadioButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Mode, TrainingSession } from '@/types/training-session.entity';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

const Edit: React.FC<{ trainingSession: TrainingSession }> = ({
    trainingSession: trainingSession,
}) => {
    type TrainingSessionForm = Partial<TrainingSession>;

    const { data, setData, errors, processing, patch } =
        useForm<TrainingSessionForm>({
            title: trainingSession.title,
            description: trainingSession.description,
            mode: trainingSession.mode,
            venue: trainingSession.venue,
            date: new Date(trainingSession.date),
            start_time: trainingSession.start_time,
            end_time: trainingSession.end_time,
            duration: trainingSession.duration,
        });

    const calculateDuration = (startTime: string, endTime: string): string => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDate = new Date();
        startDate.setHours(startHours, startMinutes);

        const endDate = new Date();
        endDate.setHours(endHours, endMinutes);

        const durationInMinutes =
            (endDate.getTime() - startDate.getTime()) / 60000;
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;

        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const calculateMinEndTime = (startTime: string): string => {
        // Minimum end time is 15 minutes after the start time
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes);
        startDate.setMinutes(startDate.getMinutes() + 15);

        const minEndHours = String(startDate.getHours()).padStart(2, '0');
        const minEndMinutes = String(startDate.getMinutes()).padStart(2, '0');
        return `${minEndHours}:${minEndMinutes}`;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.start_time && data.end_time) {
            data.duration = calculateDuration(data.start_time, data.end_time);
        }
        patch(
            route('training-sessions.update', {
                training_session: trainingSession.id,
            }),
        );
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Training
                </h2>
            }
        >
            <Head title="Edit Training" />
            <div className="py-12">
                <div className="mx-auto max-w-xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <form onSubmit={submit} className="space-y-4">
                            <div className="flex space-x-3">
                                <div className="flex-1">
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        className="w-full"
                                        value={data.title}
                                        maxLength={255}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />
                                <TextArea
                                    id="description"
                                    className="w-full"
                                    value={data.description}
                                    maxLength={2000}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Mode
                                </div>
                                <div
                                    className="grid grid-cols-2 gap-x-2"
                                    id="modeRadioButtonGroup"
                                >
                                    <RadioButton
                                        id="virtualRadioButton"
                                        value="virtual"
                                        label="Virtual"
                                        name="mode"
                                        checked={data.mode === Mode.Virtual}
                                        onChange={(e) =>
                                            setData(
                                                'mode',
                                                e.target.value as Mode,
                                            )
                                        }
                                        required
                                    />
                                    <RadioButton
                                        id="physicalRadioButton"
                                        value="physical"
                                        label="Physical"
                                        name="mode"
                                        checked={data.mode === Mode.Physical}
                                        onChange={(e) =>
                                            setData(
                                                'mode',
                                                e.target.value as Mode,
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.mode}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="venue" value="Venue" />
                                <TextInput
                                    id="venue"
                                    className="w-full"
                                    value={data.venue}
                                    onChange={(e) =>
                                        setData('venue', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.venue}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="date" value="Date" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    className="w-full"
                                    value={
                                        data.date
                                            ? data.date
                                                  .toISOString()
                                                  .split('T')[0]
                                            : ''
                                    }
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) =>
                                        setData(
                                            'date',
                                            new Date(e.target.value),
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="start_time"
                                    value="Start Time"
                                />
                                <TextInput
                                    id="start_time"
                                    type="time"
                                    className="w-full"
                                    value={data.start_time}
                                    min={'09:00'}
                                    max={'18:00'}
                                    step={'900'} // 15 minutes
                                    onChange={(e) =>
                                        setData('start_time', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.start_time}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="end_time"
                                    value="End Time"
                                />
                                <TextInput
                                    id="end_time"
                                    type="time"
                                    className="w-full"
                                    value={data.end_time}
                                    min={
                                        data.start_time
                                            ? calculateMinEndTime(
                                                  data.start_time,
                                              )
                                            : '09:15'
                                    }
                                    max={'18:00'}
                                    step={'900'} // 15 minutes
                                    onChange={(e) =>
                                        setData('end_time', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.end_time}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton
                                    className=""
                                    disabled={processing}
                                >
                                    Edit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};
export default Edit;
