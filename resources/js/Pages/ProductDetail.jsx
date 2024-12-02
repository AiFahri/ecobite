import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ProductCard from "@/Components/Catalog/ProductCard";
import PriceDetail from "@/Components/ProductDetail/PriceDetail";
import ReviewItem from "@/Components/ProductDetail/ReviewItem";
import SearchBar from "@/Components/Catalog/SearchBar";
import SimilarSection from "@/Components/ProductDetail/SimilarSection";

// Import gambar
import RefreshIcon from "../../assets/material-symbols_refresh.svg";
import WindowIcon from "../../assets/material-symbols_window.svg";
import GridIcon from "../../assets/uis_window-grid.svg";
import EllipseIcon from "../../assets/Ellipse 440.svg";
import PromoImage from "../../assets/promo2.png";

import VectorIcon from "../../assets/Vector.svg";
import GroupIcon from "../../assets/Group.svg";
import OutlineGppIcon from "../../assets/ic_outline-gpp-good.svg";
import ChatIcon from "../../assets/solar_chat-square-like-outline.svg";
import BookmarkIcon from "../../assets/solar_bookmark-linear.svg";
import BookmarkFilledIcon from "../../assets/solar_bookmark-bold.svg";
// import BookmarkIcon from "../../assets/solar_bookmark-linear.svg";
// import BookmarkFilledIcon from "../../assets/solar_bookmark-filled.svg"; // Tambahkan icon untuk wishlist aktif
import ShareIcon from "../../assets/share.svg"; // Tambahkan icon share

const ProductDetail = () => {
    const { product, reviews, meta, similar_products } = usePage().props;
    const productData = product?.data?.product;
    const tenantData = product?.data?.tenant;
    const [searchQuery, setSearchQuery] = useState("");
    const [isWishlisted, setIsWishlisted] = useState(
        productData?.is_wishlisted || false
    );

    if (!productData) {
        return <div>Loading...</div>;
    }
    console.log(productData);
    const mainPhoto = productData?.photo_urls?.[0] || "";
    const additionalPhotos = productData?.photo_urls?.slice(1) || [];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilter = () => {
        // Redirect ke catalog dengan query search
        router.get("/catalog", {
            search: searchQuery,
        });
    };

    const handleToggleWishlist = () => {
        router.post(
            "/wishlist/toggle",
            {
                product_id: productData.id,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setIsWishlisted(!isWishlisted);
                },
            }
        );
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: productData.name,
                    text: productData.description,
                    url: window.location.href,
                });
            } else {
                // Fallback: Copy link to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    return (
        <div className="overflow-y-scroll no-scrollbar">
            <Navbar />
            <section>
                <div className="max-w-screen-xl mx-auto font-outfit">
                    <span className="flex items-center text-gray-400">
                        <p>Home</p>
                        <p className="mx-2">/</p>
                        <p>Catalog</p>
                        <p className="mx-2">/</p>
                        <p className="text-[#173302]">Product Detail</p>
                    </span>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl my-6 font-semibold text-[#173302]">
                            {productData.name}
                        </h2>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleToggleWishlist}
                                className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                            >
                                <img
                                    src={
                                        isWishlisted
                                            ? BookmarkFilledIcon
                                            : BookmarkIcon
                                    }
                                    alt="Save"
                                    className="w-6 h-6"
                                />
                                <span className="text-gray-500">Save</span>
                            </button>
                            <div className="text-gray-300">|</div>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                            >
                                <img
                                    src={ShareIcon}
                                    alt="Share"
                                    className="w-6 h-6"
                                />
                                <span className="text-gray-500">Share</span>
                            </button>
                        </div>
                    </div>
                    <div className="max-w-screen-xl">
                        <SearchBar
                            value={searchQuery}
                            onChange={handleSearch}
                            onEnter={handleFilter}
                            placeholder="Find something here..."
                            className="w-full mr-12"
                            currentPath="/catalog"
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto max-w-screen-xl font-outfit mt-6">
                <div className="grid grid-cols-3 gap-6 mt-10">
                    <div
                        className="col-span-2 w-full h-[300px] bg-no-repeat bg-cover overflow-hidden rounded-sm bg-center"
                        style={{ backgroundImage: `url(${mainPhoto})` }}
                    />
                    <div className="col-span-1">
                        {additionalPhotos.map((img, index) => (
                            <div
                                key={index}
                                className="w-full h-[145px] bg-no-repeat bg-cover overflow-hidden rounded-sm bg-center mb-[10px]"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-3 gap-6 font-outfit">
                    <div className="col-span-2 w-full mt-10">
                        <div className="flex justify-between">
                            <div className="flex">
                                <span className="relative">
                                    <img src={EllipseIcon} alt="Store" />
                                    {tenantData?.is_verified === 1 && (
                                        <div className="w-5 h-5 bg-green-300 rounded-full absolute bottom-0 right-0" />
                                    )}
                                </span>
                                <span className="ml-4">
                                    <h1>{tenantData?.name}</h1>
                                    <span className="flex mt-2 text-gray-500">
                                        <p className="mr-4">
                                            {tenantData?.city}
                                        </p>
                                        <span>•</span>
                                        <p className="ml-4">
                                            {tenantData?.state}
                                        </p>
                                    </span>
                                </span>
                            </div>
                            <p>Rp {productData.price?.toLocaleString()}</p>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">
                                About this food
                            </h3>
                            <p className="text-gray-600">
                                {productData.description}
                            </p>
                        </div>

                        <div className="mt-16">
                            <p>Our Guarantee</p>
                            <div className="grid grid-cols-4 gap-6 w-full h-[100px] mt-4">
                                <span className="bg-gray-200 rounded-md flex flex-col items-center justify-center">
                                    <img
                                        src={VectorIcon}
                                        className="mb-2"
                                        alt="Freshness"
                                    />
                                    <p>Freshness Guarantee</p>
                                </span>
                                <span className="bg-gray-200 rounded-md flex flex-col items-center justify-center">
                                    <img
                                        src={GroupIcon}
                                        className="mb-2"
                                        alt="Quality"
                                    />
                                    <p>Quality Assurance</p>
                                </span>
                                <span className="bg-gray-200 rounded-md flex flex-col items-center justify-center">
                                    <img
                                        src={OutlineGppIcon}
                                        className="mb-2"
                                        alt="Safety"
                                    />
                                    <p>Safety Commitment</p>
                                </span>
                                <span className="bg-gray-200 rounded-md flex flex-col items-center justify-center">
                                    <img
                                        src={ChatIcon}
                                        className="mb-2"
                                        alt="Satisfaction"
                                    />
                                    <p>Taste Satisfaction</p>
                                </span>
                            </div>
                        </div>

                        {reviews && meta && (
                            <div className="border border-slate-200 rounded-lg p-4 mt-16 mb-16">
                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <span>
                                            <p className="font-semibold text-lg">
                                                Food Review
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Showing {meta?.from} -{" "}
                                                {meta?.to} Reviews From{" "}
                                                {meta?.total} Results
                                            </p>
                                        </span>
                                        <button className="px-5 py-4 border border-slate-200 rounded-lg">
                                            Latest
                                        </button>
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-200">
                                    {Array.isArray(reviews?.data) &&
                                        reviews.data.map((review, index) => (
                                            <ReviewItem
                                                key={index}
                                                review={review}
                                            />
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-span-1 w-full mt-10">
                        <PriceDetail
                            product={{
                                ...productData,
                                oldPrice: productData.discount_price || null,
                            }}
                        />
                        <div className="rounded-lg mt-8 overflow-hidden">
                            <img
                                src={PromoImage}
                                className="w-full aspect-[1.3/1]"
                                alt="Special Promo For New User"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <SimilarSection similarProducts={similar_products || []} />

            <Footer />
        </div>
    );
};

export default ProductDetail;
