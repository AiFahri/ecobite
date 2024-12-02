import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import ReviewsStatusIcon from "../../../assets/Reviews + Status.svg";
import Logo from "../../../assets/logo.png";

const ProductFilter = ({
    productTypes = [],
    tenantTypes = [],
    starCount = [],
}) => {
    const [selectedTenantTypes, setSelectedTenantTypes] = useState([]);
    const [priceRange, setPriceRange] = useState({
        min_price: 30000,
        max_price: 100000,
    });
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);

    const [expandedSections, setExpandedSections] = useState({
        location: false,
        foodType: true,
        tenantType: true,
        price: true,
        rating: true,
    });

    const [priceInput, setPriceInput] = useState({
        min: "30000",
        max: "100000",
    });

    const handleTenantTypeClick = (type) => {
        setSelectedTenantTypes((prev) => {
            const newTypes = prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type];

            applyFilters({
                tenant_type: newTypes.join(","),
                rating: selectedRatings.length
                    ? selectedRatings.join(",")
                    : undefined,
                food_type: selectedFoodTypes.length
                    ? selectedFoodTypes.join(",")
                    : undefined,
                min_price: priceRange.min_price,
                max_price: priceRange.max_price,
            });
            return newTypes;
        });
    };

    const handlePriceChange = (e) => {
        const newMaxPrice = parseInt(e.target.value);
        setPriceRange((prev) => ({
            ...prev,
            max_price: newMaxPrice,
        }));
        setPriceInput((prev) => ({
            ...prev,
            max: newMaxPrice.toString(),
        }));

        applyFilters({
            min_price: priceRange.min_price,
            max_price: newMaxPrice,
            tenant_type: selectedTenantTypes.length
                ? selectedTenantTypes.join(",")
                : undefined,
            rating: selectedRatings.length
                ? selectedRatings.join(",")
                : undefined,
            food_type: selectedFoodTypes.length
                ? selectedFoodTypes.join(",")
                : undefined,
        });
    };

    const handlePriceInputChange = (type, value) => {
        const cleanValue = value.replace(/\D/g, "");

        setPriceInput((prev) => ({
            ...prev,
            [type]: cleanValue,
        }));
    };

    const handlePriceInputBlur = (type) => {
        let min = parseInt(priceInput.min) || 30000;
        let max = parseInt(priceInput.max) || 1000000;

        min = Math.max(30000, Math.min(min, 1000000));
        max = Math.max(30000, Math.min(max, 1000000));

        if (min > max) {
            if (type === "min") {
                min = max;
            } else {
                max = min;
            }
        }

        setPriceRange({
            min_price: min,
            max_price: max,
        });
        setPriceInput({
            min: min.toString(),
            max: max.toString(),
        });

        applyFilters({
            min_price: min,
            max_price: max,
            tenant_type: selectedTenantTypes.length
                ? selectedTenantTypes.join(",")
                : undefined,
            rating: selectedRatings.length
                ? selectedRatings.join(",")
                : undefined,
            food_type: selectedFoodTypes.length
                ? selectedFoodTypes.join(",")
                : undefined,
        });
    };

    const handleRatingChange = (rating) => {
        setSelectedRatings((prev) => {
            const newRatings = prev.includes(rating)
                ? prev.filter((r) => r !== rating)
                : [...prev, rating];

            applyFilters({
                rating: newRatings.join(","),
                tenant_type: selectedTenantTypes.length
                    ? selectedTenantTypes.join(",")
                    : undefined,
                food_type: selectedFoodTypes.length
                    ? selectedFoodTypes.join(",")
                    : undefined,
                min_price: priceRange.min_price,
                max_price: priceRange.max_price,
            });
            return newRatings;
        });
    };

    const handleFoodTypeClick = (type) => {
        setSelectedFoodTypes((prev) => {
            const newTypes = prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type];

            applyFilters({
                food_type: newTypes.join(","),
                tenant_type: selectedTenantTypes.length
                    ? selectedTenantTypes.join(",")
                    : undefined,
                rating: selectedRatings.length
                    ? selectedRatings.join(",")
                    : undefined,
                min_price: priceRange.min_price,
                max_price: priceRange.max_price,
            });
            return newTypes;
        });
    };

    const applyFilters = (newFilters) => {
        const currentParams = new URLSearchParams(window.location.search);
        const currentFilters = {};
        for (const [key, value] of currentParams.entries()) {
            currentFilters[key] = value;
        }

        const cleanFilters = {};
        Object.entries({ ...currentFilters, ...newFilters }).forEach(
            ([key, value]) => {
                if (
                    (key.includes("price") && value !== undefined) ||
                    (value && value.length > 0 && value !== "undefined")
                ) {
                    cleanFilters[key] = value;
                }
            }
        );

        router.get("/catalog", cleanFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

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
                        {productTypes.map((food, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center"
                            >
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300"
                                        checked={selectedFoodTypes.includes(
                                            food.name
                                        )}
                                        onChange={() =>
                                            handleFoodTypeClick(food.name)
                                        }
                                    />
                                    <span className="text-gray-700">
                                        {food.name}
                                    </span>
                                </label>
                                <span className="text-gray-500">
                                    {food.total}
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
                                className={`border rounded-lg py-2 px-4 text-center cursor-pointer
                                    ${
                                        selectedTenantTypes.includes(type)
                                            ? "bg-[#173302] text-white"
                                            : "border-gray-200 text-gray-700"
                                    }`}
                                onClick={() => handleTenantTypeClick(type)}
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
                        <div className="flex justify-between mb-2 text-sm">
                            <span>
                                Min: Rp
                                {(priceRange.min_price / 1000).toFixed(0)}rb
                            </span>
                            <span>
                                Max: Rp
                                {(priceRange.max_price / 1000).toFixed(0)}rb
                            </span>
                        </div>
                        <input
                            type="range"
                            className="w-full accent-[#173302]"
                            min="30000"
                            max="1000000"
                            step="10000"
                            value={priceRange.max_price}
                            onChange={handlePriceChange}
                        />
                        <div className="flex justify-between mt-4 gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">
                                    Minimum
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        Rp
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-lg py-2 px-8"
                                        value={priceInput.min}
                                        onChange={(e) =>
                                            handlePriceInputChange(
                                                "min",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() =>
                                            handlePriceInputBlur("min")
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">
                                    Maximum
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                        Rp
                                    </span>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-200 rounded-lg py-2 px-8"
                                        value={priceInput.max}
                                        onChange={(e) =>
                                            handlePriceInputChange(
                                                "max",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() =>
                                            handlePriceInputBlur("max")
                                        }
                                    />
                                </div>
                            </div>
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
                        {starCount.map((rating) => (
                            <div
                                key={rating.rating_group}
                                className="flex justify-between items-center"
                            >
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300"
                                        checked={selectedRatings.includes(
                                            rating.rating_group
                                        )}
                                        onChange={() =>
                                            handleRatingChange(
                                                rating.rating_group
                                            )
                                        }
                                    />
                                    <div className="flex">
                                        {[...Array(rating.rating_group)].map(
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
                                    {rating.total_products}
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
