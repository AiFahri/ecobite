import React, { useState } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function EditProduct() {
    const { product, auth, product_types } = usePage().props; // Mengakses product_types dari props

    const { data, setData, post, errors } = useForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        discount_price: product.discount_price || "",
        stock: product.stock || "",
        product_type_id: product.product_type_id, // Default value untuk product type
        photos: [], // Menampung array file foto
        tenant_id: auth.tenant_id,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(product)

    const [photoInputs, setPhotoInputs] = useState([0]); // Indeks input foto

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            if (key === "photos") {
                data.photos.forEach((photo, index) => {
                    formData.append(`photos[${index}]`, photo);
                });
            } else {
                formData.append(key, data[key]);
            }
        }
        post(route("admin.manageProducts.store"), formData, {
            forceFormData: true, // Pastikan form dikirim sebagai multipart/form-data
        });
    };

    const handleAddPhotoInput = () => {
        setPhotoInputs([...photoInputs, photoInputs.length]);
    };

    const handlePhotoChange = (e, index) => {
        const newPhotos = [...data.photos];
        newPhotos[index] = e.target.files[0];
        setData("photos", newPhotos);
    };

    const handleDeletePhotoInput = (index) => {
        // Hapus input foto dari daftar photoInputs
        setPhotoInputs(photoInputs.filter((_, i) => i !== index));

        // Hapus file dari array photos di state data
        const newPhotos = [...data.photos];
        newPhotos.splice(index, 1);
        setData("photos", newPhotos);
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <div className="mb-4">
                <Link
                    href={route("admin.manageProducts")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Back to Manage Products
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

                {/* Description Input */}
                <div className="mb-4">
                    <label className="block">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    ></textarea>
                    {errors.description && (
                        <div className="text-red-500">{errors.description}</div>
                    )}
                </div>

                {/* Price Input */}
                <div className="mb-4">
                    <label className="block">Price</label>
                    <input
                        type="number"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.price && <div className="text-red-500">{errors.price}</div>}
                </div>

                {/* Discount Price Input */}
                <div className="mb-4">
                    <label className="block">Discount Price</label>
                    <input
                        type="number"
                        value={data.discount_price}
                        onChange={(e) => setData("discount_price", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.discount_price && (
                        <div className="text-red-500">{errors.discount_price}</div>
                    )}
                </div>

                {/* Stock Input */}
                <div className="mb-4">
                    <label className="block">Stock</label>
                    <input
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    />
                    {errors.stock && <div className="text-red-500">{errors.stock}</div>}
                </div>

                <div className="mb-4">
                    <label className="block">Photos</label>
                    <div className="flex space-x-4">
                        {/* Loop through product.product_media */}
                        {product.product_media.map((media, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={media.photo_url} // Assuming photo_url is the field holding the image URL
                                    alt={`Product Photo ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded cursor-pointer"
                                    onClick={() => setIsModalOpen({ open: true, mediaIndex: index })}
                                />
                            </div>
                        ))}
                    </div>
                    {errors.photo && <div className="text-red-500">{errors.photo}</div>}
                </div>

                {/* Modal */}
                {isModalOpen.open && product.product_media[isModalOpen.mediaIndex] && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-4 relative">
                            <button
                                onClick={() => setIsModalOpen({ open: false, mediaIndex: null })}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                            <img
                                src={product.product_media[isModalOpen.mediaIndex].photo_url} // Full photo display
                                alt={`Product Full Photo ${isModalOpen.mediaIndex + 1}`}
                                className="max-w-full max-h-[80vh] object-contain rounded"
                            />
                        </div>
                    </div>
                )}


                {/* Product Type Dropdown */}
                <div className="mb-4">
                    <label className="block">Product Type</label>
                    <select
                        value={data.product_type_id}
                        onChange={(e) => setData("product_type_id", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    >
                        <option value="">Select a Product Type</option>
                        {product_types.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    {errors.product_type_id && (
                        <div className="text-red-500">{errors.product_type_id}</div>
                    )}
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
