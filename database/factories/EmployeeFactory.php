<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenisKelamin = $this->faker->randomElement(['L', 'P']);
        $firstName = $jenisKelamin === 'L' ? $this->faker->firstNameMale : $this->faker->firstNameFemale;
        
        return [
            'nip' => $this->faker->unique()->numerify('##########'),
            'nama' => $firstName . ' ' . $this->faker->lastName,
            'tempat_lahir' => $this->faker->city,
            'tanggal_lahir' => $this->faker->dateTimeBetween('-60 years', '-25 years')->format('Y-m-d'),
            'jenis_kelamin' => $jenisKelamin,
            'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
            'status_kawin' => $this->faker->randomElement(['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati']),
            'alamat' => $this->faker->address,
            'telepon' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'pendidikan_terakhir' => $this->faker->randomElement(['SMA', 'D3', 'S1', 'S2', 'S3']),
            'jabatan' => $this->faker->randomElement([
                'Kepala Bidang',
                'Kepala Seksi',
                'Staf Ahli',
                'Analis Kepegawaian',
                'Pengadministrasi Umum',
                'Operator Komputer',
                'Sekretaris',
                'Bendahara',
                'Pengadministrasi Keuangan'
            ]),
            'unit_kerja' => $this->faker->randomElement([
                'Bidang Mutasi dan Promosi',
                'Bidang Pengembangan Kompetensi',
                'Bidang Informasi Kepegawaian',
                'Sekretariat',
                'Bidang Pengadaan dan Penempatan'
            ]),
            'golongan' => $this->faker->randomElement(['II/a', 'II/b', 'II/c', 'II/d', 'III/a', 'III/b', 'III/c', 'III/d', 'IV/a', 'IV/b', 'IV/c', 'IV/d']),
            'status_pegawai' => $this->faker->randomElement(['PNS', 'CPNS', 'PPPK']),
            'tanggal_masuk' => $this->faker->dateTimeBetween('-30 years', '-1 year')->format('Y-m-d'),
            'gaji_pokok' => $this->faker->randomFloat(2, 3000000, 8000000),
            'status' => $this->faker->randomElement(['Aktif', 'Tidak Aktif']),
            'keterangan' => $this->faker->optional()->sentence,
        ];
    }

    /**
     * Indicate that the employee is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Aktif',
        ]);
    }

    /**
     * Indicate that the employee is PNS.
     */
    public function pns(): static
    {
        return $this->state(fn (array $attributes) => [
            'status_pegawai' => 'PNS',
        ]);
    }
}