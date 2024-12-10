import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function ManageTransactions() {
    const { transactions, flash, auth } = usePage().props;

    console.log(transactions);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Manage Transactions</h1>
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
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden text-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-center px-6 py-3 text-gray-600 font-semibold uppercase tracking-wider">
                                No
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                ID
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Total
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Status
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Payment Type
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                User
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                Created At
                            </th>
                            {auth.tenant_id !== null && (
                                <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider border-b border-gray-300">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.data.map((transaction, index) => (
                            <tr key={transaction.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-gray-900 text-center">
                                    {index + 1 + (transactions.current_page - 1) * transactions.per_page}
                                </td>
                                <td className="px-4 py-2 text-gray-900 font-medium">{transaction.id}</td>
                                <td className="px-4 py-2 text-gray-600">{transaction.total}</td>
                                <td
                                    className={`px-4 py-2 text-sm font-medium ${
                                        transaction.status === 'Completed'
                                            ? 'text-green-600'
                                            : transaction.status === 'Pending'
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {transaction.status}
                                </td>
                                <td className="px-4 py-2 text-gray-600">{transaction.payment_type}</td>
                                <td className="px-4 py-2 text-gray-600">{transaction.address.user.email}</td>
                                <td className="px-4 py-2 text-gray-600">{new Date(transaction.created_at).toLocaleString()}</td>
                                {auth.tenant_id !== null && (
                                    <td className="px-6 py-4 flex space-x-2 text-center">
                                        <Link
                                            href={transaction.status === 'waiting-for-driver' 
                                                ? route("admin.manageAdmins.edit", transaction.id) 
                                                : "#"}
                                            className={`px-4 py-2 rounded-md ${
                                                transaction.status === 'waiting-for-driver'
                                                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                            onClick={(e) => {
                                                if (transaction.status !== 'waiting-for-driver') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Edit
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
                {transactions.prev_page_url && (
                    <Link
                        href={transactions.prev_page_url}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Previous
                    </Link>
                )}
                <span>
                    Page {transactions.current_page} of {transactions.last_page}
                </span>
                {/* Next Button */}
                {transactions.next_page_url && (
                    <Link
                        href={transactions.next_page_url}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Next
                    </Link>
                )}
            </div>
        </div>
    );
}
