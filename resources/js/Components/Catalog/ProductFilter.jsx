import { useState } from "react";
import ReviewsStatusIcon from "../../../assets/Reviews + Status.svg";
import Logo from "../../../assets/logo.png";

const ProductFilter = () => {
    const [expandedSections, setExpandedSections] = useState({
        location: false,
        foodType: true,
        tenantType: true,
        price: true,
        rating: true,
    });

    const foodTypes = [
        { name: "Vegetables", count: 21 },
        { name: "Fruits", count: 53 },
        { name: "Cakes", count: 42 },
        { name: "Heavy Meals", count: 65 },
        { name: "Snacks", count: 32 },
    ];

    const tenantTypes = ["Hotel", "Resto", "Resort", "Others"];

    const ratings = [
        { stars: 5, count: 421 },
        { stars: 4, count: 321 },
        { stars: 3, count: 67 },
        { stars: 2, count: 32 },
        { stars: 1, count: 11 },
    ];

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="border border-slate-200 p-6 rounded-lg">
            {/* Header */}
            <div className="flex items-center space-x-3">
                <img src={Logo} className="w-6 h-6" alt="Logo" />
                <div>
                    <p className="text-secondary text-sm">Explore</p>
                    <p className="text-[#173302] font-semibold text-lg">
                        Product Filter
                    </p>
                </div>
            </div>

            {/* Food Type */}
            <div className="mt-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("foodType")}
                >
                    <p className="font-semibold text-[#173302]">Food Type</p>
                    <span
                        className={`transform transition-transform ${
                            expandedSections.foodType ? "rotate-180" : ""
                        }`}
                    >
                        ▼
                    </span>
                </div>
                {expandedSections.foodType && (
                    <div className="mt-4 space-y-4">
                        {foodTypes.map((food, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center"
                            >
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <span className="text-gray-700">
                                        {food.name}
                                    </span>
                                </label>
                                <span className="text-gray-500">
                                    {food.count}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Tenant Type */}
            <div className="mt-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("tenantType")}
                >
                    <p className="font-semibold text-[#173302]">Tenant Type</p>
                    <span
                        className={`transform transition-transform ${
                            expandedSections.tenantType ? "rotate-180" : ""
                        }`}
                    >
                        ▼
                    </span>
                </div>
                {expandedSections.tenantType && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {tenantTypes.map((type, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-lg py-2 px-4 text-center text-gray-700"
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Price */}
            <div className="mt-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("price")}
                >
                    <p className="font-semibold text-[#173302]">Price</p>
                    <span
                        className={`transform transition-transform ${
                            expandedSections.price ? "rotate-180" : ""
                        }`}
                    >
                        ▼
                    </span>
                </div>
                {expandedSections.price && (
                    <div className="mt-4">
                        <input
                            type="range"
                            className="w-full accent-[#173302]"
                            min="30000"
                            max="100000"
                        />
                        <div className="flex justify-between mt-2 text-sm">
                            <span>Rp30 rb</span>
                            <span>Rp100 rb</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Rating */}
            <div className="mt-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("rating")}
                >
                    <p className="font-semibold text-[#173302]">Rating</p>
                    <span
                        className={`transform transition-transform ${
                            expandedSections.rating ? "rotate-180" : ""
                        }`}
                    >
                        ▼
                    </span>
                </div>
                {expandedSections.rating && (
                    <div className="mt-4 space-y-4">
                        {ratings.map((rating, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center"
                            >
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300"
                                    />
                                    <div className="flex">
                                        {[...Array(rating.stars)].map(
                                            (_, i) => (
                                                <span
                                                    key={i}
                                                    className="text-yellow-400"
                                                >
                                                    ★
                                                </span>
                                            )
                                        )}
                                    </div>
                                </label>
                                <span className="text-gray-500">
                                    {rating.count}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilter;
