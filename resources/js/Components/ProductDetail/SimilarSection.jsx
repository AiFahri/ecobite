import React from "react";
import Frame237995 from "../../../assets/Frame 237995.png";
import Frame237996 from "../../../assets/Frame 237996.png";
import Line20 from "../../../assets/Line 20.png";
import Rectangles from "../../../assets/Rectangle 6802.png";
import ProductCard from "@/Components/Catalog/ProductCard";
import { router } from "@inertiajs/react";

const dummyProducts = [
    {
        id: 1,
        name: "Fresh Broccoli",
        image: Rectangles,
        price: 7000,
        oldPrice: 15000,
        store: "Hotel California",
        rating: 5,
        verified: true,
    },
    {
        id: 2,
        name: "Tenderloin Steak",
        image: Rectangles,
        price: 35000,
        oldPrice: 45000,
        store: "Rainbow Hotel",
        rating: 4,
        verified: true,
    },
    {
        id: 3,
        name: "Breakfast Set",
        image: Rectangles,
        price: 23000,
        oldPrice: 30000,
        store: "SunMoon Resort",
        rating: 4,
        verified: true,
    },
    {
        id: 4,
        name: "Smoked Salmon",
        image: Rectangles,
        price: 33000,
        oldPrice: 40000,
        store: "D'Kingdom",
        rating: 5,
        verified: true,
    },
];

const SimilarSection = ({ similarProducts = [] }) => {
    const products =
        similarProducts.length > 0 ? similarProducts : dummyProducts;

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

    return (
        <div className="mb-20">
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

            <div className="container max-w-screen-xl mx-auto font-outfit mt-6">
                <div className="grid grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                id: product.id,
                                name: product.name,
                                image: product.image,
                                price: product.price,
                                oldPrice: product.oldPrice,
                                store: product.store,
                                rating: product.rating,
                                verified: product.verified,
                            }}
                            isWishlist={false}
                            onToggleWishlist={() =>
                                handleToggleWishlist(product.id)
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SimilarSection;
