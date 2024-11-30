import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

// Import gambar-gambar
import Logo from "../../assets/Logo.png";
import LogoSvg from "../../assets/Logo.svg";
import RefreshIcon from "../../assets/assets/refresh.svg";
import SearchIcon from "../../assets/assets/search.svg";
import DeleteIcon from "../../assets/assets/delete.svg";
import Rectangle6802 from "../../assets/Rectangle 6802.png";
import BookmarkIcon from "../../assets/solar_bookmark-linear.svg";
import StorefrontIcon from "../../assets/storefront.svg";
import ShieldIcon from "../../assets/iconamoon_shield-yes-fill.svg";
import ReviewsStatus from "../../assets/Reviews + Status.svg";
import Frame237995 from "../../assets/Frame 237995.png";
import Line20 from "../../assets/Line 20.png";
import Frame237996 from "../../assets/Frame 237996.png";

const Cart = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectAll, setSelectAll] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const similarProducts = [
        {
            id: 1,
            image: Rectangle6802,
            title: "Fresh Broccoli",
            price: "7.000",
            originalPrice: "15.000",
        },
    ];

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
                        <div className="w-full">
                            <div className="flex space-x-2">
                                <button
                                    id="refresh"
                                    className="p-2 border rounded-lg"
                                >
                                    <img src={RefreshIcon} alt="refresh" />
                                </button>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Cari sesuatu di sini ..."
                                    className="p-2 border rounded-lg w-full"
                                />
                                <button className="p-2 border rounded-lg">
                                    Relevant
                                </button>
                                <button className="p-2 border rounded-lg">
                                    <img src={SearchIcon} alt="search" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container max-w-screen-xl mx-auto font-outfit">
                    <div className="flex space-x-4">
                        {/* Product Summary */}
                        <div className="w-2/3 space-y-4">
                            <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg">
                                <h2 className="text-xl font-semibold">
                                    Product Summary
                                </h2>
                                <div className="flex space-x-2">
                                    <span>Delete All</span>
                                    <button>
                                        <img src={DeleteIcon} alt="delete" />
                                    </button>
                                    <span className="flex justify-center items-center space-x-2">
                                        <span>Choose All</span>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            className="w-[20px] h-[20px] border border-gray-300 p-1 rounded"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div id="productList">
                                {/* Product list akan ditambahkan di sini */}
                            </div>
                        </div>

                        {/* Rincian Harga */}
                        <div className="w-1/3 self-start p-4 border border-gray-300 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">
                                Rincian Harga
                            </h2>
                            <div className="flex justify-between mb-2">
                                <span>Price Total</span>
                                <span>Rp 0</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Delivery</span>
                                <span>Rp 0</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Discount (Promo)</span>
                                <span>Rp 0</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="font-semibold">Total</span>
                                <span>Rp 0</span>
                            </div>
                            <button className="w-full bg-green-500 text-white py-2 rounded-md">
                                Pesan Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Selection */}
            <div className="font-outfit max-w-screen-xl container mx-auto flex justify-between items-center mt-10">
                <p className="font-bold text-2xl text-[#173302]">
                    Similar Selection
                </p>
                <span className="flex space-x-3">
                    <img src={Frame237995} alt="Previous" />
                    <img src={Line20} alt="Separator" />
                    <img src={Frame237996} alt="Next" />
                </span>
            </div>

            {/* Similar Products Grid */}
            <section className="hero-7">
                <div className="container max-w-screen-xl mx-auto font-outfit">
                    <div className="grid grid-cols-4 gap-6">
                        {similarProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10"
                            >
                                <span className="relative">
                                    <button className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white">
                                        5% Discount
                                    </button>
                                    <img
                                        src={product.image}
                                        className="w-full"
                                        alt={product.title}
                                    />
                                </span>
                                <span className="flex justify-between items-center mt-4">
                                    <p className="font-semibold text-xl">
                                        {product.title}
                                    </p>
                                    <img
                                        src={BookmarkIcon}
                                        className="w-5 h-6"
                                        alt="Bookmark"
                                    />
                                </span>
                                <span className="flex items-center mt-2">
                                    <img
                                        src={StorefrontIcon}
                                        className="w-4 h-4 mr-2"
                                        alt="Store"
                                    />
                                    <p className="text-sm">Hotel California</p>
                                    <img
                                        src={ShieldIcon}
                                        className="w-4 h-4 ml-2"
                                        alt="Shield"
                                    />
                                </span>
                                <img
                                    src={ReviewsStatus}
                                    className="w-1/2 mt-2 mb-4"
                                    alt="Reviews"
                                />
                                <span className="flex items-center mb-2">
                                    <span className="flex items-baseline">
                                        <p className="text-xs mr-2">Rp</p>
                                        <p className="text-xl font-bold mr-3">
                                            {product.price}
                                        </p>
                                    </span>
                                    <span className="relative">
                                        <p className="text-md text-red-500">
                                            Rp {product.originalPrice}
                                        </p>
                                        <div className="absolute top-1/2 border border-black w-full"></div>
                                    </span>
                                </span>
                                <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                                    Add To Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Cart;
