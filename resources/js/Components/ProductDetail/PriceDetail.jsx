import React, { useState } from "react";
import { router } from "@inertiajs/react";

const PriceDetail = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [availableStock, setAvailableStock] = useState(product.stocks);

    const handleQuantityChange = (action) => {
        if (action === "increase" && quantity < product.stocks) {
            setQuantity((prev) => prev + 1);
        } else if (action === "decrease" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const basePrice = product.price * quantity;
    const deliveryFee = 10000;
    const promoVoucher = 10000;
    const totalPrice = basePrice + deliveryFee - promoVoucher;

    const handleBuyNow = () => {
        router.post("/instant-buy", {
            product_id: product.id,
            quantity: quantity,
        });
    };

    const handleAddToCart = () => {
        router.visit(`/cart?product_id=${product.id}&quantity=${quantity}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="border border-slate-200 rounded-lg p-6 space-y-6">
            <div className="pb-4 border-b">
                <h2 className="font-semibold text-lg">Price Detail</h2>
            </div>

            {/* Quantity Section */}
            <div>
                <p className="mb-3">Quantity</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-lg">
                        <button
                            onClick={() => handleQuantityChange("decrease")}
                            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-l-lg"
                            disabled={quantity <= 1}
                        >
                            −
                        </button>
                        <span className="px-4 py-2">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange("increase")}
                            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-r-lg"
                            disabled={quantity >= product.stocks}
                        >
                            +
                        </button>
                    </div>
                    <span className="text-gray-500">
                        Stock Total:{" "}
                        <span className="font-medium text-black">
                            {product.stocks} pcs
                        </span>
                    </span>
                </div>
            </div>

            {/* Promo Section */}
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.55 2.22 12.05 2.59 12.42L11.59 21.42C11.95 21.78 12.45 22 13 22C13.55 22 14.05 21.78 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.45 21.77 11.94 21.41 11.58ZM13 20.01L4 11V4H11V3.99L20 12.99L13 20.01Z"
                            fill="currentColor"
                        />
                        <path
                            d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span>Pick Your Promo</span>
                </div>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"
                        fill="currentColor"
                    />
                </svg>
            </button>

            {/* Total Detail */}
            <div className="space-y-3">
                <h3 className="font-semibold">Total Detail</h3>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            Item Quantity ({quantity}pcs)
                        </span>
                        <span>Rp {basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            Delivery (Estimation)
                        </span>
                        <span>Rp {deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Promo Voucher</span>
                        <span>Rp {promoVoucher.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                        {product.oldPrice && (
                            <span className="text-red-500 line-through block text-sm">
                                Rp {product.oldPrice.toLocaleString()}
                            </span>
                        )}
                        <span className="font-semibold text-lg">
                            Rp {totalPrice.toLocaleString()}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-[#A1E870] rounded-lg font-semibold"
                    disabled={quantity < 1 || product.stocks === 0}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default PriceDetail;
