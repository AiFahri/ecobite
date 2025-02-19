import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function EditTransaction() {
    const { transactions, employees, auth } = usePage().props; // Mengakses data tenants dari props
    const { data, setData, put, errors } = useForm({
        employee: transactions.employee_id || "",
        tenant_id: auth.tenant_id || "", // Set default tenant_id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.manageTransactions.update", transactions.id));
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Edit Transaction</h1>
            <div className="mb-4">
                {/* Back to Manage Admins Button */}
                <Link
                    href={route("admin.manageTransactions")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Back to Manage Transactions
                </Link>
            </div>
            
            <form onSubmit={handleSubmit}>
                {/* Disabled Input for transactions.id */}
                <div className="mb-4">
                    <label className="block">Transaction ID</label>
                    <input
                        type="text"
                        value={transactions.id}
                        disabled
                        className="border rounded w-full px-3 py-2 bg-gray-200 cursor-not-allowed"
                    />
                </div>

                {/* Disabled Input for transactions.address.user.email */}
                <div className="mb-4">
                    <label className="block">Customer's Email</label>
                    <input
                        type="email"
                        value={transactions.address.user.email}
                        disabled
                        className="border rounded w-full px-3 py-2 bg-gray-200 cursor-not-allowed"
                    />
                </div>

                <div className="mb-4">
                    <label className="block">Employee</label>
                    <select
                        value={data.tenant_id}
                        onChange={(e) => setData("employee_id", e.target.value)}
                        className="border rounded w-full px-3 py-2"
                    >
                        <option value="">Select a Driver</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
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
