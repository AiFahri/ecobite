<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Employee;
use App\Models\Tenant;
use App\Services\SupabaseService;

class EmployeeManagementController extends Controller
{
    //

    public function index()
    {
        $auth = auth('admin')->user();
        $employees = Employee::with('tenant');

        if (!is_null($auth->tenant_id)) {
            $employees = $employees->where('tenant_id', $auth->tenant_id);
        }

        $employees = $employees->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/ManageEmployees', [
            'employees' => $employees,
            'auth' => $auth,
        ]);
    }

    public function create()
    {
        $auth = auth('admin')->user();
        return Inertia::render('Admin/CreateEmployee', ['auth' => $auth]);
    }

    public function store(Request $request, SupabaseService $supabaseService)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'license_plate' => 'required|string|max:20',
            'photo' => 'nullable|image|max:2048', // Maksimum 2MB
            'tenant_id' => 'required|exists:tenants,id', // Validasi tenant
        ]);

        if ($request->hasFile('photo')) {
            // Ambil file foto dari request
            $file = $request->file('photo');
            $filePath = $file->getPathname();
            $fileName = uniqid() . '_' . $file->getClientOriginalName();

            // Upload file ke Supabase melalui SupabaseService
            $url = $supabaseService->uploadFile($filePath, $fileName);
            $validated['photo_url'] = $url; // Simpan URL file ke dalam database
        }

        // Simpan data karyawan ke database
        Employee::create($validated);

        // Redirect ke halaman Manage Employees
        return redirect()->route('admin.manageEmployees')
            ->with('success', 'Employee created successfully.');
    }

    public function edit($id)
    {
        $auth = auth('admin')->user();
        $employee = Employee::findOrFail($id);
        return Inertia::render('Admin/EditEmployee', [
            'employee' => $employee,
            'auth' => $auth,
        ]);
    }

    public function update(Request $request, $id, SupabaseService $supabaseService)
    {
        $employee = Employee::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'license_plate' => 'required|string|max:20',
            'photo' => 'nullable|image|max:2048', // Maksimum 2MB
            'tenant_id' => 'required|exists:tenants,id', // Validasi tenant
        ]);

        if ($request->hasFile('photo')) {
            // $photoPath = $request->file('photo')->store('tenants/photos', 'public');
            // $validated['photo_url'] = $photoPath; // Simpan path ke database

            $file = $request->file('photo');
            $filePath = $file->getPathname();
            $fileName = uniqid() . '_' . $file->getClientOriginalName();

            $url = $supabaseService->uploadFile($filePath, $fileName);
            $validated['photo_url'] = $url;
        }

        $employee->update($validated);

        return redirect()->route('admin.manageEmployees')
            ->with('success', 'Employee updated successfully.');
    }

    public function destroy($id)
    {
        $admin = Employee::findOrFail($id);
        $admin->delete();

        return redirect()->route('admin.manageEmployees')->with('success', 'Employee deleted successfully.');
    }
}
