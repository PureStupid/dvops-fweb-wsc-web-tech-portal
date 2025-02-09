import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioButton from '@/Components/RadioButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Gender, Role, User } from '@/types/user.entity';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

const Edit: React.FC<{ user: User }> = ({ user }) => {
    type UserForm = Partial<User>;

    const { data, setData, errors, processing, patch } = useForm<UserForm>({
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone_number: user.phone_number,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.email && !data.email.includes('@')) {
            data.email +=
                Role.Student === user.role
                    ? '@student.tp.edu.sg'
                    : '@tp.edu.sg';
        }
        console.log(data);
        patch(route('users.update', { user: user.id }));
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />
            <div className="py-12">
                <div className="mx-auto max-w-xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        {' '}
                        <form
                            onSubmit={submit}
                            className="space-y-4"
                            aria-label="form"
                        >
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                    data-cy="name-error"
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={data.email?.split('@')[0]}
                                    className="block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    trailingHelperText={
                                        user.role === Role.Student
                                            ? '@student.tp.edu.sg'
                                            : '@tp.edu.sg'
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                    data-cy="email-error"
                                />
                            </div>
                            <div>
                                <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Gender
                                </div>
                                <div
                                    className="grid grid-cols-2 gap-x-2"
                                    id="genderRadioButtonGroup"
                                >
                                    <RadioButton
                                        id="femaleRadioButton"
                                        value="female"
                                        label="Female"
                                        name="gender"
                                        checked={data.gender === Gender.Female}
                                        onChange={(e) =>
                                            setData(
                                                'gender',
                                                e.target.value as Gender,
                                            )
                                        }
                                        required
                                    />
                                    <RadioButton
                                        id="maleRadioButton"
                                        value="male"
                                        label="Male"
                                        name="gender"
                                        checked={data.gender === Gender.Male}
                                        onChange={(e) =>
                                            setData(
                                                'gender',
                                                e.target.value as Gender,
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <InputError
                                    message={errors.gender}
                                    className="mt-2"
                                    data-cy="gender-error"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="phoneNumber"
                                    value="Phone Number"
                                />

                                <TextInput
                                    id="phoneNumber"
                                    type="number"
                                    name="phone_number"
                                    value={
                                        data.phone_number === undefined
                                            ? ''
                                            : data.phone_number
                                    }
                                    leadingHelperText="+65"
                                    className="block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            'phone_number',
                                            parseInt(e.target.value) ||
                                                undefined,
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.phone_number}
                                    className="mt-2"
                                    data-cy="phone-error"
                                />
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton
                                    className=""
                                    disabled={processing}
                                    data-cy="add-button"
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
