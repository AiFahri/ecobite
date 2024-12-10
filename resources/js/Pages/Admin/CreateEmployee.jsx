import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function CreateEmployee() {
    const { auth } = usePage().props; // Mengakses data tenants dari props
    const { data, setData, post, errors } = useForm({
        name: "",
        license_plate: "",
        photo: null, // untuk file
        tenant_id: auth.tenant_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.manageEmployees.store"), {
            data,
            transform: (formData) => {
                const payload = new FormData();
                payload.append("name", data.name);
                payload.append("license_plate", data.license_plate);
                if (data.photo) {
                    payload.append("photo", data.photo);
                }
                payload.append("tenant_id", data.tenant_id);
                return payload;
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Create Employee</h1>
            <div className="mb-4">
                {/* Back to Manage Employees Button */}
                <Link
                    href={route("admin.manageEmployees")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Back to Manage Employees
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
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

                {/* License Plate Input */}
                <div className="mb-4">
                    <label className="block">License Plate</label>
                    <input
                        type="text"
                        value={data.license_plate}
                        onChange={(e) => setData("license_plate", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.license_plate && (
                        <div className="text-red-500">{errors.license_plate}</div>
                    )}
                </div>

                {/* Photo Input */}
                <div className="mb-4">
                    <label className="block">Photo</label>
                    <input
                        type="file"
                        onChange={(e) => setData("photo", e.target.files[0])}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.photo && <div className="text-red-500">{errors.photo}</div>}
                </div>

                {/* Hidden Tenant ID */}
                <input
                    type="hidden"
                    value={data.tenant_id}
                    onChange={(e) => setData("tenant_id", e.target.value)}
                />

                {/* Submit Button */}
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
