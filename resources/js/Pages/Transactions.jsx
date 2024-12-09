import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SimilarSection from "@/Components/ProductDetail/SimilarSection";
import SearchBar from "@/Components/Catalog/SearchBar";
import BookmarkIcon from "../../assets/solar_bookmark-linear.svg";
import BookmarkFilledIcon from "../../assets/solar_bookmark-bold.svg";
import ProductFilter from "@/Components/Catalog/ProductFilter";
import Rectangle6802_1 from "../../assets/img/Rectangle 6802 (1).png";

// Import gambar-gambar
import RefreshIcon from "../../assets/assets/refresh.svg";
import SearchIcon from "../../assets/assets/search.svg";
import DeleteIcon from "../../assets/assets/delete.svg";

import TransactionFilter from "@/Components/Transaction/TransactionFilter";

const Transactions = () => {
    const { auth, transactions } = usePage().props;

    console.log(transactions);
    const [searchQuery, setSearchQuery] = useState("");

    // Data dummy yang disesuaikan
    const dummyTransactions = [
        {
            id: 1,
            tenant: "The Aston Family",
            isVerified: true,
            date: "1 December, 2024",
            status: "Selesai",
            product: {
                name: "Vegetable Salad",
                category: "Vegetables",
                price: 220000,
                quantity: 2,
                image: Rectangle6802_1,
            },
        },
        {
            id: 2,
            tenant: "The Aston Family",
            isVerified: true,
            date: "1 December, 2024",
            status: "Selesai",
            product: {
                name: "Fresh Broccoli",
                category: "Vegetables",
                price: 220000,
                quantity: 2,
                image: Rectangle6802_1,
            },
        },
        {
            id: 3,
            tenant: "The Aston Family",
            isVerified: true,
            date: "1 December, 2024",
            status: "Selesai",
            product: {
                name: "Fresh Cabe",
                category: "Vegetables",
                price: 220000,
                quantity: 2,
                image: Rectangle6802_1,
            },
        },
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchEnter = () => {
        router.get(
            "/transactions",
            { search: searchQuery },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <div className="overflow-y-scroll no-scrollbar">
            <Navbar auth={auth} />

            <div className="container max-w-screen-xl mx-auto font-outfit mb-16">
                {/* Breadcrumb & Title */}
                <div className="py-4 space-y-2">
                    <span className="text-gray-500 text-left">
                        Home / Transaction
                    </span>
                    <h1 className="text-2xl font-semibold">Transaction</h1>
                </div>

                {/* Search Bar */}
                <div className="mb-4">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearch}
                        onEnter={handleSearchEnter}
                        placeholder="Search in transaction..."
                        currentPath="/cart"
                        showIcons={true}
                        className="w-full"
                    />
                </div>

                {/* Main Content - Filter & Products */}
                <div className="flex gap-4">
                    {/* Left Sidebar - Filter */}
                    <div className="w-1/4">
                        <TransactionFilter />
                    </div>

                    {/* Right Content - Product Summary */}
                    <div className="w-3/4">
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Product Summary
                                </h2>
                            </div>

                            <div className="divide-y">
                                {transactions.data.map((transaction) => (
                                    <div key={transaction.id} className="p-4">
                                        {/* Tenant Info */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="font-medium">
                                                {
                                                    transaction
                                                        .transaction_items[0]
                                                        .product.tenant.name
                                                }
                                            </span>
                                            {transaction.transaction_items[0]
                                                .product.tenant.is_verified && (
                                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                                    Verified
                                                </span>
                                            )}
                                            <span className="text-gray-500 text-sm">
                                                {transaction.created_at}
                                            </span>
                                            <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full">
                                                {transaction.status}
                                            </span>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex items-start">
                                            <div className="flex-1 flex">
                                                <img
                                                    src={
                                                        transaction
                                                            .transaction_items[0]
                                                            .product
                                                            .product_media[0]
                                                            .photo_url
                                                    }
                                                    alt={
                                                        transaction
                                                            .transaction_items[0]
                                                            .product.name
                                                    }
                                                    className="w-20 h-20 object-cover rounded-lg mr-4"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    transaction
                                                                        .transaction_items[0]
                                                                        .product
                                                                        .product_type
                                                                        .name
                                                                }
                                                            </span>
                                                            <h3 className="text-lg font-medium">
                                                                {
                                                                    transaction
                                                                        .transaction_items[0]
                                                                        .product
                                                                        .name
                                                                }
                                                            </h3>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500">
                                                                Total:
                                                            </p>
                                                            <p className="font-semibold">
                                                                Rp{" "}
                                                                {transaction.transaction_items[0].product.price.toLocaleString()}
                                                            </p>
                                                            <div className="flex gap-2 mt-2">
                                                                <button className="text-gray-600 text-sm hover:text-gray-800">
                                                                    Detail
                                                                    Transaction
                                                                </button>
                                                                <button className="bg-[#A1E870] text-[#173302] px-4 py-1 rounded-lg text-sm">
                                                                    Repurchase
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    Total:
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {
                                                            transaction
                                                                .transaction_items[0]
                                                                .quantity
                                                        }{" "}
                                                        items x Rp{" "}
                                                        {(
                                                            transaction
                                                                .transaction_items[0]
                                                                .product.price /
                                                            transaction
                                                                .transaction_items[0]
                                                                .product.stocks
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tambahkan pagination */}
                            {transactions.data?.length > 0 && (
                                <div className="p-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <p className="text-slate-400">
                                            Showing{" "}
                                            <b className="text-black font-normal">
                                                {transactions.from || 0} -{" "}
                                                {transactions.to || 0}
                                            </b>{" "}
                                            Products From{" "}
                                            <b className="text-black font-normal">
                                                {transactions.total || 0}
                                            </b>{" "}
                                            Results
                                        </p>

                                        <span className="flex">
                                            {transactions.links?.map(
                                                (link, i) => {
                                                    if (
                                                        link.label ===
                                                        "&laquo; Previous"
                                                    ) {
                                                        return (
                                                            <button
                                                                key={i}
                                                                className={`p-2 mx-1 ${
                                                                    link.active
                                                                        ? "bg-[#173302] text-white"
                                                                        : "border border-slate-200"
                                                                } rounded-md w-10 h-10 text-center`}
                                                                onClick={() =>
                                                                    link.url &&
                                                                    router.get(
                                                                        link.url
                                                                    )
                                                                }
                                                                disabled={
                                                                    !link.url
                                                                }
                                                            >
                                                                &lt;
                                                            </button>
                                                        );
                                                    }
                                                    if (
                                                        link.label ===
                                                        "Next &raquo;"
                                                    ) {
                                                        return (
                                                            <button
                                                                key={i}
                                                                className={`p-2 mx-1 ${
                                                                    link.active
                                                                        ? "bg-[#173302] text-white"
                                                                        : "border border-slate-200"
                                                                } rounded-md w-10 h-10 text-center`}
                                                                onClick={() =>
                                                                    link.url &&
                                                                    router.get(
                                                                        link.url
                                                                    )
                                                                }
                                                                disabled={
                                                                    !link.url
                                                                }
                                                            >
                                                                &gt;
                                                            </button>
                                                        );
                                                    }
                                                    return (
                                                        <button
                                                            key={i}
                                                            className={`p-2 mx-1 ${
                                                                link.active
                                                                    ? "bg-[#173302] text-white"
                                                                    : "border border-slate-200"
                                                            } rounded-md w-10 h-10 text-center`}
                                                            onClick={() =>
                                                                link.url &&
                                                                router.get(
                                                                    link.url
                                                                )
                                                            }
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    );
                                                }
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Transactions;
