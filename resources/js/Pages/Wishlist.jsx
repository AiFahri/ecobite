import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ProductCard from "@/Components/Catalog/ProductCard";
import SearchBar from "@/Components/Catalog/SearchBar";

// Import dummy data untuk wishlist (temporary, nanti diganti dengan data dari backend)
const dummyWishlistProducts = [
    {
        id: 1,
        name: "Fresh Broccoli",
        store: "Hotel California",
        price: 7000,
        oldPrice: 15000,
        verified: true,
        rating: 4,
        image: "/assets/Rectangle 6802.png",
    },
    {
        id: 2,
        name: "Tenderloin Steak",
        store: "Rainbow Hotel",
        price: 35000,
        rating: 5,
        image: "/assets/img/Rectangle 6802 (3).png",
    },
    // ... tambahkan dummy data lainnya sesuai kebutuhan
];

const Wishlist = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(
        dummyWishlistProducts
    );

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter produk berdasarkan nama atau toko
        const filtered = dummyWishlistProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.store.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className="overflow-y-scroll no-scrollbar">
            <div className="container max-w-screen-xl mx-auto">
                <Navbar />
            </div>

            <section>
                <div className="max-w-screen-xl mx-auto font-outfit">
                    <span className="flex">
                        <p>Home</p>
                        <p className="text-[#173302] mx-2">/</p>
                        <p className="text-[#173302]">Wishlist</p>
                    </span>
                    <h2 className="text-2xl my-6 font-semibold text-[#173302]">
                        Wishlist
                    </h2>
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search in your wishlist..."
                        className="w-full mr-12"
                        currentPath="/wishlist"
                    />
                </div>
            </section>

            <section className="hero-7">
                <div className="container max-w-screen-xl mx-auto font-outfit">
                    <div className="grid grid-cols-4 gap-6 mb-20 mt-10">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isWishlist={true}
                                />
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-20">
                                <p className="text-2xl font-semibold text-gray-600">
                                    No items in your wishlist
                                </p>
                                <p className="text-gray-400 mt-2">
                                    Browse our catalog and add items you like to
                                    your wishlist
                                </p>
                            </div>
                        )}
                    </div>

                    {filteredProducts.length > 0 && (
                        <div className="flex justify-between items-center">
                            <p className="text-slate-400">
                                Showing{" "}
                                <b className="text-black font-normal">
                                    {filteredProducts.length}
                                </b>{" "}
                                Products
                            </p>
                            {/* Pagination bisa ditambahkan di sini jika diperlukan */}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Wishlist;
