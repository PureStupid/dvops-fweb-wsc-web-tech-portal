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

const Add: React.FC = () => {
    const { data, setData, errors, processing, post } = useForm<
        Partial<TrainingSession>
    >({
        title: '',
        description: '',
        mode: Mode.Virtual,
        venue: '',
        date: undefined,
        start_time: '',
        end_time: '',
        duration: '',
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
        console.log(data);
        post(route('training-sessions.store'));
        console.log(errors);
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Training Session
                </h2>
            }
        >
            <Head title="Add Training Session" />
            <div className="mx-auto max-w-lg sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4">
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        id="title"
                        className="w-full"
                        value={data.title}
                        maxLength={255}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                    />
                    <InputError message={errors.title} className="mt-2" />
                    <InputLabel htmlFor="description" value="Description" />
                    <TextArea
                        id="description"
                        className="w-full"
                        value={data.description}
                        maxLength={2000}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />
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
                                setData('mode', e.target.value as Mode)
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
                                setData('mode', e.target.value as Mode)
                            }
                            required
                        />
                    </div>
                    <InputError message={errors.mode} className="mt-2" />
                    <InputLabel htmlFor="venue" value="Venue" />
                    <TextInput
                        id="venue"
                        className="w-full"
                        value={data.venue}
                        onChange={(e) => setData('venue', e.target.value)}
                        required
                    />
                    <InputError message={errors.venue} className="mt-2" />
                    <InputLabel htmlFor="date" value="Date" />
                    <TextInput
                        id="date"
                        type="date"
                        className="w-full"
                        value={
                            data.date
                                ? data.date.toISOString().split('T')[0]
                                : ''
                        }
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) =>
                            setData('date', new Date(e.target.value))
                        }
                        required
                    />
                    <InputError message={errors.date} className="mt-2" />
                    <InputLabel htmlFor="start_time" value="Start Time" />
                    <TextInput
                        id="startTime"
                        type="time"
                        className="w-full"
                        value={data.start_time}
                        min={'09:00'}
                        max={'18:00'}
                        step={'900'} // 15 minutes
                        onChange={(e) => setData('start_time', e.target.value)}
                        required
                    />
                    <InputError message={errors.start_time} className="mt-2" />
                    <InputLabel htmlFor="end_time" value="End Time" />
                    <TextInput
                        id="endTime"
                        type="time"
                        className="w-full"
                        value={data.end_time}
                        min={
                            data.start_time
                                ? calculateMinEndTime(data.start_time)
                                : '09:15'
                        }
                        max={'18:00'}
                        step={'900'} // 15 minutes
                        onChange={(e) => setData('end_time', e.target.value)}
                        required
                    />
                    <div className="flex justify-end">
                        <PrimaryButton
                            id="submit"
                            className=""
                            disabled={processing}
                        >
                            Add
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};
export default Add;
