import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Polyline,
    useMapEvent,
} from "react-leaflet";
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
        onClick(e);
    });
    return null;
};

const Map = () => {
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [route, setRoute] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        if (!startPoint) {
            setStartPoint([lat, lng]);
            alert(`Titik Awal: [${lat}, ${lng}]`);
        } else if (!endPoint) {
            setEndPoint([lat, lng]);
            alert(`Titik Akhir: [${lat}, ${lng}]`);
        }
    };

    const fetchRoute = async () => {
        if (startPoint && endPoint) {
            try {
                const url = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=full&geometries=geojson`;
                const response = await axios.get(url);
                const coordinates =
                    response.data.routes[0].geometry.coordinates;
                setRoute(coordinates.map((coord) => [coord[1], coord[0]]));
            } catch (error) {
                console.error("Error fetching route:", error);
                alert("Gagal mengambil rute. Silakan coba lagi.");
            }
        } else {
            alert("Tentukan titik awal dan akhir terlebih dahulu!");
        }
    };

    const resetPoints = () => {
        setStartPoint(null);
        setEndPoint(null);
        setRoute([]);
    };

    const searchPlaces = async () => {
        if (!searchQuery) return;

        try {
            console.log("Mencari:", searchQuery); // Debug input

            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search`,
                {
                    params: {
                        q: searchQuery,
                        format: "json",
                        limit: 5,
                        countrycodes: "id",
                        // Tambahkan headers untuk mengikuti kebijakan Nominatim
                        headers: {
                            "User-Agent": "EcoBite App",
                        },
                    },
                }
            );
            console.log("Response dari API:", response.data); // Debug response

            if (response.data.length === 0) {
                alert("Tidak ada hasil ditemukan");
                return;
            }

            setSearchResults(response.data);
        } catch (error) {
            console.error("Error lengkap:", error.response || error); // Debug error
            alert("Gagal mencari lokasi. Silakan coba lagi.");
        }
    };

    const handlePlaceSelect = (place) => {
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        if (!startPoint) {
            setStartPoint([lat, lon]);
        } else if (!endPoint) {
            setEndPoint([lat, lon]);
        }
        setSearchResults([]);
        setSearchQuery("");
    };

    // Tambahkan useEffect untuk memonitor searchResults
    useEffect(() => {
        console.log("Search Results Updated:", searchResults);
    }, [searchResults]);

    return (
        <>
            <Head title="Peta" />
            <Navbar />

            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                        Pencari Rute OpenStreetMap
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Klik pada peta untuk menentukan titik awal dan akhir
                        rute Anda.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchRoute}
                            disabled={!startPoint || !endPoint}
                            className={`px-4 py-2 rounded-lg ${
                                !startPoint || !endPoint
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                        >
                            Dapatkan Rute
                        </button>
                        <button
                            onClick={resetPoints}
                            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <div className="mb-4 relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari lokasi..."
                            className="w-full px-4 py-2 border rounded-lg"
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    searchPlaces();
                                }
                            }}
                        />
                        <button
                            onClick={searchPlaces}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white rounded-lg"
                        >
                            Cari
                        </button>
                    </div>

                    {searchResults.length > 0 && (
                        <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {searchResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handlePlaceSelect(result)}
                                >
                                    <p className="font-medium">
                                        {result.display_name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {result.type}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <MapContainer
                        center={[-7.9666, 112.6326]} // Koordinat Malang
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
                        {endPoint && <Marker position={endPoint} />}
                        {route.length > 0 && (
                            <Polyline positions={route} color="blue" />
                        )}
                    </MapContainer>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Map;
