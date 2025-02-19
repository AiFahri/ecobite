import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { usePage } from "@inertiajs/react";

// Import icon images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import homeIconUrl from "../../assets/assets/Home.png";
import motorIconUrl from "../../assets/assets/Bike.jpg";

// Mengatasi masalah icon default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const Map = () => {
    const { transaction, auth } = usePage().props;
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [route, setRoute] = useState([]);

    console.log(transaction);

    // Definisikan ikon khusus
    const homeIcon = L.icon({
        iconUrl: homeIconUrl,
        iconSize: [32, 32], // Ukuran ikon
        iconAnchor: [16, 32], // Titik jangkar ikon
        popupAnchor: [0, -32], // Posisi popup relatif terhadap ikon
    });

    const motorIcon = L.icon({
        iconUrl: motorIconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    // Set startPoint dan endPoint saat data transaction tersedia
    useEffect(() => {
        if (transaction) {
            const initialStart = [
                transaction.transaction_items[0].product.tenant.latitude,
                transaction.transaction_items[0].product.tenant.longitude,
            ];
            const initialEnd = [
                transaction.address.latitude,
                transaction.address.longitude,
            ];
            setStartPoint(initialStart);
            setEndPoint(initialEnd);
        }
    }, [transaction]);

    // Hitung rute sekali setelah startPoint dan endPoint ditentukan
    useEffect(() => {
        const fetchRoute = async () => {
            if (startPoint && endPoint) {
                try {
                    // Panggil endpoint routing sekali saja
                    const url = `https://router.project-osrm.org/route/v1/driving/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=full&geometries=geojson`;
                    const routeResponse = await axios.get(url);
                    const coordinates = routeResponse.data.routes[0]?.geometry?.coordinates || [];
                    setRoute(coordinates.map((coord) => [coord[1], coord[0]]));
                } catch (error) {
                    console.error("Error fetching route:", error);
                }
            }
        };

        fetchRoute();
    }, [startPoint, endPoint]);

    // Interval hanya untuk update posisi driver tanpa fetching rute ulang
    useEffect(() => {
        const updateDriverPosition = async () => {
            if (transaction) {
                try {
                    const response = await axios.get(`/map/${transaction.id}`);
                    const updatedTransaction = response.data;
                    const newStartPoint = [
                        updatedTransaction.latitude,
                        updatedTransaction.longitude,
                    ];
                    // Update hanya posisi startPoint (driver), jangan fetch route lagi
                    setStartPoint(newStartPoint);
                } catch (error) {
                    console.error("Error updating driver position:", error);
                }
            }
        };

        const interval = setInterval(updateDriverPosition, 5000);
        return () => clearInterval(interval);
    }, [transaction]);

    return (
        <>
            <Head title="Peta" />
            <Navbar auth={auth} />

            <div className="max-w-screen-xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Detail Driver
                </h1>
                <div className="flex items-center space-x-4">
                    <img
                        src={transaction.employee.photo_url}
                        alt={`Foto Profil ${transaction.employee.name}`}
                        className="w-16 h-16 rounded-full border border-gray-300"
                    />
                    <div>
                        <p className="text-gray-600 mb-2">
                            Nama: {transaction.employee.name}
                        </p>
                        <p className="text-gray-600 mb-2">
                            Plat Nomor: {transaction.employee.license_plate}
                        </p>
                    </div>
                </div>
            </div>

                <div className="border rounded-lg overflow-hidden shadow-lg">
                    <MapContainer
                        center={startPoint || [-7.2575, 112.7521]} // Default center Surabaya
                        zoom={13}
                        style={{ height: "600px", width: "100%" }}
                        className="z-0"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {startPoint && <Marker position={startPoint} icon={motorIcon} />}
                        {endPoint && <Marker position={endPoint} icon={homeIcon} />}
                        {route.length > 0 && <Polyline positions={route} color="blue" />}
                    </MapContainer>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Map;
