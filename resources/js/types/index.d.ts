import { User } from './user.entity';
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        message?: string;
        [key: string]: unknown; // Allow for other flash messages if needed
    };
};
