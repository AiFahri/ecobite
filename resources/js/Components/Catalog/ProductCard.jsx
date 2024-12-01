import { Link } from "@inertiajs/react";
import React from "react";
import BookmarkIcon from "../../../assets/solar_bookmark-linear.svg";
import BookmarkFilledIcon from "../../../assets/solar_bookmark-bold.svg";
import StorefrontIcon from "../../../assets/storefront.svg";
import ShieldIcon from "../../../assets/iconamoon_shield-yes-fill.svg";
import { router } from "@inertiajs/react";

const ProductCard = ({ product, isWishlist = false, onToggleWishlist }) => {
    const formatPrice = (price) => {
        return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleBookmarkClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Bookmark clicked for product ID:", product.id);
        if (onToggleWishlist) {
            onToggleWishlist();
        }
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        router.post("/instant-buy", {
            product_id: product.id,
            quantity: 1, // Default quantity 1
        });
    };

    return (
        <div className="border border-slate-200 flex flex-col p-4 rounded-lg">
            <Link href={`/products/${product.id}`}>
                <span className="relative">
                    {product.oldPrice && (
                        <button className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white">
                            {Math.round(
                                ((product.oldPrice - product.price) /
                                    product.oldPrice) *
                                    100
                            )}
                            % Discount
                        </button>
                    )}
                    <img
                        src={product.image}
                        className="w-full aspect-square object-cover"
                        alt={product.name}
                    />
                </span>
                <span className="flex justify-between items-center mt-4">
                    <p className={`font-semibold text-xl text-primary`}>
                        {product.name}
                    </p>
                    <button
                        onClick={handleBookmarkClick}
                        className="focus:outline-none"
                    >
                        <img
                            src={isWishlist ? BookmarkFilledIcon : BookmarkIcon}
                            className="w-5 h-6"
                            alt="Bookmark"
                            style={{
                                filter: isWishlist
                                    ? "none"
                                    : "brightness(0) saturate(100%)",
                                fill: isWishlist ? "#173302" : "none",
                            }}
                        />
                    </button>
                </span>
                <span className="flex items-center mt-2">
                    <img
                        src={StorefrontIcon}
                        className="w-4 h-4 mr-2"
                        alt="Store"
                    />
                    <p className="text-sm text-secondary">{product.store}</p>
                    {product.verified && (
                        <img
                            src={ShieldIcon}
                            className="w-4 h-4 ml-2"
                            alt="Verified"
                        />
                    )}
                </span>
                {product.rating && (
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`text-2xl ${
                                    i < product.rating
                                        ? "text-orange-400"
                                        : "text-gray-300"
                                }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                )}
                <span className="flex items-center mb-2">
                    <span className="flex items-baseline">
                        <p className={`text-xs mr-2 text-primary`}>Rp</p>
                        <p className={`text-xl font-bold mr-3 text-primary`}>
                            {formatPrice(product.price)}
                        </p>
                    </span>
                    {product.oldPrice && (
                        <span className="relative">
                            <p className="text-md text-red-500">
                                Rp {formatPrice(product.oldPrice)}
                            </p>
                            <div className="absolute top-1/2 border border-black w-full"></div>
                        </span>
                    )}
                </span>
            </Link>
            <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full text-primary font-medium">
                Add To Cart
            </button>
        </div>
    );
};

export default ProductCard;
