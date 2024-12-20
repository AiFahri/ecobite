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
    const { address, product, quantity, delivery_fee, promo_voucher, auth } = usePage().props;
    const [selectedAddress, setSelectedAddress] = useState({
        id: "test-address-id",
        address: "Jl. Yos Sudarso, Kec. Dringu, Probolinggo, Jawa",
    });

    useEffect(() => {
        // Load Midtrans script
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "YOUR_MIDTRANS_CLIENT_KEY");
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (flash?.success) {
            console.log("Snap Token:", flash.success);
        }
        if (flash?.error) {
            console.log("Payment Error Message:", flash.error);
        }
    }, [flash]);

    console.log(product);

    // Jika data belum ada, tampilkan loading
    if (!product || !quantity) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    const basePrice = product.price * quantity;
    const totalPrice = basePrice + delivery_fee - promo_voucher;

    const handleProceed = () => {
        if (!selectedAddress) {
            alert("Please select an address first");
            return;
        }

        router.post(
            "/payment",
            {
                product_id: product.id,
                quantity: quantity,
                address_id: address.id,
            },
            {
                onSuccess: (response) => {
                    console.log(response.props.flash);
                    const snapToken = response.props.flash.success;
                    window.snap.pay(snapToken, {
                        onSuccess: function (result) {
                            console.log("Payment success:", result);
                            // router.visit("/dashboard");
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
                },
                onError: (errors) => {
                    console.error("Payment error:", errors);
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar auth={auth} />

            <div className="flex-grow">
                <section>
                    <div className="max-w-screen-xl mx-auto font-outfit">
                        <span className="flex items-center text-gray-400 text-xs">
                            <p>Home /</p>
                            <p>Catalog /</p>
                            <p>Product Detail /</p>
                            <p className="text-[#173302]">Payment</p>
                        </span>
                        <h2 className="text-2xl my-6 text-[#173302] font-semibold">
                            {product.name}
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
                                <div className="flex justify-between items-center">
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
                                                {product.tenant?.name ||
                                                    "No Tenant Name"}
                                            </p>
                                            <p>{product.name}</p>
                                        </span>
                                    </span>
                                    <span>
                                        <p className="text-xs text-gray-400 text-end">
                                            Total : x{quantity}
                                        </p>
                                        <p>Rp {basePrice}</p>
                                    </span>
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
                                                Item Quantity ({quantity}pcs)
                                            </p>
                                            <p>Rp {basePrice}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-400">
                                                Delivery (Estimation)
                                            </p>
                                            <p>Rp {delivery_fee}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-400">
                                                Promo Voucher
                                            </p>
                                            <p>Rp {promo_voucher}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="flex justify-between items-baseline">
                                        <p>Total</p>
                                        <p className="text-xl font-semibold">
                                            Rp {totalPrice}
                                        </p>
                                    </div>
                                    <button
                                        className="bg-[#A1E870] rounded-lg px-5 py-3 w-full mt-4"
                                        onClick={handleProceed}
                                    >
                                        Proceed
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
