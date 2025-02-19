import React, { useState, useEffect } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ProductCard from "@/Components/Catalog/ProductCard";
import SearchBar from "@/Components/Catalog/SearchBar";
import WishlistFilter from "@/Components/Wishlist/WishlistFilter";
import PromoImage from "../../assets/promo2.png";

const Wishlist = () => {
    const {
        wishlists = { data: [] },
        productTypes = [],
        tenantTypes = [],
        starCount = [],
        filters = {},
        auth,
    } = usePage().props;

    // State untuk pencarian dan filter produk
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(
        wishlists.data || []
    );

    // Inisialisasi filter dari URL jika ada
    useEffect(() => {
        if (filters) {
            setSearchQuery(filters.search || "");
        }
    }, [filters]);

    // Filter produk berdasarkan pencarian
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts(wishlists.data || []);
        } else {
            const searchTerm = searchQuery.toLowerCase();
            const filtered = wishlists.data?.filter(
                (item) =>
                    item.product.name.toLowerCase().includes(searchTerm) ||
                    item.product.tenant?.name
                        ?.toLowerCase()
                        .includes(searchTerm)
            );
            setFilteredProducts(filtered || []);
        }
    }, [searchQuery, wishlists.data]);

    // Handle input pencarian
    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Perbarui state lokal tanpa memanggil server
    };

    // Kirim query pencarian ke server saat pengguna menekan Enter
    const handleFilter = () => {
        router.get(
            "/wishlist",
            { search: searchQuery },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleToggleWishlist = (productId) => {
        router.post(
            "/wishlist/toggle",
            { product_id: productId },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handleFilterChange = (filters) => {
        setFilteredProducts(wishlists.data); // Reset filtered products saat filter berubah
        router.get("/wishlist", filters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <>
            <Head title="Wishlist" />

            <div className="flex flex-col min-h-screen">
                <div className="container max-w-screen-xl mx-auto">
                    <Navbar auth={auth} />
                </div>

                <div className="flex-1">
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
                                onChange={handleSearch} // Hanya memperbarui state
                                onEnter={handleFilter} // Kirim query ke server saat Enter
                                placeholder="Find something here..."
                                className="w-full mr-12"
                                currentPath="/wishlist"
                            />
                        </div>
                    </section>

                    <section className="mt-10">
                        <div className="container max-w-screen-xl mx-auto font-outfit">
                            <div className="grid grid-cols-4 gap-6 mb-20">
                                {/* Filter Column */}
                                <div className="row-span-full">
                                    <WishlistFilter
                                        productTypes={productTypes}
                                        tenantTypes={tenantTypes}
                                        starCount={starCount}
                                        onFilterChange={handleFilterChange}
                                    />
                                    <div className="rounded-lg mt-6 h-fit text-center font-outfit font-semibold">
                                        <img
                                            src={PromoImage}
                                            className="w-full"
                                            alt="Promo"
                                        />
                                    </div>
                                </div>

                                {/* Products Grid */}
                                <div className="col-span-3">
                                    {filteredProducts.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-6 mt-0">
                                            {filteredProducts.map((item) => (
                                                <ProductCard
                                                    key={item.id}
                                                    product={{
                                                        id: item.product.id,
                                                        name: item.product.name,
                                                        store:
                                                            item.product.tenant
                                                                ?.name ||
                                                            "Unknown Store",
                                                        price: item.product
                                                            .price,
                                                        oldPrice:
                                                            item.product
                                                                .original_price,
                                                        verified:
                                                            item.product.tenant
                                                                ?.is_verified ||
                                                            false,
                                                        rating: item.product
                                                            .ratings_avg_star,
                                                        image: item.product
                                                            .product_media?.[0]
                                                            ?.photo_url,
                                                    }}
                                                    isWishlist={true}
                                                    onToggleWishlist={() =>
                                                        handleToggleWishlist(
                                                            item.product.id
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="col-span-3 text-center py-20">
                                            <p className="text-2xl font-semibold text-gray-600">
                                                No items in your wishlist
                                            </p>
                                            <p className="text-gray-400 mt-2">
                                                Browse our catalog and add
                                                items you like to your wishlist
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Wishlist;
