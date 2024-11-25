import React, { useState } from "react";
import DiscountIcon from "../../../assets/ic_outline-discount.png";
import ArrowDownIcon from "../../../assets/iconamoon_arrow-down-2-bold (1).svg";

const PriceDetail = () => {
    const [quantity, setQuantity] = useState(2);

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="divide-y divide-solid border border-slate-200 p-4 rounded-lg">
            <div>
                <p className="text-lg font-semibold tracking-wider">
                    Price Detail
                </p>
            </div>
            <div>
                <div className="mt-2">
                    <label htmlFor="quantity" className="font-medium">
                        Quantity
                    </label>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md overflow-hidden my-2">
                        <button
                            type="button"
                            onClick={handleDecrement}
                            className="px-3 py-2 text-xl font-medium"
                        >
                            −
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(parseInt(e.target.value))
                            }
                            min="1"
                            className="w-12 text-center border-0 focus:ring-0 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleIncrement}
                            className="px-3 py-2 text-xl font-medium"
                        >
                            +
                        </button>
                    </div>
                    <span className="text-gray-500">
                        Stock Total:{" "}
                        <span className="text-[#173302] font-semibold">
                            54 pcs
                        </span>
                    </span>
                </div>
                <p className="mb-2">Notes</p>
                <input
                    type="text"
                    className="border border-slate-200 w-full outline-none rounded-lg p-3 mb-4"
                    placeholder="Enter Your Notes Here..."
                />

                <div className="bg-gray-200 flex justify-between items-center p-3 rounded-lg">
                    <span className="flex items-center justify-center">
                        <img
                            src={DiscountIcon}
                            className="w-[20px] h-[20px]"
                            alt="Discount"
                        />
                        <p className="ml-2">Pick Your Promo</p>
                    </span>
                    <img src={ArrowDownIcon} alt="Arrow" />
                </div>
            </div>

            <div>
                <p className="mt-4">Total Detail</p>
                <div className="bg-slate-100 p-4 rounded-lg mt-2 mb-4">
                    <span className="flex justify-between">
                        <p className="text-gray-400">
                            Item Quantity ({quantity}pcs)
                        </p>
                        <p>Rp 40.000</p>
                    </span>
                    <span className="flex justify-between mt-4">
                        <p className="text-gray-400">Delivery (Estimation)</p>
                        <p>Rp 10.000</p>
                    </span>
                    <span className="flex justify-between mt-4">
                        <p className="text-gray-400">Promo Voucher</p>
                        <p>Rp 10.000</p>
                    </span>
                </div>
            </div>
            <div>
                <span className="flex justify-between mt-4">
                    <p>Total</p>
                    <span className="flex items-baseline">
                        <p className="text-sm mr-2 text-slate-400">Rp</p>
                        <p className="text-xl font-semibold">40.000</p>
                    </span>
                </span>
                <span className="mt-4 grid grid-cols-2 gap-6">
                    <a href="/pembayaran" className="col-span-1 block">
                        <button className="bg-[#A1E870] rounded-lg px-5 py-3 w-full">
                            Buy Now
                        </button>
                    </a>
                    <a href="/transaction" className="col-span-1 block">
                        <button className="border border-[#A1E870] rounded-lg px-5 py-3 w-full">
                            Add to Chart
                        </button>
                    </a>
                </span>
            </div>
        </div>
    );
};

export default PriceDetail;
