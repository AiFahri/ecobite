<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\TenantType;
use App\Services\SupabaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantManagementController extends Controller
{
    public function index()
    {
        $tenants = Tenant::paginate(10);
        return Inertia::render('Admin/ManageTenants', [
            'tenants' => $tenants,
            'auth' => [
                'user' => auth('admin')->user(),
            ],
        ]);
    }

    public function create()
    {
        $tenants = Tenant::all();
        $tenantTypes = TenantType::all(); // Ambil semua tenant types dari database
        return Inertia::render('Admin/CreateTenant', [
            'tenants' => $tenants,
            'tenantTypes' => $tenantTypes,
        ]);
    }

    public function store(Request $request, SupabaseService $supabaseService)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'stars' => 'nullable|integer|min:1|max:5',
            'is_verified' => 'required|boolean',
            'photo' => 'nullable|image|max:2048', // Maksimum 2MB
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'tenant_type_id' => 'required|exists:tenant_types,id', // Validasi tenant type
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

        Tenant::create($validated);

        // Redirect ke halaman Manage Tenants
        return redirect()->route('admin.manageTenants')
            ->with('success', 'Tenant created successfully.');
    }

    public function edit($id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenantTypes = TenantType::all(); // Ambil semua tenant types dari database

        return Inertia::render('Admin/EditTenant', [
            'tenants' => $tenant,
            'tenantTypes' => $tenantTypes,
        ]);
    }


    public function update(Request $request, $id, SupabaseService $supabaseService)
    {
        $tenant = Tenant::findOrFail($id);

        // Validasi data dari form
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'stars' => 'nullable|integer|min:1|max:5',
            'is_verified' => 'required|boolean',
            'photo' => 'nullable|image|max:2048', // Maksimum 2MB
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'tenant_type_id' => 'required|exists:tenant_types,id', // Validasi tenant type
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

        // Update data tenant
        $tenant->update($validated);

        // Redirect ke halaman Manage Tenants
        return redirect()->route('admin.manageTenants')
            ->with('success', 'Tenant updated successfully.');
    }


    public function destroy($id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();

        return redirect()->route('admin.manageTenants')->with('success', 'Tenant deleted successfully.');
    }
}
