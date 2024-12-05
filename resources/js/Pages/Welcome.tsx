import SecondaryButton from '@/Components/SecondaryButton';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-[url('/images/background.jpg')] text-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative flex w-full max-w-2xl grow flex-col px-6 lg:max-w-7xl">
                        <main className="mb-10 flex grow flex-col items-center justify-center text-center">
                            <h1 className="mb-6 text-7xl">
                                WSC Tech Management Portal
                            </h1>
                            <p className="mb-10">
                                Temasek Polytechnic | School of Informatics & IT
                            </p>
                            <SecondaryButton disabled={false}>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-sm"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="text-sm"
                                    >
                                        Log in
                                    </Link>
                                )}
                            </SecondaryButton>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
