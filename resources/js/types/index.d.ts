export enum Gender {
    Female = 'female',
    Male = 'male',
}

export enum Role {
    Lecturer = 'lecturer',
    Student = 'student',
}

export interface User {
    id: number;
    name: string;
    email: string;
    gender: Gender;
    phone_number: number;
    avatar: string;
    role: Role;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
