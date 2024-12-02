<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantManagementController extends Controller
{
    public function index()
    {
        $tenants = Tenant::all();
        return Inertia::render('Admin/ManageTenants', [
            'tenants' => $tenants,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function create()
    {
        $tenants = Tenant::all();
        return Inertia::render('Admin/CreateTenant', [
            'tenants' => $tenants,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,email',
            'phone' => 'nullable|string|max:20',
        ]);

        Tenant::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ]);

        return redirect()->route('admin.manageTenants')->with('success', 'Tenant created successfully.');
    }

    public function edit($id)
    {
        $tenant = Tenant::findOrFail($id);
        return Inertia::render('Admin/EditTenant', [
            'tenants' => $tenant,
        ]);
    }

    public function update(Request $request, $id)
    {
        $tenant = Tenant::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,email,' . $tenant->id,
            'phone' => 'nullable|string|max:20',
        ]);

        $tenant->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ]);

        return redirect()->route('admin.manageTenants.edit', $tenant->id)
            ->with('success', 'Tenant updated successfully.');
    }

    public function destroy($id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();

        return redirect()->route('admin.manageTenants')->with('success', 'Tenant deleted successfully.');
    }
}
