import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function EditAdmin({ admin }) {
    const { tenants } = usePage().props; // Mengakses data tenants dari props
    const { data, setData, put, errors } = useForm({
        name: admin.name,
        email: admin.email,
        password: "",
        tenant_id: admin.tenant_id || "", // Set default tenant_id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.manageAdmins.update", admin.id));
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Edit Admin</h1>
            <div className="mb-4">
                {/* Back to Manage Admins Button */}
                <Link
                    href={route("admin.manageAdmins")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Back to Manage Admins
                </Link>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.email && <div className="text-red-500">{errors.email}</div>}
                </div>
                <div className="mb-4">
                    <label className="block">Password (leave blank to keep current)</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.password && <div className="text-red-500">{errors.password}</div>}
                </div>
                <div className="mb-4">
                    <label className="block">Tenant</label>
                    <select
                        value={data.tenant_id}
                        onChange={(e) => setData("tenant_id", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    >
                        <option value="">Select a Tenant</option>
                        {tenants.map((tenant) => (
                            <option key={tenant.id} value={tenant.id}>
                                {tenant.name}
                            </option>
                        ))}
                    </select>
                    {errors.tenant_id && <div className="text-red-500">{errors.tenant_id}</div>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
