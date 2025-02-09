export const formatDuration = (duration: string) => {
    const [hours, minutes] = duration.split(':').map(Number);

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hours`;

    return `${hours} hours and ${minutes} minutes`;
};
