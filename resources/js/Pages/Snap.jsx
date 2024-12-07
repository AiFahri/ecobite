import React, { useEffect } from "react";

export default function Snap({ snapToken }) {
    // Fungsi untuk memulai pembayaran
    const handlePayment = () => {
        if (!snapToken) {
            console.error("Snap token is missing!");
            return;
        }

        // Pastikan Midtrans Snap SDK telah dimuat
        if (window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: function (result) {
                    console.log("Payment success:", result);
                    alert("Payment successful!");
                    window.location.href = "/dashboard"; // Redirect setelah pembayaran berhasil
                },
                onPending: function (result) {
                    console.log("Payment pending:", result);
                    alert("Payment is pending. Please complete your payment.");
                },
                onError: function (result) {
                    console.error("Payment error:", result);
                    alert("An error occurred during payment. Please try again.");
                },
                onClose: function () {
                    console.log("Payment popup closed without completing payment.");
                    alert("Payment popup closed. Please complete the payment.");
                },
            });
        } else {
            console.error("Midtrans Snap is not loaded!");
        }
    };

    // Panggil handlePayment saat komponen dirender
    useEffect(() => {
        handlePayment();
    }, []); // [] memastikan hanya dijalankan sekali saat komponen pertama kali dirender

    return <div className="snap-payment"></div>;
}
