import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ProductCard from "@/Components/Catalog/ProductCard";
import PriceDetail from "@/Components/ProductDetail/PriceDetail";
import ReviewItem from "@/Components/ProductDetail/ReviewItem";

// Import gambar
import RefreshIcon from "../../assets/material-symbols_refresh.svg";
import WindowIcon from "../../assets/material-symbols_window.svg";
import GridIcon from "../../assets/uis_window-grid.svg";
import Rectangle6833 from "../../assets/Rectangle 6833.png";
import EllipseIcon from "../../assets/Ellipse 440.svg";
import VectorIcon from "../../assets/Vector.svg";
import GroupIcon from "../../assets/Group.svg";
import OutlineGppIcon from "../../assets/ic_outline-gpp-good.svg";
import ChatIcon from "../../assets/solar_chat-square-like-outline.svg";
import UserImage from "../../assets/Ellipse 440.png";
import ReviewsStatus from "../../assets/Reviews + Status.svg";
import ArrowDownIcon from "../../assets/iconamoon_arrow-down-2-bold (1).svg";
import DiscountImage from "../../assets/Rectangle 6802.png";
import PromoImage from "../../assets/promo.png";

const ProductDetail = () => {
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
                    <h2 className="text-2xl my-6 font-semibold text-[#173302]">
                        Vegetable Salad
                    </h2>
                    <div className="flex items-center">
                        <div className="py-[10px] px-3 inline-block border border-slate-400 rounded-lg mr-4">
                            <img src={RefreshIcon} alt="Refresh" />
                        </div>
                        <div className="flex border border-slate-400 w-full rounded-lg p-2 mr-12">
                            <input
                                type="text"
                                className="w-full outline-none"
                            />
                        </div>
                        <span className="border border-slate-400 py-2 px-4 rounded-lg mr-4">
                            <p>Relevant</p>
                        </span>
                        <span className="flex items-center justify-center border border-slate-400 py-2 px-3 rounded-lg box-border">
                            <img
                                src={WindowIcon}
                                className="w-5 h-5 mr-2"
                                alt="Window"
                            />
                            <img
                                src={GridIcon}
                                className="bg-slate-200 rounded-lg w-6 h-6 p-[2px]"
                                alt="Grid"
                            />
                        </span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto max-w-screen-xl font-outfit">
                <div className="grid grid-cols-3 gap-6 mt-10">
                    <div
                        className="col-span-2 w-full h-[300px] bg-no-repeat bg-cover overflow-hidden rounded-sm bg-center"
                        style={{ backgroundImage: `url(${Rectangle6833})` }}
                    />
                    <div className="col-span-1">
                        <div
                            className="w-full h-[145px] bg-no-repeat bg-cover overflow-hidden rounded-sm bg-center mb-[10px]"
                            style={{ backgroundImage: `url(${Rectangle6833})` }}
                        />
                        <div
                            className="w-full h-[145px] bg-no-repeat bg-cover overflow-hidden rounded-sm bg-center"
                            style={{ backgroundImage: `url(${Rectangle6833})` }}
                        />
                    </div>
                </div>

                {/* Product Details Grid */}
                <div className="grid grid-cols-3 gap-6 font-outfit">
                    {/* Left Column - Product Info & Reviews */}
                    <div className="col-span-2 w-full mt-10">
                        <div className="flex justify-between">
                            <div className="flex">
                                <span className="relative">
                                    <img src={EllipseIcon} alt="Store" />
                                    <div className="w-5 h-5 bg-green-300 rounded-full absolute bottom-0 right-0" />
                                </span>
                                <span className="ml-4">
                                    <h1>The Aston Family</h1>
                                    <span className="flex mt-2">
                                        <p className="mr-4">5 Star hotel</p>
                                        <p>Malang East Java</p>
                                    </span>
                                </span>
                            </div>
                            <p>Rp 20.000</p>
                        </div>

                        <div className="mt-16">
                            <p>About this food</p>
                            <p className="mt-4 text-gray-500">
                                Immerse yourself in the vibrant medley of
                                flavors and textures with our exquisite
                                Vegetable Salad. Crafted with an assortment of
                                crisp, farm-fresh vegetables, each ingredient is
                                hand-selected to ensure optimal taste and
                                nutritional value. From crunchy cucumbers to
                                juicy tomatoes and vibrant bell peppers, every
                                bite is a symphony of freshness. Tossed with
                                signature dressing made from the finest herbs
                                and spices this salad offers a tantalizing burst
                                of flavor.
                            </p>

                            <p className="mt-16">Our Guarantee</p>
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

                        {/* Reviews Section */}
                        <div className="divide-y divide-solid divide-slate-200 border border-slate-200 rounded-lg p-4 mt-16">
                            <div>
                                <div className="flex justify-between items-center">
                                    <span>
                                        <p>Food Review</p>
                                        <p>
                                            Showing 1 - 4 Reviews From 4 Results
                                        </p>
                                    </span>
                                    <button className="px-5 py-4 border border-slate-200 rounded-lg">
                                        Latest
                                    </button>
                                </div>
                            </div>
                            {[1, 2, 3, 4].map((_, index) => (
                                <ReviewItem key={index} />
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Price Details */}
                    <div className="col-span-1 w-full mt-10">
                        <PriceDetail />
                        {/* Promo Banner */}
                        <div className="border border-slate-200 rounded-lg mt-6 h-fit text-center font-outfit font-semibold overflow-hidden">
                            <img src={PromoImage} alt="Promo" />
                        </div>
                    </div>
                </div>

                {/* Similar Products Section */}
                <section className="hero-7">
                    <div className="container max-w-screen-xl mx-auto font-outfit mt-16 mb-20">
                        <h1 className="text-xl font-semibold">
                            Similar Selection
                        </h1>
                        <div className="grid grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((_, index) => (
                                <ProductCard
                                    key={index}
                                    product={{
                                        image: DiscountImage,
                                        name: "Fresh Broccoli",
                                        store: "Hotel California",
                                        price: "7.000",
                                        oldPrice: "15.000",
                                        verified: true,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
