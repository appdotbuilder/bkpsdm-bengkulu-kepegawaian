<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->canEditEmployees();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nip' => 'required|string|max:20|unique:employees,nip,' . $this->route('employee')->id,
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date|before:today',
            'jenis_kelamin' => 'required|in:L,P',
            'agama' => 'required|string|max:255',
            'status_kawin' => 'required|in:Belum Kawin,Kawin,Cerai Hidup,Cerai Mati',
            'alamat' => 'required|string',
            'telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'pendidikan_terakhir' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'unit_kerja' => 'required|string|max:255',
            'golongan' => 'required|in:I/a,I/b,I/c,I/d,II/a,II/b,II/c,II/d,III/a,III/b,III/c,III/d,IV/a,IV/b,IV/c,IV/d,IV/e',
            'status_pegawai' => 'required|in:PNS,CPNS,PPPK,Honorer',
            'tanggal_masuk' => 'required|date|before_or_equal:today',
            'gaji_pokok' => 'required|numeric|min:0',
            'status' => 'required|in:Aktif,Tidak Aktif,Pensiun,Mutasi',
            'keterangan' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nip.required' => 'NIP wajib diisi.',
            'nip.unique' => 'NIP sudah terdaftar untuk pegawai lain.',
            'nama.required' => 'Nama pegawai wajib diisi.',
            'tempat_lahir.required' => 'Tempat lahir wajib diisi.',
            'tanggal_lahir.required' => 'Tanggal lahir wajib diisi.',
            'tanggal_lahir.before' => 'Tanggal lahir harus sebelum hari ini.',
            'jenis_kelamin.required' => 'Jenis kelamin wajib dipilih.',
            'jenis_kelamin.in' => 'Jenis kelamin harus L (Laki-laki) atau P (Perempuan).',
            'agama.required' => 'Agama wajib diisi.',
            'status_kawin.required' => 'Status perkawinan wajib dipilih.',
            'alamat.required' => 'Alamat wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'pendidikan_terakhir.required' => 'Pendidikan terakhir wajib diisi.',
            'jabatan.required' => 'Jabatan wajib diisi.',
            'unit_kerja.required' => 'Unit kerja wajib diisi.',
            'golongan.required' => 'Golongan wajib dipilih.',
            'status_pegawai.required' => 'Status kepegawaian wajib dipilih.',
            'tanggal_masuk.required' => 'Tanggal masuk kerja wajib diisi.',
            'tanggal_masuk.before_or_equal' => 'Tanggal masuk kerja tidak boleh lebih dari hari ini.',
            'gaji_pokok.required' => 'Gaji pokok wajib diisi.',
            'gaji_pokok.numeric' => 'Gaji pokok harus berupa angka.',
            'gaji_pokok.min' => 'Gaji pokok tidak boleh kurang dari 0.',
            'status.required' => 'Status pegawai wajib dipilih.',
        ];
    }
}