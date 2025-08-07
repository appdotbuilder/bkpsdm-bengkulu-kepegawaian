import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="SIMPEG BKPSDM Kota Bengkulu">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">👥</span>
                            </div>
                            <span className="font-semibold text-lg text-blue-900 dark:text-blue-100">SIMPEG BKPSDM</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-4 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors dark:text-blue-300 dark:hover:text-blue-100"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full max-w-6xl flex-col lg:flex-row lg:items-center lg:space-x-12">
                    {/* Hero Content */}
                    <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 dark:text-white">
                            📊 <span className="text-blue-600">SIMPEG</span>
                        </h1>
                        <h2 className="text-xl lg:text-2xl text-gray-700 mb-8 dark:text-gray-200">
                            Sistem Informasi Kepegawaian<br />
                            <span className="font-semibold text-blue-600">BKPSDM Kota Bengkulu</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed dark:text-gray-300">
                            Kelola data kepegawaian dengan mudah dan efisien. Sistem terintegrasi untuk 
                            manajemen pegawai, mutasi, promosi, dan pengembangan SDM aparatur.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {auth.user ? (
                                <Link
                                    href={route('employees.index')}
                                    className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                                >
                                    👥 Lihat Data Pegawai
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                                    >
                                        🚀 Mulai Sekarang
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all hover:scale-105 shadow-lg dark:bg-gray-800 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-700"
                                    >
                                        📝 Daftar Akun
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-xl p-8 dark:bg-gray-800">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center dark:text-white">
                                ✨ Fitur Unggulan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <div className="text-3xl mb-3">👥</div>
                                    <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Data Pegawai</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Kelola informasi lengkap pegawai</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                                    <div className="text-3xl mb-3">🔍</div>
                                    <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Pencarian</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Cari & filter data dengan mudah</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                    <div className="text-3xl mb-3">🛡️</div>
                                    <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Multi Role</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Akses berdasarkan peran pengguna</p>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                                    <div className="text-3xl mb-3">📊</div>
                                    <h4 className="font-semibold text-gray-900 mb-2 dark:text-white">Laporan</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Generate laporan kepegawaian</p>
                                </div>
                            </div>

                            {/* Role Info */}
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <h4 className="font-semibold text-gray-900 mb-3 dark:text-white">🎯 Tingkatan Akses:</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-red-500">👑</span>
                                        <span className="font-medium">Superadmin:</span>
                                        <span className="text-gray-600 dark:text-gray-300">Akses penuh sistem</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-blue-500">⚡</span>
                                        <span className="font-medium">Admin:</span>
                                        <span className="text-gray-600 dark:text-gray-300">Kelola semua data pegawai</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-500">📝</span>
                                        <span className="font-medium">Pengelola:</span>
                                        <span className="text-gray-600 dark:text-gray-300">Tambah, edit & lihat data</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500">👁️</span>
                                        <span className="font-medium">User:</span>
                                        <span className="text-gray-600 dark:text-gray-300">Hanya melihat data pegawai</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                        <span>🏢</span>
                        <span>BKPSDM Kota Bengkulu</span>
                    </div>
                    <p>Sistem Informasi Kepegawaian Modern untuk Pengelolaan SDM yang Efektif</p>
                </footer>
            </div>
        </>
    );
}