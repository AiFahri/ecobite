import { useState } from "react";
import { usePage } from "@inertiajs/react";
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

const Transaction = () => {
    const { auth } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");

    // Data dummy yang disesuaikan
    // const dummyTransactions = [
    //     {
    //         id: 1,
    //         tenant: "The Aston Family",
    //         isVerified: true,
    //         date: "1 December, 2024",
    //         status: "Selesai",
    //         product: {
    //             name: "Vegetable Salad",
    //             category: "Vegetables",
    //             price: 220000,
    //             quantity: 2,
    //             image: Rectangle6802_1,
    //         },
    //     },
    //     {
    //         id: 2,
    //         tenant: "The Aston Family",
    //         isVerified: true,
    //         date: "1 December, 2024",
    //         status: "Selesai",
    //         product: {
    //             name: "Fresh Broccoli",
    //             category: "Vegetables",
    //             price: 220000,
    //             quantity: 2,
    //             image: Rectangle6802_1,
    //         },
    //     },
    //     {
    //         id: 3,
    //         tenant: "The Aston Family",
    //         isVerified: true,
    //         date: "1 December, 2024",
    //         status: "Selesai",
    //         product: {
    //             name: "Fresh Cabe",
    //             category: "Vegetables",
    //             price: 220000,
    //             quantity: 2,
    //             image: Rectangle6802_1,
    //         },
    //     },
    // ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchEnter = () => {
        // Implementasi pencarian produk di cart
        console.log("Searching cart items:", searchQuery);
        // Di sini bisa ditambahkan logika untuk filter produk di cart
    };

    return (
        <div className="overflow-y-scroll no-scrollbar">
            <Navbar auth={auth} />

            <div className="container max-w-screen-xl mx-auto font-outfit">
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
                        placeholder="Cari sesuatu di keranjang..."
                        currentPath="/cart"
                        showIcons={true}
                        className="w-full"
                    />
                </div>

                {/* Main Content - Filter & Products */}
                <div className="flex gap-4">
                    {/* Left Sidebar - Filter */}
                    <div className="w-1/4">
                        <ProductFilter />
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
                                {dummyTransactions.map((transaction) => (
                                    <div key={transaction.id} className="p-4">
                                        {/* Tenant Info */}
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="font-medium">
                                                {transaction.tenant}
                                            </span>
                                            {transaction.isVerified && (
                                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                                    Verified
                                                </span>
                                            )}
                                            <span className="text-gray-500 text-sm">
                                                {transaction.date}
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
                                                        transaction.product
                                                            .image
                                                    }
                                                    alt={
                                                        transaction.product.name
                                                    }
                                                    className="w-20 h-20 object-cover rounded-lg mr-4"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    transaction
                                                                        .product
                                                                        .category
                                                                }
                                                            </span>
                                                            <h3 className="text-lg font-medium">
                                                                {
                                                                    transaction
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
                                                                {transaction.product.price.toLocaleString()}
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
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        {
                                                            transaction.product
                                                                .quantity
                                                        }{" "}
                                                        items x Rp{" "}
                                                        {(
                                                            transaction.product
                                                                .price /
                                                            transaction.product
                                                                .quantity
                                                        ).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Transaction;
