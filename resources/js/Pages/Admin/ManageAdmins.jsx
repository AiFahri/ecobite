import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function ManageAdmins() {
    const { admins, flash, auth } = usePage().props;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Admins</h1>
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
                <Link
                    href={route("admin.manageAdmins.create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Add Admin
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-center px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                                No
                            </th>
                            <th className="text-center px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                                Name
                            </th>
                            <th className="text-center px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                                Email
                            </th>
                            <th className="text-center px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                                Tenant Name
                            </th>
                            <th className="text-center px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {admins.data.map((admin, index) => (
                            <tr key={admin.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900 text-center">
                                    {index + 1 + (admins.current_page - 1) * admins.per_page}
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-center">{admin.name}</td>
                                <td className="px-6 py-4 text-gray-600 text-center">{admin.email}</td>
                                <td className="px-6 py-4 text-gray-600 text-center">{admin.tenant?.name || '-'}</td>
                                <td className="px-6 py-4 flex space-x-2 text-center">
                                    <Link
                                        href={route("admin.manageAdmins.edit", admin.id)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        as="button"
                                        method="delete"
                                        href={route("admin.manageAdmins.destroy", admin.id)}
                                        className={`px-4 py-2 rounded-md text-white ${
                                            admin.id === auth.user.id
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-red-500 hover:bg-red-600"
                                        }`}
                                        disabled={admin.id === auth.user.id}
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                {/* Previous Button */}
                {admins.prev_page_url && (
                    <Link
                        href={admins.prev_page_url}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Previous
                    </Link>
                )}
                <span>
                    Page {admins.current_page} of {admins.last_page}
                </span>
                {/* Next Button */}
                {admins.next_page_url && (
                    <Link
                        href={admins.next_page_url}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
