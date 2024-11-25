import React from "react";
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

const Catalog = () => {
    const products = [
        {
            image: DiscountImage,
            name: "Fresh Broccoli",
            store: "Hotel California",
            price: "7.000",
            oldPrice: "15.000",
            verified: true,
        },
        {
            image: Rectangle6802_3,
            name: "Tenderloin Steak",
            store: "Rainbow Hotel",
            price: "35.000",
        },
        {
            image: Rectangle6802_4,
            name: "Breakfast Set",
            store: "SunMoon Resort",
            price: "23.000",
        },
        {
            image: Rectangle6802_5,
            name: "Smoked Salmon",
            store: "D'Kingdom",
            price: "33.000",
        },
        {
            image: Rectangle6802_6,
            name: "Vegetable Salad",
            store: "The Aston Family",
            price: "20.000",
            oldPrice: "25.000",
            verified: true,
        },
        {
            image: Rectangle6802_7,
            name: "Dimsum",
            store: "Koberium",
            price: "12.000",
        },
        {
            image: Rectangle6802_8,
            name: "Salad Set (Fruit)",
            store: "D'Cozy Living",
            price: "24.000",
        },
        {
            image: Rectangle6802_9,
            name: "Chicken Teriyaki",
            store: "D' Kingdom",
            price: "19.000",
        },
        {
            image: Frame1000007030,
            name: "Meatball Spaghetti",
            store: "Nirwana Suites",
            price: "15.000",
            oldPrice: "20.000",
            verified: true,
        },
        {
            image: Frame1000007030_1,
            name: "Cheesy Soup",
            store: "Pacific Resort",
            price: "40.000",
        },
        {
            image: Rectangle6802_1,
            name: "Mix Fruit",
            store: "King Palace",
            price: "20.000",
            oldPrice: "35.000",
            verified: true,
        },
        {
            image: Rectangle6802_2,
            name: "Spiced Rice",
            store: "Wilson Palace",
            price: "43.000",
        },
    ];

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
                        <div className="flex items-center">
                            <div className="py-[10px] px-3 inline-block border border-slate-400 rounded-lg mr-4">
                                <img src={RefreshIcon} alt="Refresh" />
                            </div>
                            <div className="flex border border-slate-400 w-full rounded-lg p-2 mr-12">
                                <input
                                    type="text"
                                    className="w-full outline-none"
                                />
                                <div className="flex">
                                    <div className="py-1 px-2 bg-[#F0F0F0] flex items-center justify-center rounded-lg mr-2">
                                        <img
                                            src={CommandIcon}
                                            className="w-3 h-3 flex items-center justify-center"
                                            alt="Command"
                                        />
                                    </div>
                                    <div className="py-1 px-2 bg-[#F0F0F0] flex items-center justify-center rounded-lg">
                                        <img
                                            src={KIcon}
                                            className="w-3 h-3 flex items-center justify-center"
                                            alt="K"
                                        />
                                    </div>
                                </div>
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
                <section className="hero-7">
                    <div className="container max-w-screen-xl mx-auto font-outfit">
                        <div className="grid grid-cols-4 gap-6 mb-20">
                            <div className="row-span-4">
                                <ProductFilter />
                                <div className="rounded-lg mt-6 h-fit text-center font-outfit font-semibold">
                                    <img
                                        src={PromoImage}
                                        className="w-full"
                                        alt="Promo"
                                    />
                                </div>
                            </div>
                            {products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                            <div className="col-span-3 col-start-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-slate-400">
                                        Showing{" "}
                                        <b className="text-black font-normal">
                                            1 - 18
                                        </b>{" "}
                                        Products From{" "}
                                        <b className="text-black font-normal">
                                            719{" "}
                                        </b>
                                        Results
                                    </p>
                                    <p></p>
                                    <span className="flex">
                                        <img
                                            src={ArrowDownIcon}
                                            className="mr-2"
                                            alt="Arrow Down"
                                        />
                                        <p className="p-2 bg-[#173302] text-white rounded-md w-10 h-10 text-center mr-10">
                                            1
                                        </p>
                                        <p className="p-2 border border-slate-200 rounded-md w-10 h-10 text-center mr-10">
                                            2
                                        </p>
                                        <p className="p-2 border border-slate-200 rounded-md w-10 h-10 text-center mr-10">
                                            3
                                        </p>
                                        <p className="p-2 border border-slate-200 rounded-md w-10 h-10 text-center">
                                            ...
                                        </p>
                                        <img
                                            src={ArrowDownIcon2}
                                            className="ml-2"
                                            alt="Arrow Down"
                                        />
                                    </span>
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
