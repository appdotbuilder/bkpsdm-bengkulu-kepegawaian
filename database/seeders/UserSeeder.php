<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a superadmin user
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@bkpsdm.bengkulu.go.id',
            'role' => 'superadmin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create an admin user
        User::create([
            'name' => 'Admin BKPSDM',
            'email' => 'admin@bkpsdm.bengkulu.go.id',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create a pengelola user
        User::create([
            'name' => 'Pengelola Kepegawaian',
            'email' => 'pengelola@bkpsdm.bengkulu.go.id',
            'role' => 'pengelola',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create a regular user
        User::create([
            'name' => 'User Biasa',
            'email' => 'user@bkpsdm.bengkulu.go.id',
            'role' => 'user',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
    }
}