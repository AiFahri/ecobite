import { useState } from "react";
import { router } from "@inertiajs/react";
import Logo from "../../../assets/logo.png";

const TransactionFilter = () => {
    const [expandedSections, setExpandedSections] = useState({
        status: true,
        date: true,
    });

    const [selectedStatus, setSelectedStatus] = useState([]);
    const [dateRange, setDateRange] = useState({
        from: "",
        to: "",
    });

    const statusOptions = [
        { name: "Pending", value: "waiting-for-payment" },
        { name: "Processing", value: "processing" },
        { name: "Completed", value: "completed" },
        { name: "Cancelled", value: "cancelled" },
    ];

    const handleStatusChange = (status) => {
        const newStatus = selectedStatus.includes(status)
            ? selectedStatus.filter((s) => s !== status)
            : [...selectedStatus, status];

        setSelectedStatus(newStatus);
        applyFilters({ status: newStatus.join(",") });
    };

    const handleDateChange = (type, value) => {
        const newDateRange = { ...dateRange, [type]: value };
        setDateRange(newDateRange);

        if (newDateRange.from && newDateRange.to) {
            applyFilters({
                date_from: newDateRange.from,
                date_to: newDateRange.to,
            });
        }
    };

    const applyFilters = (newFilters) => {
        router.get("/transactions", newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="border border-slate-200 p-6 rounded-lg">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <img src={Logo} className="w-6 h-6" alt="Logo" />
                <div>
                    <p className="text-secondary text-sm">Filter</p>
                    <p className="text-[#173302] font-semibold text-lg">
                        Transaction
                    </p>
                </div>
            </div>

            {/* Status Filter */}
            <div className="mt-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("status")}
                >
                    <p className="font-semibold text-[#173302]">Status</p>
                    <span
                        className={`transform transition-transform ${
                            expandedSections.status ? "rotate-180" : ""
                        }`}
                    >
                        ▼
                    </span>
                </div>
                {expandedSections.status && (
                    <div className="mt-4 space-y-4">
                        {statusOptions.map((status) => (
                            <div
                                key={status.value}
                                className="flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    id={status.value}
                                    checked={selectedStatus.includes(
                                        status.value
                                    )}
                                    onChange={() =>
                                        handleStatusChange(status.value)
                                    }
                                    className="w-4 h-4 rounded border-gray-300"
                                />
                                <label
                                    htmlFor={status.value}
                                    className="ml-3 text-gray-700"
                                >
                                    {status.name}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Date Filter */}
            <div className="mt-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("date")}
                >
                    <p className="font-semibold text-[#173302]">Date Range</p>
                    <span
                        className={`transform transition-transform ${
                            expandedSections.date ? "rotate-180" : ""
                        }`}
                    >
                        ▼
                    </span>
                </div>
                {expandedSections.date && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                From
                            </label>
                            <input
                                type="date"
                                value={dateRange.from}
                                onChange={(e) =>
                                    handleDateChange("from", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-lg p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                To
                            </label>
                            <input
                                type="date"
                                value={dateRange.to}
                                onChange={(e) =>
                                    handleDateChange("to", e.target.value)
                                }
                                className="w-full border border-gray-200 rounded-lg p-2"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionFilter;
