import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Employee {
    id: number;
    nip: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    agama: string;
    status_kawin: string;
    alamat: string;
    telepon?: string;
    email?: string;
    pendidikan_terakhir: string;
    jabatan: string;
    unit_kerja: string;
    golongan: string;
    status_pegawai: string;
    tanggal_masuk: string;
    gaji_pokok: number;
    status: string;
    keterangan?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

interface Props {
    employee: Employee;
    can: {
        edit: boolean;
        delete: boolean;
    };
    [key: string]: unknown;
}

export default function EmployeeShow({ employee, can }: Props) {
    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data pegawai ini?')) {
            router.delete(route('employees.destroy', employee.id));
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Aktif':
                return 'default';
            case 'Tidak Aktif':
                return 'secondary';
            case 'Pensiun':
                return 'outline';
            case 'Mutasi':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const getAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    const getYearsOfService = (startDate: string) => {
        const today = new Date();
        const start = new Date(startDate);
        let years = today.getFullYear() - start.getFullYear();
        const monthDiff = today.getMonth() - start.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < start.getDate())) {
            years--;
        }
        
        return years;
    };

    return (
        <AppShell>
            <Head title={`${employee.nama} - Detail Pegawai`} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href={route('employees.index')}
                            className="text-blue-600 hover:text-blue-800 text-sm mb-2 block"
                        >
                            ← Kembali ke Daftar Pegawai
                        </Link>
                        <h1 className="text-3xl font-bold">👤 Detail Pegawai</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Informasi lengkap pegawai {employee.nama}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        {can.edit && (
                            <Link href={route('employees.edit', employee.id)}>
                                <Button>
                                    ✏️ Edit Data
                                </Button>
                            </Link>
                        )}
                        {can.delete && (
                            <Button variant="destructive" onClick={handleDelete}>
                                🗑️ Hapus
                            </Button>
                        )}
                    </div>
                </div>

                {/* Status Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Status Pegawai</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant={getStatusBadgeVariant(employee.status)} className="text-lg">
                                {employee.status}
                            </Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Status Kepegawaian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Badge variant="outline" className="text-lg">
                                {employee.status_pegawai}
                            </Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Usia</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{getAge(employee.tanggal_lahir)}</div>
                            <p className="text-xs text-gray-600">tahun</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Masa Kerja</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{getYearsOfService(employee.tanggal_masuk)}</div>
                            <p className="text-xs text-gray-600">tahun</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>👤 Informasi Pribadi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">NIP</label>
                                    <p className="font-mono text-lg">{employee.nip}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
                                    <p className="text-lg font-semibold">{employee.nama}</p>
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Tempat Lahir</label>
                                    <p>{employee.tempat_lahir}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Tanggal Lahir</label>
                                    <p>{formatDate(employee.tanggal_lahir)}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Jenis Kelamin</label>
                                    <p>{employee.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Agama</label>
                                    <p>{employee.agama}</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500">Status Perkawinan</label>
                                <p>{employee.status_kawin}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500">Alamat</label>
                                <p className="text-sm">{employee.alamat}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Telepon</label>
                                    <p>{employee.telepon || '-'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-sm">{employee.email || '-'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Employment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>💼 Informasi Kepegawaian</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Jabatan</label>
                                <p className="text-lg font-semibold">{employee.jabatan}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500">Unit Kerja</label>
                                <p className="text-lg">{employee.unit_kerja}</p>
                            </div>
                            
                            <Separator />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Golongan</label>
                                    <Badge variant="outline" className="text-base">
                                        {employee.golongan}
                                    </Badge>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Pendidikan Terakhir</label>
                                    <p>{employee.pendidikan_terakhir}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Tanggal Masuk</label>
                                    <p>{formatDate(employee.tanggal_masuk)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Gaji Pokok</label>
                                    <p className="text-lg font-semibold text-green-600">
                                        {formatCurrency(employee.gaji_pokok)}
                                    </p>
                                </div>
                            </div>
                            
                            {employee.keterangan && (
                                <>
                                    <Separator />
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Keterangan</label>
                                        <p className="text-sm">{employee.keterangan}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Metadata */}
                <Card>
                    <CardHeader>
                        <CardTitle>ℹ️ Informasi Sistem</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <label className="text-gray-500">Dibuat pada</label>
                                <p>{formatDate(employee.created_at)}</p>
                            </div>
                            <div>
                                <label className="text-gray-500">Terakhir diupdate</label>
                                <p>{formatDate(employee.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}