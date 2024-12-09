import React, { useState } from "react";
import Frame237995 from "../../../assets/Frame 237995.png";
import Frame237996 from "../../../assets/Frame 237996.png";
import Line20 from "../../../assets/Line 20.png";
import ProductCard from "@/Components/Catalog/ProductCard";
import { router } from "@inertiajs/react";

const SimilarSection = ({ similarProducts }) => {
    const { data = [], message } = similarProducts || {
        data: [],
        message: null,
    };

    if (!data || data.length === 0) {
        return (
            <div className="container max-w-screen-xl mx-auto font-outfit mt-10">
                <h2 className="text-2xl font-semibold mb-6">
                    Similar Selection
                </h2>
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                    <p className="text-xl text-gray-600 mb-2">
                        {message || "No similar products found"}
                    </p>
                </div>
            </div>
        );
    }

    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 4;

    // Hitung total halaman
    const totalPages = Math.ceil(data.length / productsPerPage);

    // Ambil produk untuk halaman saat ini
    const getCurrentPageProducts = () => {
        const start = currentPage * productsPerPage;
        const end = start + productsPerPage;
        return data.slice(start, end);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handleToggleWishlist = (productId) => {
        router.post(
            "/wishlist/toggle",
            { product_id: productId },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // UI akan diupdate otomatis karena preserveState: true
                },
                onError: (errors) => {
                    if (errors?.message === "Unauthenticated.") {
                        window.location.href = "/login";
                    }
                },
            }
        );
    };

    return (
        <div className="mb-20">
            <div className="font-outfit max-w-screen-xl container mx-auto flex justify-between items-center mt-10">
                <p className="font-bold text-2xl text-[#173302]">
                    Similar Selection
                </p>
                <span className="flex space-x-3">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className={
                            currentPage === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }
                    >
                        <img src={Frame237995} alt="Previous" />
                    </button>
                    <img src={Line20} alt="Separator" />
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages - 1}
                        className={
                            currentPage >= totalPages - 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }
                    >
                        <img src={Frame237996} alt="Next" />
                    </button>
                </span>
            </div>

            <div className="container max-w-screen-xl mx-auto font-outfit mt-6">
                <div className="grid grid-cols-4 gap-6">
                    {getCurrentPageProducts().map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                image: product.photo_urls?.[0] || product.image,
                                price: product.price,
                                oldPrice: product.oldPrice,
                                store: product.tenant?.name || product.store,
                                rating: product.avg_stars || product.rating,
                                verified:
                                    product.tenant?.is_verified ||
                                    product.verified,
                            }}
                            isWishlist={product.is_wishlisted}
                            onToggleWishlist={() =>
                                handleToggleWishlist(product.id)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SimilarSection;
