import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function ManageTransactions() {
    const { products, flash, auth } = usePage().props;

    console.log(products);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
            {/* Flash Message */}
            {flash?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    {flash.success}
                </div>
            )}
            <div className="flex justify-between items-center mb-4">
                {/* Back to Dashboard Button */}
                <Link
                    href={route("admin.dashboard")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Back to Dashboard
                </Link>

                {auth.tenant_id !== null && (
                    <Link
                        href={route("admin.manageProducts.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Add Products
                    </Link>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-center px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                                No
                            </th>
                            <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Name
                            </th>
                            <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Price
                            </th>
                            <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Stock
                            </th>
                            <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Product Type
                            </th>
                            <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Tenant Name
                            </th>
                            {auth.tenant_id !== null && (
                                <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.data.map((product, index) => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-gray-900 text-center">
                                    {index + 1 + (products.current_page - 1) * products.per_page}
                                </td>
                                <td className="px-6 py-4 text-gray-900 font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-gray-600">{product?.discount_price.toLocaleString()} - {product.price.toLocaleString()}</td>
                                <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                                <td className="px-6 py-4 text-gray-600">{product.product_type.name}</td>
                                <td className="px-6 py-4 text-gray-600">{product.tenant.name}</td>
                                {auth.tenant_id !== null && (
                                    <td className="px-6 py-4 flex space-x-2 text-center">
                                        <Link
                                            href={route("admin.manageAdmins.edit", product.id)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route("admin.manageProducts.destroy", product.id)}
                                            className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                {/* Previous Button */}
                {products.prev_page_url && (
                    <Link
                        href={products.prev_page_url}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Previous
                    </Link>
                )}
                <span>
                    Page {products.current_page} of {products.last_page}
                </span>
                {/* Next Button */}
                {products.next_page_url && (
                    <Link
                        href={products.next_page_url}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
