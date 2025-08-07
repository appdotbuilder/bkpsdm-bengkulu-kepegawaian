<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!auth()->user()->canViewEmployees()) {
            abort(403, 'Anda tidak memiliki akses untuk melihat data pegawai.');
        }

        $query = Employee::query();

        // Search functionality
        if ($request->filled('search')) {
            $searchTerm = $request->get('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nama', 'like', "%{$searchTerm}%")
                  ->orWhere('nip', 'like', "%{$searchTerm}%")
                  ->orWhere('jabatan', 'like', "%{$searchTerm}%")
                  ->orWhere('unit_kerja', 'like', "%{$searchTerm}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        // Filter by unit kerja
        if ($request->filled('unit_kerja')) {
            $query->where('unit_kerja', $request->get('unit_kerja'));
        }

        // Filter by status pegawai
        if ($request->filled('status_pegawai')) {
            $query->where('status_pegawai', $request->get('status_pegawai'));
        }

        $employees = $query->latest()->paginate(10)->withQueryString();

        // Get filter options
        $unitKerjaOptions = Employee::distinct()->pluck('unit_kerja')->sort()->values();
        $statusOptions = ['Aktif', 'Tidak Aktif', 'Pensiun', 'Mutasi'];
        $statusPegawaiOptions = ['PNS', 'CPNS', 'PPPK', 'Honorer'];

        return Inertia::render('employees/index', [
            'employees' => $employees,
            'filters' => $request->only(['search', 'status', 'unit_kerja', 'status_pegawai']),
            'unitKerjaOptions' => $unitKerjaOptions,
            'statusOptions' => $statusOptions,
            'statusPegawaiOptions' => $statusPegawaiOptions,
            'can' => [
                'create' => auth()->user()->canEditEmployees(),
                'edit' => auth()->user()->canEditEmployees(),
                'delete' => auth()->user()->canManageEmployees(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()->canEditEmployees()) {
            abort(403, 'Anda tidak memiliki akses untuk menambah data pegawai.');
        }

        return Inertia::render('employees/create', [
            'golonganOptions' => ['I/a', 'I/b', 'I/c', 'I/d', 'II/a', 'II/b', 'II/c', 'II/d', 'III/a', 'III/b', 'III/c', 'III/d', 'IV/a', 'IV/b', 'IV/c', 'IV/d', 'IV/e'],
            'statusPegawaiOptions' => ['PNS', 'CPNS', 'PPPK', 'Honorer'],
            'statusOptions' => ['Aktif', 'Tidak Aktif', 'Pensiun', 'Mutasi'],
            'statusKawinOptions' => ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'],
            'jenisKelaminOptions' => [
                ['value' => 'L', 'label' => 'Laki-laki'],
                ['value' => 'P', 'label' => 'Perempuan']
            ],
            'agamaOptions' => ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $employee = Employee::create($request->validated());

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Data pegawai berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        if (!auth()->user()->canViewEmployees()) {
            abort(403, 'Anda tidak memiliki akses untuk melihat data pegawai.');
        }

        return Inertia::render('employees/show', [
            'employee' => $employee,
            'can' => [
                'edit' => auth()->user()->canEditEmployees(),
                'delete' => auth()->user()->canManageEmployees(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        if (!auth()->user()->canEditEmployees()) {
            abort(403, 'Anda tidak memiliki akses untuk mengedit data pegawai.');
        }

        return Inertia::render('employees/edit', [
            'employee' => $employee,
            'golonganOptions' => ['I/a', 'I/b', 'I/c', 'I/d', 'II/a', 'II/b', 'II/c', 'II/d', 'III/a', 'III/b', 'III/c', 'III/d', 'IV/a', 'IV/b', 'IV/c', 'IV/d', 'IV/e'],
            'statusPegawaiOptions' => ['PNS', 'CPNS', 'PPPK', 'Honorer'],
            'statusOptions' => ['Aktif', 'Tidak Aktif', 'Pensiun', 'Mutasi'],
            'statusKawinOptions' => ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'],
            'jenisKelaminOptions' => [
                ['value' => 'L', 'label' => 'Laki-laki'],
                ['value' => 'P', 'label' => 'Perempuan']
            ],
            'agamaOptions' => ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Data pegawai berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        if (!auth()->user()->canManageEmployees()) {
            abort(403, 'Anda tidak memiliki akses untuk menghapus data pegawai.');
        }

        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Data pegawai berhasil dihapus.');
    }
}