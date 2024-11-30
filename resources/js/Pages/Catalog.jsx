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

const Catalog = () => {
    const {
        products,
        productTypes,
        tenantTypes,
        starCount,
        filters = {},
    } = usePage().props;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedRating, setSelectedRating] = useState("");

    useEffect(() => {
        if (filters) {
            setSearchQuery(filters.search || "");
            setSelectedType(filters.type || "");
            setSelectedRating(filters.rating || "");
        }
    }, [filters]);

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
                                <div className="grid grid-cols-3 gap-6 mt-10">
                                    {products?.data?.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={{
                                                id: product.id,
                                                image:
                                                    product.product_media?.[0]
                                                        ?.url || DiscountImage,
                                                name: product.name,
                                                store:
                                                    product.tenant?.name ||
                                                    "Unknown Store",
                                                price: product.price,
                                                oldPrice:
                                                    product.original_price,
                                                verified:
                                                    product.tenant
                                                        ?.is_verified || false,
                                                rating: product.ratings_avg_star,
                                            }}
                                        />
                                    ))}
                                </div>

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
                                            {products?.links?.map((link, i) => (
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
                                            ))}
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
