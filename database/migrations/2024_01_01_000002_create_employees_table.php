<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('nip', 20)->unique()->comment('Nomor Induk Pegawai');
            $table->string('nama')->comment('Nama lengkap pegawai');
            $table->string('tempat_lahir')->comment('Tempat lahir');
            $table->date('tanggal_lahir')->comment('Tanggal lahir');
            $table->enum('jenis_kelamin', ['L', 'P'])->comment('L = Laki-laki, P = Perempuan');
            $table->string('agama')->comment('Agama');
            $table->enum('status_kawin', ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'])->comment('Status perkawinan');
            $table->text('alamat')->comment('Alamat lengkap');
            $table->string('telepon', 20)->nullable()->comment('Nomor telepon');
            $table->string('email')->nullable()->comment('Email pegawai');
            $table->string('pendidikan_terakhir')->comment('Pendidikan terakhir');
            $table->string('jabatan')->comment('Jabatan pegawai');
            $table->string('unit_kerja')->comment('Unit kerja/instansi');
            $table->enum('golongan', ['I/a', 'I/b', 'I/c', 'I/d', 'II/a', 'II/b', 'II/c', 'II/d', 'III/a', 'III/b', 'III/c', 'III/d', 'IV/a', 'IV/b', 'IV/c', 'IV/d', 'IV/e'])->comment('Golongan kepangkatan');
            $table->enum('status_pegawai', ['PNS', 'CPNS', 'PPPK', 'Honorer'])->comment('Status kepegawaian');
            $table->date('tanggal_masuk')->comment('Tanggal masuk kerja');
            $table->decimal('gaji_pokok', 15, 2)->comment('Gaji pokok');
            $table->enum('status', ['Aktif', 'Tidak Aktif', 'Pensiun', 'Mutasi'])->default('Aktif')->comment('Status keaktifan');
            $table->text('keterangan')->nullable()->comment('Keterangan tambahan');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('nip');
            $table->index('nama');
            $table->index(['status', 'unit_kerja']);
            $table->index('jabatan');
            $table->index(['status_pegawai', 'golongan']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};