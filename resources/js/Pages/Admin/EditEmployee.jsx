import React, { useState } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function CreateEmployee() {
    const { employee, auth } = usePage().props; // Mengakses data tenants dari props
    const { data, setData, put, errors } = useForm({
        name: employee.name || "",
        license_plate: employee.license_plate || "",
        photo: null, // untuk file
        tenant_id: auth.tenant_id,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        put(route("admin.manageEmployees.update", employee.id), formData, {
            forceFormData: true, // Pastikan form dikirim sebagai multipart/form-data
        });
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
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

                <div className="mb-4">
                    <label className="block">Photo</label>
                    <img
                        src={employee.photo_url}
                        alt="Tenant Photo"
                        className="w-32 h-32 object-cover rounded cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    />
                    {errors.photo && <div className="text-red-500">{errors.photo}</div>}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-4 relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                            <img
                                src={employee.photo_url}
                                alt="Tenant Full Photo"
                                className="max-w-full max-h-[80vh] object-contain rounded"
                            />
                        </div>
                    </div>
                )}

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
