import React from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;
    const { post } = useForm();

    console.log(auth);

    const logout = (e) => {
        e.preventDefault();
        post(route("admin.logout"));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <h1>Selamat Datang, {auth.name}</h1>
                        <form onSubmit={logout}>
                            <button
                                type="submit"
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </header>
            <main className="flex-grow container mx-auto py-6 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Manage Admins Card */}
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Manage Admins</h2>
                        <p className="text-gray-600 mb-4">
                            Add, edit, or delete admin accounts for the application.
                        </p>
                        <a
                            href={route("admin.manageAdmins")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Go to Manage Admins
                        </a>
                    </div>
                    
                    {auth.tenant_id === null && (
                        <div className="bg-white shadow-md rounded-md p-6 mb-6">
                            <h2 className="text-lg font-semibold mb-4">Manage Tenants</h2>
                            <p className="text-gray-600 mb-4">
                                View and manage tenants, including adding or removing them.
                            </p>
                            <a
                                href={route("admin.manageTenants")}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Go to Manage Tenants
                            </a>
                        </div>
                    )}

                        <div className="bg-white shadow-md rounded-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Manage Transactions</h2>
                            <p className="text-gray-600 mb-4">
                                View and manage all transactions, including tracking, adding, or deleting transaction records.
                            </p>
                            <a
                                href={route("admin.manageTransactions")}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Go to Manage Transactions
                            </a>
                        </div>

                    {/* Manage Employee Card */}
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Manage Employees</h2>
                        <p className="text-gray-600 mb-4">
                            View and manage employees, including adding, editing, or removing employee details.
                        </p>
                        <a
                            href={route("admin.manageEmployees")}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Go to Manage Employees
                        </a>
                    </div>

                    {/* Manage Transactions Card */}
                    <div className="bg-white shadow-md rounded-md p-6">
                        <h2 className="text-lg font-semibold mb-4">Manage Products</h2>
                        <p className="text-gray-600 mb-4">
                            View and manage all transactions, including tracking, adding, or deleting transaction records.
                        </p>
                        <a
                            href={route("admin.manageProducts")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Go to Manage Products
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
