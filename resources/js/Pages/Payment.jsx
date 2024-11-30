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
import { usePage } from "@inertiajs/react";

const Payment = () => {
    const { product, quantity } = usePage().props;

    console.log("Payment Page Props:", usePage().props);

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

    const productData = product.data.product;
    const tenantData = product.data.tenant;

    const basePrice = productData.price * quantity;
    const deliveryFee = 10000;
    const promoVoucher = 10000;
    const totalPrice = basePrice + deliveryFee - promoVoucher;

    const [activeAccordion, setActiveAccordion] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [rememberDetails, setRememberDetails] = useState(false);

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(
            activeAccordion === accordionId ? null : accordionId
        );
    };

    const handlePaymentSelect = (method) => {
        setSelectedPayment(method);
    };

    return (
        <div className="overflow-y-scroll no-scrollbar">
            <Navbar />

            <section>
                <div className="max-w-screen-xl mx-auto font-outfit">
                    <span className="flex items-center text-gray-400 text-xs">
                        <p>Home /</p>
                        <p>Catalog /</p>
                        <p>Product Detail /</p>
                        <p className="text-[#173302]">Payment</p>
                    </span>
                    <h2 className="text-2xl my-6 text-[#173302] font-semibold">
                        {productData.name}
                    </h2>
                </div>
            </section>

            <div className="container max-w-screen-xl mx-auto font-outfit">
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <div className="border border-slate-200 rounded-lg p-4 mb-6">
                            <h1 className="font-semibold">Shipment Details</h1>
                            <div className="divide-y divide-gray-400">
                                <div>
                                    <span className="flex justify-between mt-4 mb-4">
                                        <span className="flex">
                                            <p className="text-gray-400 mr-4">
                                                Contact
                                            </p>
                                            <p>RayGanteng123@gmail.com</p>
                                        </span>
                                        <p>Change</p>
                                    </span>
                                </div>
                                <div>
                                    <span className="flex justify-between mt-4">
                                        <span className="flex">
                                            <p className="text-gray-400 mr-4">
                                                Address
                                            </p>
                                            <p>
                                                Jl. Yos Sudarso, Kec. Dringu,
                                                Probolinggo, Jawa
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
                                        src={productData.photo_urls[0]}
                                        alt={productData.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <span className="ml-2">
                                        <p className="text-xs text-gray-400">
                                            {tenantData?.name}
                                        </p>
                                        <p>{productData.name}</p>
                                    </span>
                                </span>
                                <span>
                                    <p className="text-xs text-gray-400 text-end">
                                        Total : x{quantity}
                                    </p>
                                    <p>Rp {basePrice.toLocaleString()}</p>
                                </span>
                            </div>
                        </div>

                        <div
                            id="accordion-collapse"
                            data-accordion="collapse"
                            className="mt-6"
                        >
                            <h2 id="accordion-collapse-heading-1">
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl gap-3"
                                    onClick={() =>
                                        toggleAccordion("credit-card")
                                    }
                                >
                                    <span className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded-lg mr-2"
                                            checked={
                                                selectedPayment ===
                                                "credit-card"
                                            }
                                            onChange={() =>
                                                handlePaymentSelect(
                                                    "credit-card"
                                                )
                                            }
                                        />
                                        <p className="mr-2 text-black">
                                            Credit Card
                                        </p>
                                        <img
                                            src={VisaImg}
                                            className="mr-2"
                                            alt="Visa"
                                        />
                                        <img
                                            src={MastercardImg}
                                            className="mr-2"
                                            alt="Mastercard"
                                        />
                                        <img
                                            src={AmexImg}
                                            className="mr-2"
                                            alt="Amex"
                                        />
                                        <img
                                            src={JcbImg}
                                            className="mr-2"
                                            alt="JCB"
                                        />
                                        <p className="text-sm text-gray-400">
                                            And More
                                        </p>
                                    </span>
                                    <svg
                                        className={`w-3 h-3 shrink-0 transition-transform ${
                                            activeAccordion === "credit-card"
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            {activeAccordion === "credit-card" && (
                                <div className="p-5 border border-b-0 border-gray-200">
                                    <div className="p-4 bg-gray-100 rounded-lg">
                                        <input
                                            className="w-full border border-slate-400 p-4 outline-none rounded-lg"
                                            placeholder="Card Number"
                                        />
                                        <input
                                            className="w-full border border-slate-400 p-4 outline-none rounded-lg mt-4"
                                            placeholder="Name on Card"
                                        />
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <input
                                                className="w-full border border-slate-400 p-4 outline-none rounded-lg"
                                                placeholder="Expiration date (MM / YY)"
                                            />
                                            <input
                                                className="w-full border border-slate-400 p-4 outline-none rounded-lg"
                                                placeholder="Security Code"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h2 id="accordion-collapse-heading-2">
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 gap-3"
                                    onClick={() => toggleAccordion("e-money")}
                                >
                                    <span className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded-lg mr-2"
                                            checked={
                                                selectedPayment === "e-money"
                                            }
                                            onChange={() =>
                                                handlePaymentSelect("e-money")
                                            }
                                        />
                                        <p className="mr-2 text-black">
                                            E-money
                                        </p>
                                        <img
                                            src={OvoImg}
                                            className="mr-2"
                                            alt="OVO"
                                        />
                                        <img
                                            src={DanaImg}
                                            className="mr-2"
                                            alt="DANA"
                                        />
                                        <img
                                            src={LinkajaImg}
                                            className="mr-2"
                                            alt="LinkAja"
                                        />
                                        <p className="text-sm text-gray-400">
                                            And More
                                        </p>
                                    </span>
                                    <svg
                                        className={`w-3 h-3 shrink-0 transition-transform ${
                                            activeAccordion === "e-money"
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            {activeAccordion === "e-money" && (
                                <div className="p-5 border border-b-0 border-gray-200">
                                    <input
                                        className="w-full border border-slate-400 p-4 outline-none rounded-lg"
                                        placeholder="Your Number"
                                    />
                                </div>
                            )}

                            <h2 id="accordion-collapse-heading-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 gap-3"
                                >
                                    <span className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded-lg mr-2"
                                            checked={
                                                selectedPayment ===
                                                "instant-shipment"
                                            }
                                            onChange={() =>
                                                handlePaymentSelect(
                                                    "instant-shipment"
                                                )
                                            }
                                        />
                                        <p className="text-black">
                                            Instan Shipment (Choosen Courier)
                                        </p>
                                    </span>
                                </button>
                            </h2>

                            {/* Remember Details Section */}
                            <div className="mt-6 border border-slate-200 p-4 rounded-lg mb-16">
                                <p>Remember Details</p>
                                <span className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        className="rounded-lg mr-4"
                                        checked={rememberDetails}
                                        onChange={(e) =>
                                            setRememberDetails(e.target.checked)
                                        }
                                    />
                                    <p>
                                        Save current information for future
                                        purchase
                                    </p>
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
                                        <p>Rp {basePrice.toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-400">
                                            Delivery (Estimation)
                                        </p>
                                        <p>Rp {deliveryFee.toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-gray-400">
                                            Promo Voucher
                                        </p>
                                        <p>
                                            Rp {promoVoucher.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4">
                                <div className="flex justify-between items-baseline">
                                    <p>Total</p>
                                    <p className="text-xl font-semibold">
                                        Rp {totalPrice.toLocaleString()}
                                    </p>
                                </div>
                                <button className="bg-[#A1E870] rounded-lg px-5 py-3 w-full mt-4">
                                    Proceed
                                </button>
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
