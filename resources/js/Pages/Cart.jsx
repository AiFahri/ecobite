import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { router } from "@inertiajs/react";
import SimilarSection from "@/Components/ProductDetail/SimilarSection";
import BookmarkIcon from "../../assets/solar_bookmark-linear.svg";
import BookmarkFilledIcon from "../../assets/solar_bookmark-bold.svg";

import DeleteIcon from "../../assets/assets/delete.svg";
import { Link } from "@inertiajs/react";
import RefreshIcon from "../../assets/material-symbols_refresh.svg";
import WindowIcon from "../../assets/material-symbols_window.svg";
import GridIcon from "../../assets/uis_window-grid.svg";
import ProductCard from "@/Components/Catalog/ProductCard";

const Cart = () => {
    const { cartItems, similar_products, auth } = usePage().props;
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [quantities, setQuantities] = useState(() => {
        // Initialize quantities dari cartItems
        const initialQuantities = {};
        cartItems.forEach((item) => {
            initialQuantities[item.id] = item.quantity;
        });
        return initialQuantities;
    });

    // Handle select all
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    };

    // Handle delete all
    const handleDeleteAll = () => {
        if (confirm("Are you sure you want to remove all items?")) {
            router.post("/cart/remove-all", {
                _method: "DELETE",
            });
        }
    };

    // Handle add to wishlist
    const handleAddToWishlist = (productId) => {
        router.post(
            "/wishlist/toggle",
            {
                product_id: productId,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    alert("Wishlist updated successfully!");
                },
                onError: (errors) => {
                    if (errors?.message === "Unauthenticated.") {
                        window.location.href = "/login";
                    }
                },
            }
        );
    };

    // Update fungsi handleQuantityChange
    const handleQuantityChange = (itemId, action) => {
        const item = cartItems.find((item) => item.id === itemId);
        const currentQuantity = quantities[itemId];
        const availableStock = item.product.quantity; // Menggunakan quantity sebagai stock

        if (action === "increase" && currentQuantity < availableStock) {
            const newQuantity = currentQuantity + 1;
            setQuantities((prev) => ({
                ...prev,
                [itemId]: newQuantity,
            }));

            router.post(
                `/cart/update/${itemId}`,
                {
                    quantity: newQuantity,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        } else if (action === "decrease" && currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setQuantities((prev) => ({
                ...prev,
                [itemId]: newQuantity,
            }));

            router.post(
                `/cart/update/${itemId}`,
                {
                    quantity: newQuantity,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                }
            );
        }
    };
    const calculateTotal = () => {
        return selectedItems.reduce((total, itemId) => {
            const item = cartItems.find((cart) => cart.id === itemId);
            return total + (item ? item.product.price * item.quantity : 0);
        }, 0);
    };

    // Handle remove item dengan konfirmasi
    const handleRemoveItem = (itemId) => {
        if (confirm("Are you sure you want to remove this item?")) {
            router.post(`/cart/remove/${itemId}`, {
                _method: "DELETE",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar auth={auth} />

            <div className="container max-w-screen-xl mx-auto font-outfit">
                <div className="flex flex-col py-4 space-y-2">
                    <span className="text-gray-500 text-left">Home / Cart</span>
                    <h1 className="text-2xl font-semibold">Cart</h1>
                </div>

                <div className="flex space-x-4">
                    {/* Product Summary */}
                    <div className="w-2/3 bg-white rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">
                                Product Summary
                            </h2>
                            {cartItems.length > 0 && (
                                <div className="flex items-center space-x-6">
                                    <button
                                        onClick={handleDeleteAll}
                                        className="flex items-center space-x-2 text-gray-600"
                                    >
                                        <span>Delete All</span>
                                        <img
                                            src={DeleteIcon}
                                            alt="delete"
                                            className="w-5 h-5"
                                        />
                                    </button>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">
                                            Choose All
                                        </span>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                            className="w-5 h-5 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p className="text-lg mb-4">
                                    Your cart is empty
                                </p>
                                <p className="mb-6">
                                    Add some products to your cart and they will
                                    appear here
                                </p>
                                <Link
                                    href="/catalog"
                                    className="inline-block bg-[#A1E870] text-[#173302] px-6 py-2 rounded-lg font-semibold"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-4 flex items-start"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(
                                                item.id
                                            )}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedItems([
                                                        ...selectedItems,
                                                        item.id,
                                                    ]);
                                                } else {
                                                    setSelectedItems(
                                                        selectedItems.filter(
                                                            (id) =>
                                                                id !== item.id
                                                        )
                                                    );
                                                }
                                            }}
                                            className="mt-2 w-5 h-5 border border-gray-300 rounded mr-4"
                                        />

                                        <div className="flex-1">
                                            <div className="flex space-x-4">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-sm text-gray-500">
                                                        {item.product.category}
                                                    </span>
                                                    <h3 className="text-lg font-medium mt-1">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-2">
                                                        Stock Total:{" "}
                                                        {item.product.stocks}{" "}
                                                        pcs
                                                    </p>
                                                    <div className="flex items-center mt-3">
                                                        <div className="flex items-center border rounded-lg">
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item.id,
                                                                        "decrease"
                                                                    )
                                                                }
                                                                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-l-lg"
                                                                disabled={
                                                                    quantities[
                                                                        item.id
                                                                    ] <= 1
                                                                }
                                                            >
                                                                −
                                                            </button>
                                                            <span className="px-4 py-2">
                                                                {
                                                                    quantities[
                                                                        item.id
                                                                    ]
                                                                }
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        item.id,
                                                                        "increase"
                                                                    )
                                                                }
                                                                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-r-lg"
                                                                disabled={
                                                                    quantities[
                                                                        item.id
                                                                    ] >=
                                                                    item.product
                                                                        .stocks
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className="ml-4 text-gray-500">
                                                            Stock Total:{" "}
                                                            {
                                                                item.product
                                                                    .stocks
                                                            }{" "}
                                                            pcs
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end space-y-2">
                                            <div className="text-right">
                                                <span className="text-sm text-gray-500">
                                                    Total : x{item.quantity}
                                                </span>
                                                <p className="font-semibold">
                                                    Rp{" "}
                                                    {(
                                                        item.product.price *
                                                        item.quantity
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleAddToWishlist(
                                                            item.product.id
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-100 rounded"
                                                >
                                                    <img
                                                        src={
                                                            item.product
                                                                .isWishlisted
                                                                ? BookmarkFilledIcon
                                                                : BookmarkIcon
                                                        }
                                                        alt="Save"
                                                        className="w-5 h-5"
                                                        style={{
                                                            filter: item.product
                                                                .isWishlisted
                                                                ? "none"
                                                                : "brightness(0) saturate(100%)",
                                                            fill: item.product
                                                                .isWishlisted
                                                                ? "#173302"
                                                                : "none",
                                                        }}
                                                    />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.id
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-100 rounded"
                                                >
                                                    <img
                                                        src={DeleteIcon}
                                                        alt="Delete"
                                                        className="w-5 h-5"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Rincian Harga */}
                    <div className="w-1/3 self-start p-4 border border-gray-300 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Rincian Harga
                        </h2>
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Price Total</span>
                                <span>
                                    Rp {calculateTotal().toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery</span>
                                <span>Rp 10.000</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Discount (Promo)</span>
                                <span>- Rp 10.000</span>
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>
                                        Rp{" "}
                                        {(
                                            calculateTotal() +
                                            10000 -
                                            10000
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Promo Banner */}
                        <div className="bg-[#173302] text-white rounded-lg p-4 mb-4 text-center">
                            <h3 className="font-semibold text-lg">
                                Enjoy Special Promo
                            </h3>
                            <p>For New User!</p>
                        </div>

                        <button
                            onClick={() => {
                                if (selectedItems.length === 0) {
                                    alert("Please select items to checkout");
                                    return;
                                }
                                router.post("/checkout", {
                                    items: selectedItems,
                                });
                            }}
                            className="w-full bg-[#A1E870] text-[#173302] font-semibold py-3 rounded-lg"
                            disabled={selectedItems.length === 0}
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                </div>
            </div>

            {/* Similar Section */}

            <SimilarSection similarProducts={similar_products || []} />
            <Footer />
        </div>
    );
};

export default Cart;
