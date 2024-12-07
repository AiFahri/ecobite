import ProductImg1 from "../../../assets/Rectangle 6802.png";
import BookmarkIcon from "../../../assets/solar_bookmark-linear.svg";
import StorefrontIcon from "../../../assets/storefront.svg";
import ShieldIcon from "../../../assets/iconamoon_shield-yes-fill.svg";
import ReviewStatus from "../../../assets/Reviews + Status.svg";

const ProductCard = () => {
    return (
        <section className="hero-7">
            <div className="container max-w-screen-xl mx-auto font-outfit">
                <div className="grid grid-cols-4 gap-6">
                    <div className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10">
                        <span className="relative">
                            <button className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white">
                                5% Discount
                            </button>
                            <img src={ProductImg1} className="w-full" />
                        </span>
                        <span className="flex justify-between items-center mt-4">
                            <p className="font-semibold text-xl">
                                Fresh Broccoli
                            </p>
                            <img src={BookmarkIcon} className="w-5 h-6" />
                        </span>
                        <span className="flex items-center mt-2">
                            <img
                                src={StorefrontIcon}
                                className="w-4 h-4 mr-2"
                            />
                            <p className="text-sm">Hotel California</p>
                            <img src={ShieldIcon} className="w-4 h-4 ml-2" />
                        </span>
                        <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
                        <span className="flex items-center mb-2">
                            <span className="flex items-baseline">
                                <p className="text-xs mr-2">Rp</p>
                                <p className="text-xl font-bold mr-3">7.000</p>
                            </span>

                            <span className="relative">
                                <p className="text-md text-red-500">
                                    Rp 15.000
                                </p>
                                <div className="absolute top-1/2 border border-black w-full"></div>
                            </span>
                        </span>
                        <a href="transaction.html">
                            <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                                Add To Cart
                            </button>
                        </a>
                    </div>
                    <div className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10">
                        <span className="relative">
                            <button className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white">
                                5% Discount
                            </button>
                            <img src={ProductImg1} className="w-full h-fit" />
                        </span>
                        <span className="flex justify-between items-center mt-4">
                            <p className="font-semibold text-xl">
                                Fresh Broccoli
                            </p>
                            <img src={BookmarkIcon} className="w-5 h-6" />
                        </span>
                        <span className="flex items-center mt-2">
                            <img
                                src={StorefrontIcon}
                                className="w-4 h-4 mr-2"
                            />
                            <p className="text-sm">Hotel California</p>
                            <img src={ShieldIcon} className="w-4 h-4 ml-2" />
                        </span>
                        <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
                        <span className="flex items-center mb-2">
                            <span className="flex items-baseline">
                                <p className="text-xs mr-2">Rp</p>
                                <p className="text-xl font-bold mr-3">7.000</p>
                            </span>

                            <span className="relative">
                                <p className="text-md text-red-500">
                                    Rp 15.000
                                </p>
                                <div className="absolute top-1/2 border border-black w-full"></div>
                            </span>
                        </span>
                        <a href="transaction.html">
                            <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                                Add To Cart
                            </button>
                        </a>
                    </div>
                    <div className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10">
                        <span className="relative">
                            <button className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white">
                                5% Discount
                            </button>
                            <img src={ProductImg1} className="w-full" />
                        </span>
                        <span className="flex justify-between items-center mt-4">
                            <p className="font-semibold text-xl">
                                Fresh Broccoli
                            </p>
                            <img src={BookmarkIcon} className="w-5 h-6" />
                        </span>
                        <span className="flex items-center mt-2">
                            <img
                                src={StorefrontIcon}
                                className="w-4 h-4 mr-2"
                            />
                            <p className="text-sm">Hotel California</p>
                            <img src={ShieldIcon} className="w-4 h-4 ml-2" />
                        </span>
                        <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
                        <span className="flex items-center mb-2">
                            <span className="flex items-baseline">
                                <p className="text-xs mr-2">Rp</p>
                                <p className="text-xl font-bold mr-3">7.000</p>
                            </span>

                            <span className="relative">
                                <p className="text-md text-red-500">
                                    Rp 15.000
                                </p>
                                <div className="absolute top-1/2 border border-black w-full"></div>
                            </span>
                        </span>
                        <a href="transaction.html">
                            <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                                Add To Cart
                            </button>
                        </a>
                    </div>
                    <div className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10">
                        <span className="relative">
                            <button className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white">
                                5% Discount
                            </button>
                            <img src={ProductImg1} className="w-full" />
                        </span>
                        <span className="flex justify-between items-center mt-4">
                            <p className="font-semibold text-xl">
                                Fresh Broccoli
                            </p>
                            <img src={BookmarkIcon} className="w-5 h-6" />
                        </span>
                        <span className="flex items-center mt-2">
                            <img
                                src={StorefrontIcon}
                                className="w-4 h-4 mr-2"
                            />
                            <p className="text-sm">Hotel California</p>
                            <img src={ShieldIcon} className="w-4 h-4 ml-2" />
                        </span>
                        <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
                        <span className="flex items-center mb-2">
                            <span className="flex items-baseline">
                                <p className="text-xs mr-2">Rp</p>
                                <p className="text-xl font-bold mr-3">7.000</p>
                            </span>

                            <span className="relative">
                                <p className="text-md text-red-500">
                                    Rp 15.000
                                </p>
                                <div className="absolute top-1/2 border border-black w-full"></div>
                            </span>
                        </span>
                        <a href="transaction.html">
                            <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                                Add To Cart
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCard;
