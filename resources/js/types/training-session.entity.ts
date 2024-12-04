export enum Mode {
    Virtual = 'virtual',
    Physical = 'physical',
}

export interface TrainingSession {
    id: number;
    title: string;
    description: string;
    mode: Mode;
    venue: string;
    date: Date;
    start_time: string;
    end_time: string;
    duration: string;
}
