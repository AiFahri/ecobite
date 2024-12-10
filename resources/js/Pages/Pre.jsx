import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

// Import icon images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Mengatasi masalah icon default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Komponen untuk menangani klik pada peta
const MapClickHandler = ({ onClick }) => {
    useMapEvent("click", (e) => {
        onClick(e.latlng);
    });
    return null;
};

const Pre = () => {
    const [startPoint, setStartPoint] = useState(null);
    const [transactionId, setTransactionId] = useState(""); // Transaction ID input
    const [mapCenter, setMapCenter] = useState([-7.2575, 112.7521]); // Default Surabaya

    // Function to update the transaction on map click
    const handleMapClick = async (latlng) => {
        if (!transactionId) {
            alert("Please enter a transaction ID first!");
            return;
        }

        try {
            // Update location via API
            await axios.post(`/map/${transactionId}`, {
                latitude: latlng.lat,
                longitude: latlng.lng,
            });

            // Update startPoint for marker
            setStartPoint([latlng.lat, latlng.lng]);
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    return (
        <>
            <Head title="Peta" />
            <Navbar />

            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                        Peta dengan Update Lokasi
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Klik pada peta untuk memperbarui lokasi. Masukkan ID
                        transaksi terlebih dahulu.
                    </p>

                    {/* Input Transaction ID */}
                    <div className="mb-4">
                        <label htmlFor="transaction-id" className="block text-gray-700">
                            Transaction ID:
                        </label>
                        <input
                            type="text"
                            id="transaction-id"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Masukkan ID transaksi"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                {/* Map */}
                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <MapContainer
                        center={mapCenter}
                        zoom={13}
                        style={{ height: "600px", width: "100%" }}
                        className="z-0"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapClickHandler onClick={handleMapClick} />
                        {startPoint && <Marker position={startPoint} />}
                    </MapContainer>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Pre;
