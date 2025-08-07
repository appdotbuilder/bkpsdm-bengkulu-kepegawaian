import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Employee {
    id: number;
    nip: string;
    nama: string;
    jabatan: string;
    unit_kerja: string;
    golongan: string;
    status_pegawai: string;
    status: string;
    email?: string;
    telepon?: string;
    [key: string]: unknown;
}

interface Props {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
        from: number;
        to: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
        status?: string;
        unit_kerja?: string;
        status_pegawai?: string;
    };
    unitKerjaOptions: string[];
    statusOptions: string[];
    statusPegawaiOptions: string[];
    can: {
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
    [key: string]: unknown;
}

export default function EmployeesIndex({ 
    employees, 
    filters, 
    unitKerjaOptions, 
    statusOptions, 
    statusPegawaiOptions,
    can 
}: Props) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
    const [statusFilter, setStatusFilter] = React.useState(filters.status || '');
    const [unitKerjaFilter, setUnitKerjaFilter] = React.useState(filters.unit_kerja || '');
    const [statusPegawaiFilter, setStatusPegawaiFilter] = React.useState(filters.status_pegawai || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('employees.index'), {
            search: searchTerm,
            status: statusFilter,
            unit_kerja: unitKerjaFilter,
            status_pegawai: statusPegawaiFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setUnitKerjaFilter('');
        setStatusPegawaiFilter('');
        router.get(route('employees.index'), {}, {
            preserveState: true,
            replace: true,
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

    const getStatusPegawaiBadgeVariant = (statusPegawai: string) => {
        switch (statusPegawai) {
            case 'PNS':
                return 'default';
            case 'CPNS':
                return 'secondary';
            case 'PPPK':
                return 'outline';
            default:
                return 'secondary';
        }
    };

    return (
        <AppShell>
            <Head title="Data Pegawai" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">👥 Data Pegawai</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Kelola data kepegawaian BKPSDM Kota Bengkulu
                        </p>
                    </div>
                    {can.create && (
                        <Link href={route('employees.create')}>
                            <Button>
                                ➕ Tambah Pegawai
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Pegawai</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{employees.total}</div>
                            <p className="text-xs text-gray-600">Seluruh pegawai</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Pegawai Aktif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {employees.data.filter(emp => emp.status === 'Aktif').length}
                            </div>
                            <p className="text-xs text-gray-600">Status aktif</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">PNS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {employees.data.filter(emp => emp.status_pegawai === 'PNS').length}
                            </div>
                            <p className="text-xs text-gray-600">Pegawai Negeri Sipil</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Unit Kerja</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                {unitKerjaOptions.length}
                            </div>
                            <p className="text-xs text-gray-600">Jumlah unit kerja</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">🔍 Filter & Pencarian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <Input
                                    placeholder="Cari nama, NIP, jabatan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status Pegawai" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Status</SelectItem>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={unitKerjaFilter} onValueChange={setUnitKerjaFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Unit Kerja" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Unit</SelectItem>
                                        {unitKerjaOptions.map((unit) => (
                                            <SelectItem key={unit} value={unit}>
                                                {unit}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={statusPegawaiFilter} onValueChange={setStatusPegawaiFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Status Kepegawaian" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Kategori</SelectItem>
                                        {statusPegawaiOptions.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="flex space-x-2">
                                    <Button type="submit" className="flex-1">
                                        Cari
                                    </Button>
                                    <Button type="button" variant="outline" onClick={clearFilters}>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Employee Table */}
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>NIP</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Jabatan</TableHead>
                                <TableHead>Unit Kerja</TableHead>
                                <TableHead>Golongan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.data.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className="font-mono">{employee.nip}</TableCell>
                                    <TableCell className="font-medium">{employee.nama}</TableCell>
                                    <TableCell>{employee.jabatan}</TableCell>
                                    <TableCell>{employee.unit_kerja}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{employee.golongan}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <Badge variant={getStatusBadgeVariant(employee.status)}>
                                                {employee.status}
                                            </Badge>
                                            <br />
                                            <Badge variant={getStatusPegawaiBadgeVariant(employee.status_pegawai)} className="text-xs">
                                                {employee.status_pegawai}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Link href={route('employees.show', employee.id)}>
                                                <Button variant="outline" size="sm">
                                                    👁️ Lihat
                                                </Button>
                                            </Link>
                                            {can.edit && (
                                                <Link href={route('employees.edit', employee.id)}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        {employees.data.length === 0 && (
                            <TableCaption>
                                {Object.values(filters).some(f => f) 
                                    ? "Tidak ada data pegawai yang sesuai dengan filter." 
                                    : "Belum ada data pegawai."
                                }
                            </TableCaption>
                        )}
                    </Table>

                    {/* Pagination */}
                    {employees.last_page > 1 && (
                        <div className="p-4 border-t">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {employees.from} - {employees.to} dari {employees.total} data
                                </div>
                                <div className="flex space-x-1">
                                    {employees.links.map((link, index) => (
                                        link.url ? (
                                            <Button
                                                key={index}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => router.get(link.url!)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                disabled
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </AppShell>
    );
}