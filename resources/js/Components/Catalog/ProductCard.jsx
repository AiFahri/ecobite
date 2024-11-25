import React from "react";
import BookmarkIcon from "../../../assets/solar_bookmark-linear.svg";
import StorefrontIcon from "../../../assets/storefront.svg";
import ShieldIcon from "../../../assets/iconamoon_shield-yes-fill.svg";
import ReviewsStatusIcon from "../../../assets/Reviews + Status.svg";

const ProductCard = ({ product }) => {
    return (
        <div className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10 h-fit">
            <a href="/productdetail">
                <span className="relative">
                    <button className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white">
                        5% Discount
                    </button>
                    <img
                        src={product.image}
                        className="w-full"
                        alt={product.name}
                    />
                </span>
                <span className="flex justify-between items-center mt-4">
                    <p className="font-semibold text-xl">{product.name}</p>
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
                    <p className="text-sm">{product.store}</p>
                    {product.verified && (
                        <img
                            src={ShieldIcon}
                            className="w-4 h-4 ml-2"
                            alt="Verified"
                        />
                    )}
                </span>
                <img
                    src={ReviewsStatusIcon}
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
                    {product.oldPrice && (
                        <span className="relative">
                            <p className="text-md text-red-500">
                                Rp {product.oldPrice}
                            </p>
                            <div className="absolute top-1/2 border border-black w-full"></div>
                        </span>
                    )}
                </span>
            </a>
            <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                <a href="/transaction" className="block w-full">
                    Add To Chart
                </a>
            </button>
        </div>
    );
};

export default ProductCard;
