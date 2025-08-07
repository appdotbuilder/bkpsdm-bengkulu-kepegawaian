import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmployeeFormData {
    nip: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    agama: string;
    status_kawin: string;
    alamat: string;
    telepon: string;
    email: string;
    pendidikan_terakhir: string;
    jabatan: string;
    unit_kerja: string;
    golongan: string;
    status_pegawai: string;
    tanggal_masuk: string;
    gaji_pokok: string;
    status: string;
    keterangan: string;
    [key: string]: string;
}

interface Props {
    golonganOptions: string[];
    statusPegawaiOptions: string[];
    statusOptions: string[];
    statusKawinOptions: string[];
    jenisKelaminOptions: Array<{ value: string; label: string }>;
    agamaOptions: string[];
    [key: string]: unknown;
}

export default function EmployeeCreate({ 
    golonganOptions, 
    statusPegawaiOptions, 
    statusOptions, 
    statusKawinOptions, 
    jenisKelaminOptions, 
    agamaOptions 
}: Props) {
    const { data, setData, post, processing, errors } = useForm<EmployeeFormData>({
        nip: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        agama: '',
        status_kawin: '',
        alamat: '',
        telepon: '',
        email: '',
        pendidikan_terakhir: '',
        jabatan: '',
        unit_kerja: '',
        golongan: '',
        status_pegawai: '',
        tanggal_masuk: '',
        gaji_pokok: '',
        status: 'Aktif',
        keterangan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('employees.store'));
    };

    return (
        <AppShell>
            <Head title="Tambah Pegawai Baru" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <Link
                        href={route('employees.index')}
                        className="text-blue-600 hover:text-blue-800 text-sm mb-2 block"
                    >
                        ← Kembali ke Daftar Pegawai
                    </Link>
                    <h1 className="text-3xl font-bold">➕ Tambah Pegawai Baru</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Lengkapi formulir untuk menambahkan data pegawai baru
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>👤 Informasi Pribadi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nip">NIP *</Label>
                                    <Input
                                        id="nip"
                                        type="text"
                                        value={data.nip}
                                        onChange={(e) => setData('nip', e.target.value)}
                                        placeholder="Nomor Induk Pegawai"
                                        required
                                    />
                                    {errors.nip && <p className="text-sm text-red-500">{errors.nip}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nama">Nama Lengkap *</Label>
                                    <Input
                                        id="nama"
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        placeholder="Nama lengkap pegawai"
                                        required
                                    />
                                    {errors.nama && <p className="text-sm text-red-500">{errors.nama}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tempat_lahir">Tempat Lahir *</Label>
                                    <Input
                                        id="tempat_lahir"
                                        type="text"
                                        value={data.tempat_lahir}
                                        onChange={(e) => setData('tempat_lahir', e.target.value)}
                                        placeholder="Tempat lahir"
                                        required
                                    />
                                    {errors.tempat_lahir && <p className="text-sm text-red-500">{errors.tempat_lahir}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                                    <Input
                                        id="tanggal_lahir"
                                        type="date"
                                        value={data.tanggal_lahir}
                                        onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                        required
                                    />
                                    {errors.tanggal_lahir && <p className="text-sm text-red-500">{errors.tanggal_lahir}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Jenis Kelamin *</Label>
                                    <Select value={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jenisKelaminOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_kelamin && <p className="text-sm text-red-500">{errors.jenis_kelamin}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Agama *</Label>
                                    <Select value={data.agama} onValueChange={(value) => setData('agama', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih agama" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {agamaOptions.map((agama) => (
                                                <SelectItem key={agama} value={agama}>
                                                    {agama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.agama && <p className="text-sm text-red-500">{errors.agama}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Status Perkawinan *</Label>
                                <Select value={data.status_kawin} onValueChange={(value) => setData('status_kawin', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status perkawinan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusKawinOptions.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.status_kawin && <p className="text-sm text-red-500">{errors.status_kawin}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="alamat">Alamat *</Label>
                                <Textarea
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    placeholder="Alamat lengkap"
                                    rows={3}
                                    required
                                />
                                {errors.alamat && <p className="text-sm text-red-500">{errors.alamat}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="telepon">Telepon</Label>
                                    <Input
                                        id="telepon"
                                        type="text"
                                        value={data.telepon}
                                        onChange={(e) => setData('telepon', e.target.value)}
                                        placeholder="Nomor telepon"
                                    />
                                    {errors.telepon && <p className="text-sm text-red-500">{errors.telepon}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Alamat email"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
                            <div className="space-y-2">
                                <Label htmlFor="pendidikan_terakhir">Pendidikan Terakhir *</Label>
                                <Input
                                    id="pendidikan_terakhir"
                                    type="text"
                                    value={data.pendidikan_terakhir}
                                    onChange={(e) => setData('pendidikan_terakhir', e.target.value)}
                                    placeholder="Pendidikan terakhir"
                                    required
                                />
                                {errors.pendidikan_terakhir && <p className="text-sm text-red-500">{errors.pendidikan_terakhir}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jabatan">Jabatan *</Label>
                                    <Input
                                        id="jabatan"
                                        type="text"
                                        value={data.jabatan}
                                        onChange={(e) => setData('jabatan', e.target.value)}
                                        placeholder="Jabatan"
                                        required
                                    />
                                    {errors.jabatan && <p className="text-sm text-red-500">{errors.jabatan}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit_kerja">Unit Kerja *</Label>
                                    <Input
                                        id="unit_kerja"
                                        type="text"
                                        value={data.unit_kerja}
                                        onChange={(e) => setData('unit_kerja', e.target.value)}
                                        placeholder="Unit kerja"
                                        required
                                    />
                                    {errors.unit_kerja && <p className="text-sm text-red-500">{errors.unit_kerja}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Golongan *</Label>
                                    <Select value={data.golongan} onValueChange={(value) => setData('golongan', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih golongan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {golonganOptions.map((golongan) => (
                                                <SelectItem key={golongan} value={golongan}>
                                                    {golongan}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.golongan && <p className="text-sm text-red-500">{errors.golongan}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Status Kepegawaian *</Label>
                                    <Select value={data.status_pegawai} onValueChange={(value) => setData('status_pegawai', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status kepegawaian" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusPegawaiOptions.map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status_pegawai && <p className="text-sm text-red-500">{errors.status_pegawai}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_masuk">Tanggal Masuk *</Label>
                                    <Input
                                        id="tanggal_masuk"
                                        type="date"
                                        value={data.tanggal_masuk}
                                        onChange={(e) => setData('tanggal_masuk', e.target.value)}
                                        required
                                    />
                                    {errors.tanggal_masuk && <p className="text-sm text-red-500">{errors.tanggal_masuk}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gaji_pokok">Gaji Pokok *</Label>
                                    <Input
                                        id="gaji_pokok"
                                        type="number"
                                        value={data.gaji_pokok}
                                        onChange={(e) => setData('gaji_pokok', e.target.value)}
                                        placeholder="Gaji pokok"
                                        min="0"
                                        step="1000"
                                        required
                                    />
                                    {errors.gaji_pokok && <p className="text-sm text-red-500">{errors.gaji_pokok}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Status Pegawai *</Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status pegawai" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="keterangan">Keterangan</Label>
                                <Textarea
                                    id="keterangan"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    placeholder="Keterangan tambahan"
                                    rows={3}
                                />
                                {errors.keterangan && <p className="text-sm text-red-500">{errors.keterangan}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end space-x-4">
                        <Link href={route('employees.index')}>
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? '⏳ Menyimpan...' : '💾 Simpan Data'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}