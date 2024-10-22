import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    // laravelVersion,
    // phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-[url('/images/background.jpg')] text-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative flex w-full max-w-2xl grow flex-col px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img
                                    src="/images/logo.png"
                                    alt="WSC logo"
                                    height={100}
                                    width={100}
                                />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                )}
                            </nav>
                        </header>

                        <main className="mb-10 flex grow flex-col items-center justify-center text-center">
                            <h1 className="mb-6 text-7xl">
                                WSC Tech<br></br>Management Portal
                            </h1>
                            <p>
                                Temasek Polytechnic | School of Informatics & IT
                            </p>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
