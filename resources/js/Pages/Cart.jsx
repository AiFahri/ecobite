import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SimilarSection from "@/Components/ProductDetail/SimilarSection";
import SearchBar from "@/Components/Catalog/SearchBar";
import BookmarkIcon from "../../assets/solar_bookmark-linear.svg";
import BookmarkFilledIcon from "../../assets/solar_bookmark-bold.svg";

// Import gambar-gambar
import RefreshIcon from "../../assets/assets/refresh.svg";
import SearchIcon from "../../assets/assets/search.svg";
import DeleteIcon from "../../assets/assets/delete.svg";

const Cart = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectAll, setSelectAll] = useState(false);

    // Data dummy yang lebih sesuai
    const dummyProducts = [
        {
            id: 1,
            name: "Vegetable Salad",
            category: "Vegetables",
            price: 220000,
            quantity: 1,
            stock: 54,
            image: "/path/to/salad-image.jpg",
            isSelected: false,
        },
        {
            id: 2,
            name: "Fresh Broccoli",
            category: "Vegetables",
            price: 220000,
            quantity: 1,
            stock: 23,
            image: "/path/to/broccoli-image.jpg",
            isSelected: false,
        },
        {
            id: 3,
            name: "Breakfast Set",
            category: "Vegetables",
            price: 220000,
            quantity: 1,
            stock: 51,
            image: "/path/to/breakfast-image.jpg",
            isSelected: false,
        },
        {
            id: 4,
            name: "Smoked Salmon",
            category: "Heavy Meal",
            price: 220000,
            quantity: 1,
            stock: 44,
            image: "/path/to/salmon-image.jpg",
            isSelected: false,
        },
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchEnter = () => {
        // Implementasi pencarian produk di cart
        console.log("Searching cart items:", searchQuery);
        // Di sini bisa ditambahkan logika untuk filter produk di cart
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    return (
        <div className="overflow-y-scroll no-scrollbar">
            <Navbar />

            <div className="flex flex-col space-y-4">
                {/* Header */}
                <div className="container max-w-screen-xl mx-auto font-outfit">
                    <div className="flex flex-col py-4 space-y-2">
                        <span className="text-gray-500 text-left">
                            Home / Transaction
                        </span>
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold mb-4">
                                Transaction
                            </h1>
                        </div>
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
                </div>

                {/* Main Content */}
                <div className="container max-w-screen-xl mx-auto font-outfit">
                    <div className="flex space-x-4">
                        {/* Product Summary */}
                        <div className="w-2/3 bg-white rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Product Summary
                                </h2>
                                <div className="flex items-center space-x-6">
                                    <button className="flex items-center space-x-2 text-gray-600">
                                        <span>Delete All</span>
                                        <img
                                            src={DeleteIcon}
                                            alt="delete"
                                            className="w-5 h-5"
                                        />
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">
                                            Choose All
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={() =>
                                                setSelectAll(!selectAll)
                                            }
                                            className="w-5 h-5 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Product List */}
                            <div className="divide-y">
                                {dummyProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="p-4 flex items-start"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={product.isSelected}
                                            onChange={() => {}}
                                            className="mt-2 w-5 h-5 border border-gray-300 rounded mr-4"
                                        />

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-20 h-20 object-cover rounded-lg mr-4"
                                        />

                                        <div className="flex-1">
                                            <span className="text-sm text-gray-500">
                                                {product.category}
                                            </span>
                                            <h3 className="text-lg font-medium mt-1">
                                                {product.name}
                                            </h3>

                                            <div className="flex items-center mt-3">
                                                <div className="flex border rounded-lg overflow-hidden">
                                                    <button className="px-3 py-1 bg-white border-r hover:bg-gray-100">
                                                        −
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={product.quantity}
                                                        className="w-12 text-center"
                                                        readOnly
                                                    />
                                                    <button className="px-3 py-1 bg-white border-l hover:bg-gray-100">
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600 mt-2">
                                                Stock Total: {product.stock} pcs
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end space-y-2">
                                            <div className="text-right">
                                                <span className="text-sm text-gray-500">
                                                    Total : x{product.quantity}
                                                </span>
                                                <p className="font-semibold">
                                                    Rp{" "}
                                                    {product.price.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="p-2 hover:bg-gray-100 rounded">
                                                    <img
                                                        src={BookmarkIcon}
                                                        alt="Save"
                                                        className="w-5 h-5"
                                                    />
                                                </button>
                                                <button className="p-2 hover:bg-gray-100 rounded">
                                                    <img
                                                        src={DeleteIcon}
                                                        alt="Delete"
                                                        className="w-5 h-5"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rincian Harga */}
                        <div className="w-1/3 self-start p-4 border border-gray-300 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">
                                Rincian Harga
                            </h2>
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Price Total</span>
                                    <span className="text-[#173302]">Rp 0</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery</span>
                                    <span className="text-[#173302]">Rp 0</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Discount (Promo)</span>
                                    <span className="text-[#173302]">Rp 0</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span className="text-[#173302]">
                                            Rp 0
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Banner */}
                            <div className="bg-[#173302] text-white rounded-lg p-4 mb-4 text-center">
                                <h3 className="font-semibold text-lg">
                                    Enjoy Special Promo
                                </h3>
                                <p>For New User!</p>
                            </div>

                            {/* Button Pesan */}
                            <button className="w-full bg-[#A1E870] text-[#173302] font-semibold py-3 rounded-lg">
                                Pesan Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
