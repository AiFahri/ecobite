import { usePage, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import RefreshIcon from "../../assets/material-symbols_refresh.svg";
import CommandIcon from "../../assets/ph_command-bold.svg";
import KIcon from "../../assets/K.svg";
import WindowIcon from "../../assets/material-symbols_window.svg";
import GridIcon from "../../assets/uis_window-grid.svg";
import PromoImage from "../../assets/promo2.png";
import DiscountImage from "../../assets/Rectangle 6802.png";
import ArrowDownIcon from "../../assets/iconamoon_arrow-down-2-bold.svg";
import ArrowDownIcon2 from "../../assets/iconamoon_arrow-down-2-bold (1).svg";
import Rectangle6802_3 from "../../assets/img/Rectangle 6802 (3).png";
import Rectangle6802_4 from "../../assets/img/Rectangle 6802 (4).png";
import Rectangle6802_5 from "../../assets/img/Rectangle 6802 (5).png";
import Rectangle6802_6 from "../../assets/img/Rectangle 6802 (6).png";
import Rectangle6802_7 from "../../assets/img/Rectangle 6802 (7).png";
import Rectangle6802_8 from "../../assets/img/Rectangle 6802 (8).png";
import Rectangle6802_9 from "../../assets/img/Rectangle 6802 (9).png";
import Frame1000007030 from "../../assets/img/Frame 1000007030.png";
import Frame1000007030_1 from "../../assets/img/Frame 1000007030 (1).png";
import Rectangle6802_1 from "../../assets/img/Rectangle 6802 (1).png";
import Rectangle6802_2 from "../../assets/img/Rectangle 6802 (2).png";
import Navbar from "@/Components/Navbar";
import ProductFilter from "@/Components/Catalog/ProductFilter";
import Footer from "@/Components/Footer";
import ProductCard from "@/Components/Catalog/ProductCard";
import SearchBar from "@/Components/Catalog/SearchBar";

const Catalog = () => {
    const {
        products,
        productTypes,
        tenantTypes,
        starCount,
        filters = {},
        wishlists = [],
    } = usePage().props;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(
        products?.data || []
    );

    useEffect(() => {
        if (filters) {
            setSearchQuery(filters.search || "");
            setSelectedType(filters.type || "");
            setSelectedRating(filters.rating || "");
        }
    }, [filters]);

    useEffect(() => {
        // Filter products berdasarkan searchQuery (nama produk atau nama tenant)
        if (searchQuery.trim() === "") {
            setFilteredProducts(products?.data || []);
        } else {
            const searchTerm = searchQuery.toLowerCase();
            const filtered = products?.data?.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.tenant?.name?.toLowerCase().includes(searchTerm)
            );
            setFilteredProducts(filtered || []);
        }
    }, [searchQuery, products?.data]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilter = () => {
        router.get(
            "/catalog",
            {
                search: searchQuery,
                type: selectedType,
                rating: selectedRating,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleToggleWishlist = (productId) => {
        router.post(
            "/wishlist/toggle",
            {
                product_id: productId,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    console.log("Toggle wishlist success");
                },
                onError: (errors) => {
                    console.error("Toggle wishlist error:", errors);
                },
            }
        );
    };

    return (
        <>
            <div className="overflow-y-scroll no-scrollbar">
                <div className="container max-w-screen-xl mx-auto font-outfit">
                    <Navbar />
                </div>
                <section>
                    <div className="max-w-screen-xl mx-auto font-outfit">
                        <span className="flex">
                            <p>Home</p>
                            <p className="text-[#173302] mx-2">/</p>
                            <p className="text-[#173302]">Catalog</p>
                        </span>
                        <h2 className="text-2xl my-6 font-semibold text-[#173302]">
                            Catalog Page
                        </h2>
                        <SearchBar
                            value={searchQuery}
                            onChange={handleSearch}
                            onEnter={handleFilter}
                            placeholder="Find something here..."
                            className="w-full mr-12"
                            currentPath="/catalog"
                        />
                    </div>
                </section>
                <section className="mt-10">
                    <div className="container max-w-screen-xl mx-auto font-outfit">
                        <div className="grid grid-cols-4 gap-6 mb-20">
                            <div className="row-span-full">
                                <ProductFilter
                                    productTypes={productTypes || []}
                                    tenantTypes={tenantTypes || []}
                                    starCount={starCount || []}
                                    selectedType={selectedType}
                                    setSelectedType={setSelectedType}
                                    selectedRating={selectedRating}
                                    setSelectedRating={setSelectedRating}
                                    onFilter={handleFilter}
                                />
                                <div className="rounded-lg mt-6 h-fit text-center font-outfit font-semibold">
                                    <img
                                        src={PromoImage}
                                        className="w-full"
                                        alt="Promo"
                                    />
                                </div>
                            </div>

                            <div className="col-span-3">
                                {filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-6 mt-0">
                                        {filteredProducts.map((product) => {
                                            console.log("Product data:", {
                                                id: product.id,
                                                ratings:
                                                    product.ratings_avg_star,
                                                // ... other data
                                            });
                                            return (
                                                <ProductCard
                                                    key={product.id}
                                                    product={{
                                                        id: product.id,
                                                        image:
                                                            Array.isArray(
                                                                product.product_media
                                                            ) &&
                                                            product
                                                                .product_media
                                                                .length > 0
                                                                ? product
                                                                      .product_media[0]
                                                                      .photo_url
                                                                : DiscountImage,
                                                        name: product.name,
                                                        store:
                                                            product.tenant
                                                                ?.name ||
                                                            "Unknown Store",
                                                        price: product.price,
                                                        oldPrice:
                                                            product.original_price,
                                                        verified:
                                                            product.tenant
                                                                ?.is_verified ||
                                                            false,
                                                        rating:
                                                            Math.floor(product.ratings_avg_star) ||
                                                            0,
                                                    }}
                                                    isWishlist={wishlists.includes(
                                                        product.id.toString()
                                                    )}
                                                    onToggleWishlist={() =>
                                                        handleToggleWishlist(
                                                            product.id
                                                        )
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center mt-10 py-20">
                                        <p className="text-2xl font-semibold text-gray-600">
                                            No products found
                                        </p>
                                        <p className="text-gray-400 mt-2">
                                            Try searching with other keywords
                                        </p>
                                    </div>
                                )}

                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <p className="text-slate-400">
                                            Showing{" "}
                                            <b className="text-black font-normal">
                                                {products?.from || 0} -{" "}
                                                {products?.to || 0}
                                            </b>{" "}
                                            Products From{" "}
                                            <b className="text-black font-normal">
                                                {products?.total || 0}{" "}
                                            </b>
                                            Results
                                        </p>

                                        <span className="flex">
                                            {products?.links?.map((link, i) => {
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
                                                            disabled={!link.url}
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
                                                            disabled={!link.url}
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
                                                            router.get(link.url)
                                                        }
                                                        dangerouslySetInnerHTML={{
                                                            __html: link.label,
                                                        }}
                                                    />
                                                );
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default Catalog;
