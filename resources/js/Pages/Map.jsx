import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useForm, Link, usePage } from "@inertiajs/react";

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

const Map = () => {
    const { transaction, auth } = usePage().props;
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [route, setRoute] = useState([]);

    console.log('aw');

    useEffect(() => {
        if (transaction) {
            setStartPoint([
                transaction.transaction_items[0].product.tenant.latitude,
                transaction.transaction_items[0].product.tenant.longitude,
            ]);
            setEndPoint([
                transaction.address.latitude,
                transaction.address.longitude,
            ]);
        }
    }, [transaction]);

    // Fetch route initially and set interval
    useEffect(() => {
        const fetchData = async () => {
            if (transaction) {
                try {
                    // Get updated transaction data
                    const response = await axios.get(`/map/${transaction.id}`);
                    const updatedTransaction = response.data;

                    console.log(updatedTransaction  );

                    const newStartPoint = [
                        updatedTransaction.latitude,
                        updatedTransaction.longitude,
                    ];
                    // const newEndPoint = [
                    //     updatedTransaction.address.latitude,
                    //     updatedTransaction.address.longitude,
                    // ];

                    // Update startPoint and endPoint
                    setStartPoint(newStartPoint);
                    // setEndPoint(newEndPoint);

                    // Fetch route using updated startPoint and endPoint
                    const url = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${newStartPoint[1]},${newStartPoint[0]};${endPoint[1]},${endPoint[0]}?overview=full&geometries=geojson`;
                    const routeResponse = await axios.get(url);
                    const coordinates = routeResponse.data.routes[0]?.geometry?.coordinates || [];
                    setRoute(coordinates.map((coord) => [coord[1], coord[0]]));
                    console.log('aw');
                } catch (error) {
                    console.error("Error updating route:", error);
                }
            }
        };

        // Fetch route immediately and set interval for polling
        fetchData();
        const interval = setInterval(fetchData, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [transaction]);

    return (
        <>
            <Head title="Peta" />
            <Navbar auth={auth} />

            <div className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                        Pencari Rute OpenStreetMap
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Peta ini akan memperbarui lokasi dan rute secara otomatis setiap 5 detik.
                    </p>
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
                        {startPoint && <Marker position={startPoint} />}
                        {endPoint && <Marker position={endPoint} />}
                        {route.length > 0 && <Polyline positions={route} color="blue" />}
                    </MapContainer>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Map;
