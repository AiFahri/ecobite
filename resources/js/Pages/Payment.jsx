import Logo from "../../assets/Logo.png";
import LogoSvg from "../../assets/Logo.svg";
import Rectangle46 from "../../assets/Rectangle 46.png";
import VisaImg from "../../assets/visa.png";
import MastercardImg from "../../assets/mastercard.svg";
import AmexImg from "../../assets/amex.svg";
import JcbImg from "../../assets/jcb.svg";
import OvoImg from "../../assets/OVO.svg";
import DanaImg from "../../assets/DANA.svg";
import LinkajaImg from "../../assets/linkaja.svg";
import PaymentFrame from "../../assets/Frame 1000007093 (3).png";
import Footer from "../Components/Footer";
import Navbar from "@/Components/Navbar";
import { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";

const Payment = () => {
    const { flash } = usePage().props;
    const { auth, products, address, total, delivery_fee, promo_voucher } =
        usePage().props;

    useEffect(() => {
        // Load Midtrans script
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_MIDTRANS_CLIENT_KEY
        );
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (flash?.success) {
            console.log("Snap Token:", flash.success);
            // Handle Midtrans snap
            window.snap.pay(flash.success, {
                onSuccess: function (result) {
                    /* ... */
                },
                onPending: function (result) {
                    /* ... */
                },
                onError: function (result) {
                    /* ... */
                },
                onClose: function () {
                    /* ... */
                },
            });
        }
    }, [flash]);

    const handleProceed = () => {
        if (!address) {
            alert("Please select an address first");
            return;
        }

        router.post(
            "/payment",
            {
                products: products.map((product) => ({
                    product_id: product.id,
                    quantity: product.quantity,
                })),
                address_id: address.id,
                delivery_fee,
                promo_voucher,
            },
            {
                onSuccess: (response) => {
                    if (response?.props?.flash?.success) {
                        window.snap.pay(response.props.flash.success, {
                            onSuccess: function (result) {
                                console.log("Payment success:", result);
                                router.visit("/transactions");
                            },
                            onPending: function (result) {
                                console.log("Payment pending:", result);
                            },
                            onError: function (result) {
                                console.error("Payment error:", result);
                            },
                            onClose: function () {
                                console.log(
                                    "Customer closed the popup without finishing the payment"
                                );
                            },
                        });
                    }
                },
                onError: (errors) => {
                    console.error("Payment error:", errors);
                    alert("Failed to process payment. Please try again.");
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar auth={auth} />

            <div className="flex-1">
                <section>
                    <div className="max-w-screen-xl mx-auto font-outfit">
                        <span className="flex items-center text-gray-400 text-xs">
                            <p>Home /</p>
                            <p>Cart /</p>
                            <p className="text-[#173302]">Payment</p>
                        </span>
                        <h2 className="text-2xl my-6 text-[#173302] font-semibold">
                            Payment Details
                        </h2>
                    </div>
                </section>

                <div className="container max-w-screen-xl mx-auto font-outfit mb-8">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                            <div className="border border-slate-200 rounded-lg p-4 mb-6">
                                <h1 className="font-semibold">
                                    Shipment Details
                                </h1>
                                <div className="divide-y divide-gray-400">
                                    <div>
                                        <span className="flex justify-between mt-4 mb-4">
                                            <span className="flex">
                                                <p className="text-gray-400 mr-4">
                                                    Contact
                                                </p>
                                                <p>{address.phone_number}</p>
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="flex justify-between mt-4">
                                            <span className="flex">
                                                <p className="text-gray-400 mr-4">
                                                    Address
                                                </p>
                                                <p>
                                                    {address.detailed_address},{" "}
                                                    {address.city},{" "}
                                                    {address.state}
                                                </p>
                                            </span>
                                            <p>Change</p>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-lg p-4">
                                <h1 className="mb-4">Product Summary</h1>
                                <div className="space-y-4">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex justify-between items-center"
                                        >
                                            <span className="flex items-center">
                                                <img
                                                    src={
                                                        product.product_media[0]
                                                            .photo_url
                                                    }
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <span className="ml-2">
                                                    <p className="text-xs text-gray-400">
                                                        {product.tenant?.name}
                                                    </p>
                                                    <p>{product.name}</p>
                                                </span>
                                            </span>
                                            <span>
                                                <p className="text-xs text-gray-400 text-end">
                                                    Total : x{product.quantity}
                                                </p>
                                                <p>
                                                    Rp{" "}
                                                    {(
                                                        product.price *
                                                        product.quantity
                                                    ).toLocaleString()}
                                                </p>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1">
                            <div className="divide-y divide-solid border border-slate-200 p-4">
                                <div>
                                    <p className="text-lg font-semibold tracking-wider">
                                        Price Detail
                                    </p>
                                </div>
                                <div className="py-4">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <p className="text-gray-400">
                                                Items Total
                                            </p>
                                            <p>Rp {total.toLocaleString()}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-400">
                                                Delivery (Estimation)
                                            </p>
                                            <p>
                                                Rp{" "}
                                                {delivery_fee.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-400">
                                                Promo Voucher
                                            </p>
                                            <p>
                                                - Rp{" "}
                                                {promo_voucher.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="flex justify-between items-baseline">
                                        <p>Total</p>
                                        <p className="text-xl font-semibold">
                                            Rp{" "}
                                            {(
                                                total +
                                                delivery_fee -
                                                promo_voucher
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleProceed}
                                        className="bg-[#A1E870] rounded-lg px-5 py-3 w-full mt-4 font-semibold text-[#173302]"
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Payment;
