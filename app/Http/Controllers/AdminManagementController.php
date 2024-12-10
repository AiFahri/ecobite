<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tenant;

class AdminManagementController extends Controller
{
    public function index()
    {
        $auth = auth('admin')->user();
        $admins = Admin::with('tenant');

        if (!is_null($auth->tenant_id)) {
            $admins = $admins->where('tenant_id', $auth->tenant_id);
        }

        $admins = $admins->orderByRaw('ISNULL(tenant_id) DESC')->paginate(10);

        return Inertia::render('Admin/ManageAdmins', [
            'admins' => $admins,
            'auth' => [
                'user' => $auth,
            ],
        ]);
    }

    public function create()
    {
        $tenants = Tenant::all();
        return Inertia::render('Admin/CreateAdmin', ['tenants' => $tenants]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:8',
            'tenant_id' => 'nullable|exists:tenants,id',
        ]);

        Admin::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'tenant_id' => $validated['tenant_id'],
        ]);

        return redirect()->route('admin.manageAdmins')->with('success', 'Admin created successfully.');
    }

    public function edit($id)
    {
        $admin = Admin::findOrFail($id);
        $tenants = Tenant::all();
        return Inertia::render('Admin/EditAdmin', [
            'admin' => $admin,
            'tenants' => $tenants,
        ]);
    }

    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
            'password' => 'nullable|string|min:8',
            'tenant_id' => 'nullable|exists:tenants,id',
        ]);

        $admin->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'] ? bcrypt($validated['password']) : $admin->password,
            'tenant_id' => $validated['tenant_id'],
        ]);

        return redirect()->route('admin.manageAdmins')
            ->with('success', 'Admin updated successfully.');
    }

    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return redirect()->route('admin.manageAdmins')->with('success', 'Admin deleted successfully.');
    }
}
