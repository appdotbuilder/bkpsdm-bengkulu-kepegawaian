import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard SIMPEG" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">
                        👋 Selamat datang, {user.name}!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sistem Informasi Kepegawaian BKPSDM Kota Bengkulu
                    </p>
                </div>

                {/* Role Info */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>🎯</span>
                            <span>Tingkat Akses Anda</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl">
                                {user.role === 'superadmin' && '👑'}
                                {user.role === 'admin' && '⚡'}
                                {user.role === 'pengelola' && '📝'}
                                {user.role === 'user' && '👁️'}
                            </div>
                            <div>
                                <p className="text-lg font-semibold capitalize">
                                    {user.role === 'superadmin' && 'Super Administrator'}
                                    {user.role === 'admin' && 'Administrator'}
                                    {user.role === 'pengelola' && 'Pengelola'}
                                    {user.role === 'user' && 'User'}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {user.role === 'superadmin' && 'Akses penuh ke seluruh sistem'}
                                    {user.role === 'admin' && 'Kelola semua data kepegawaian'}
                                    {user.role === 'pengelola' && 'Tambah, edit, dan lihat data pegawai'}
                                    {user.role === 'user' && 'Hanya dapat melihat data pegawai'}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* View Employees */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">👥</span>
                                <span>Data Pegawai</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                Lihat dan kelola data kepegawaian
                            </p>
                            <Link href={route('employees.index')}>
                                <Button className="w-full">
                                    Lihat Data Pegawai
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Add Employee (for authorized users) */}
                    {(user.role === 'superadmin' || user.role === 'admin' || user.role === 'pengelola') && (
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span className="text-2xl">➕</span>
                                    <span>Tambah Pegawai</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Tambahkan data pegawai baru
                                </p>
                                <Link href={route('employees.create')}>
                                    <Button className="w-full">
                                        Tambah Pegawai
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}

                    {/* Statistics */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">📊</span>
                                <span>Statistik</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                Lihat statistik kepegawaian
                            </p>
                            <Link href={route('employees.index')}>
                                <Button variant="outline" className="w-full">
                                    Lihat Statistik
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity or Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span className="text-xl">ℹ️</span>
                            <span>Informasi Sistem</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <span className="text-green-500">✅</span>
                                <div>
                                    <p className="font-medium">Sistem Aktif</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        SIMPEG BKPSDM Kota Bengkulu beroperasi normal
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-500">📋</span>
                                <div>
                                    <p className="font-medium">Fitur Tersedia</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Manajemen data pegawai, pencarian, dan filtering
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-orange-500">🔒</span>
                                <div>
                                    <p className="font-medium">Keamanan Data</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Akses dibatasi berdasarkan peran pengguna
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}