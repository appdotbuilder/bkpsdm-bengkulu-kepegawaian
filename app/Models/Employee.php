<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Employee
 *
 * @property int $id
 * @property string $nip
 * @property string $nama
 * @property string $tempat_lahir
 * @property \Illuminate\Support\Carbon $tanggal_lahir
 * @property string $jenis_kelamin
 * @property string $agama
 * @property string $status_kawin
 * @property string $alamat
 * @property string|null $telepon
 * @property string|null $email
 * @property string $pendidikan_terakhir
 * @property string $jabatan
 * @property string $unit_kerja
 * @property string $golongan
 * @property string $status_pegawai
 * @property \Illuminate\Support\Carbon $tanggal_masuk
 * @property float $gaji_pokok
 * @property string $status
 * @property string|null $keterangan
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee query()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereAlamat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereAgama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereGajiPokok($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereGolongan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereJabatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereJenisKelamin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereKeterangan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereNip($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee wherePendidikanTerakhir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereStatusKawin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereStatusPegawai($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereTanggalLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereTanggalMasuk($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereTelepon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereTempatLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUnitKerja($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee active()
 * @method static \Database\Factories\EmployeeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nip',
        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'status_kawin',
        'alamat',
        'telepon',
        'email',
        'pendidikan_terakhir',
        'jabatan',
        'unit_kerja',
        'golongan',
        'status_pegawai',
        'tanggal_masuk',
        'gaji_pokok',
        'status',
        'keterangan',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_masuk' => 'date',
        'gaji_pokok' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active employees.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'Aktif');
    }

    /**
     * Get the employee's full name with title.
     *
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return $this->nama;
    }

    /**
     * Get the employee's age.
     *
     * @return int
     */
    public function getAgeAttribute(): int
    {
        return $this->tanggal_lahir->age;
    }

    /**
     * Get years of service.
     *
     * @return int
     */
    public function getYearsOfServiceAttribute(): int
    {
        return (int) $this->tanggal_masuk->diffInYears(now());
    }

    /**
     * Get formatted salary.
     *
     * @return string
     */
    public function getFormattedSalaryAttribute(): string
    {
        return 'Rp ' . number_format($this->gaji_pokok, 0, ',', '.');
    }
}