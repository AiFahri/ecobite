import React, { useState } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function EditTenant() {
    const { tenants, tenantTypes } = usePage().props; // Mengakses tenants dan tenantTypes dari props

    console.log(tenants);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, put, errors } = useForm({
        name: tenants.name || "",
        stars: tenants.stars || "",
        is_verified: tenants.is_verified || false,
        photo: null, // Untuk file upload
        city: tenants.city || "",
        state: tenants.state || "",
        postal_code: tenants.postal_code || "",
        latitude: tenants.latitude || "",
        longitude: tenants.longitude || "",
        tenant_type_id: tenants.tenant_type_id || "", // Default value untuk tenant type
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        put(route("admin.manageTenants.update", tenants.id), formData, {
            forceFormData: true, // Pastikan form dikirim sebagai multipart/form-data
        });
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Edit Tenant</h1>
            <div className="mb-4">
                <Link
                    href={route("admin.manageTenants")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Back to Manage Tenants
                </Link>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                    <label className="block">Stars</label>
                    <input
                        type="number"
                        value={data.stars}
                        onChange={(e) => setData("stars", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.stars && <div className="text-red-500">{errors.stars}</div>}
                </div>

                <div className="mb-4">
                    <label className="block">Is Verified</label>
                    <input
                        type="checkbox"
                        checked={data.is_verified}
                        onChange={(e) => setData("is_verified", e.target.checked)}
                        className="border rounded"
                    />
                    {errors.is_verified && (
                        <div className="text-red-500">{errors.is_verified}</div>
                    )}
                </div>

                {/* Other Form Fields */}

                <div className="mb-4">
                    <label className="block">Photo</label>
                    <img
                        src={tenants.photo_url}
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
                                src={tenants.photo_url}
                                alt="Tenant Full Photo"
                                className="max-w-full max-h-[80vh] object-contain rounded"
                            />
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block">Photo</label>
                    <input
                        type="file"
                        onChange={(e) => setData("photo", e.target.files[0])}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.photo && <div className="text-red-500">{errors.photo}</div>}
                </div>

                <div className="mb-4">
                    <label className="block">City</label>
                    <input
                        type="text"
                        value={data.city}
                        onChange={(e) => setData("city", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.city && <div className="text-red-500">{errors.city}</div>}
                </div>

                <div className="mb-4">
                    <label className="block">State</label>
                    <input
                        type="text"
                        value={data.state}
                        onChange={(e) => setData("state", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.state && <div className="text-red-500">{errors.state}</div>}
                </div>

                <div className="mb-4">
                    <label className="block">Postal Code</label>
                    <input
                        type="text"
                        value={data.postal_code}
                        onChange={(e) => setData("postal_code", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.postal_code && (
                        <div className="text-red-500">{errors.postal_code}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block">Latitude</label>
                    <input
                        type="text"
                        value={data.latitude}
                        onChange={(e) => setData("latitude", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.latitude && (
                        <div className="text-red-500">{errors.latitude}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block">Longitude</label>
                    <input
                        type="text"
                        value={data.longitude}
                        onChange={(e) => setData("longitude", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.longitude && (
                        <div className="text-red-500">{errors.longitude}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block">Tenant Type</label>
                    <select
                        value={data.tenant_type_id}
                        onChange={(e) => setData("tenant_type_id", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    >
                        <option value="">Select a Tenant Type</option>
                        {tenantTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>

                    {errors.tenant_type_id && (
                        <div className="text-red-500">{errors.tenant_type_id}</div>
                    )}
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
