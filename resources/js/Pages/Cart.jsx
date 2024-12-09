import { useState, useEffect } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Link } from "@inertiajs/react";
import SimilarSection from "@/Components/ProductDetail/SimilarSection";
import { usePage, router } from "@inertiajs/react";
import SearchBar from "@/Components/Catalog/SearchBar";

// Import gambar-gambar
import Logo from "../../assets/Logo.png";
import RefreshIcon from "../../assets/assets/refresh.svg";
import SearchIcon from "../../assets/assets/search.svg";
import DeleteIcon from "../../assets/assets/delete.svg";
import Rectangle6802 from "../../assets/Rectangle 6802.png";
import BookmarkIcon from "../../assets/solar_bookmark-linear.svg";
import BookmarkFilledIcon from "../../assets/solar_bookmark-bold.svg";
import StorefrontIcon from "../../assets/storefront.svg";
import ShieldIcon from "../../assets/iconamoon_shield-yes-fill.svg";
import ReviewsStatus from "../../assets/Reviews + Status.svg";
import Frame237995 from "../../assets/Frame 237995.png";
import Line20 from "../../assets/Line 20.png";
import Frame237996 from "../../assets/Frame 237996.png";

const Cart = () => {
    const { cartItems, auth, similar_products, flash } = usePage().props;
    console.log(similar_products);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [quantities, setQuantities] = useState(() => {
        const initialQuantities = {};
        cartItems.forEach((item) => {
            initialQuantities[item.id] = item.quantity || 1;
        });
        return initialQuantities;
    });
    const [stocks, setStocks] = useState(() => {
        const initialStocks = {};
        cartItems.forEach((item) => {
            initialStocks[item.id] = item.product.stock || 0;
        });
        return initialStocks;
    });
    const [wishlistStates, setWishlistStates] = useState(() => {
        const initialWishlistStates = {};
        cartItems.forEach((item) => {
            initialWishlistStates[item.product.id] =
                item.product.is_wishlisted || false;
        });
        return initialWishlistStates;
    });
    const [loadingWishlist, setLoadingWishlist] = useState({});
    const [filteredCartItems, setFilteredCartItems] = useState(cartItems);

    useEffect(() => {
        if (flash.error) {
            console.error(flash.error);
        }
        if (flash.success) {
            console.log(flash.success);
        }
    }, [flash]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const query = e.target.value.toLowerCase();
        const filtered = cartItems.filter(
            (item) =>
                item.product.name.toLowerCase().includes(query) ||
                item.product.product_type.name.toLowerCase().includes(query)
        );
        setFilteredCartItems(filtered);
    };
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    };

    const handleDeleteAll = () => {
        if (confirm("Are you sure you want to remove all items?")) {
            router.post("/cart/remove-all", {
                _method: "DELETE",
            });
        }
    };
    const handleAddToWishlist = (productId) => {
        if (loadingWishlist[productId]) return;

        setLoadingWishlist((prev) => ({
            ...prev,
            [productId]: true,
        }));

        try {
            router.post(
                "/wishlist/toggle",
                { product_id: productId },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setWishlistStates((prev) => ({
                            ...prev,
                            [productId]: !prev[productId],
                        }));
                    },
                    onError: (errors) => {
                        if (errors?.message === "Unauthenticated.") {
                            window.location.href = "/login";
                        }
                    },
                    onFinish: () => {
                        setLoadingWishlist((prev) => ({
                            ...prev,
                            [productId]: false,
                        }));
                    },
                }
            );
        } catch (error) {
            console.error("Error toggling wishlist:", error);
            setLoadingWishlist((prev) => ({
                ...prev,
                [productId]: false,
            }));
        }
    };
    const handleQuantityChange = (itemId, action) => {
        const item = cartItems.find((item) => item.id === itemId);
        const currentQuantity = quantities[itemId];
        const currentStock = stocks[itemId];

        let newQuantity;
        if (action === "increase" && currentQuantity < currentStock) {
            newQuantity = currentQuantity + 1;
        } else if (action === "decrease" && currentQuantity > 1) {
            newQuantity = currentQuantity - 1;
        } else {
            return;
        }

        // Update state lokal
        setQuantities((prev) => ({
            ...prev,
            [itemId]: newQuantity,
        }));

        // Update stock lokal
        const stockDiff = currentQuantity - newQuantity;
        setStocks((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + stockDiff,
        }));

        // Kirim request ke server
        router.post(
            `/cart/update/${itemId}`,
            {
                quantity: newQuantity,
                _method: "POST",
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    // State sudah diupdate di atas
                },
                onError: (errors) => {
                    // Kembalikan ke nilai sebelumnya jika ada error
                    setQuantities((prev) => ({
                        ...prev,
                        [itemId]: currentQuantity,
                    }));
                    setStocks((prev) => ({
                        ...prev,
                        [itemId]: currentStock,
                    }));
                    if (errors.message) {
                        // Gunakan flash message atau toast notification sebagai gantinya
                        console.error(errors.message);
                    }
                },
            }
        );
    };
    const handleRemoveItem = (itemId) => {
        if (confirm("Are you sure you want to remove this item?")) {
            router.post(`/cart/remove/${itemId}`, {
                _method: "DELETE",
            });
        }
    };
    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, itemId) => {
            const item = cartItems.find((cart) => cart.id === itemId);
            if (!item) return total;

            // Menggunakan quantities state untuk perhitungan
            const quantity = quantities[item.id] || item.quantity;
            const price = item.product.price;
            return total + price * quantity;
        }, 0);
    };

    const totalPrice = calculateTotalPrice();

    const handleCheckout = () => {
        // Filter hanya item yang diselect
        const selectedProducts = cartItems
            .filter((item) => selectedItems.includes(item.id))
            .map((item) => ({
                product_id: item.product.id,
                quantity: quantities[item.id],
            }));

        if (selectedProducts.length === 0) {
            alert("Please select items to checkout");
            return;
        }

        router.post("/instant-buy", {
            products: selectedProducts,
            // Kirim data tambahan jika diperlukan
            delivery_fee: 10000,
            promo_voucher: 10000,
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar auth={auth} />

            <div className="flex-1">
                <div className="flex flex-col space-y-4">
                    {/* Header */}
                    <div className="container max-w-screen-xl mx-auto font-outfit">
                        <div className="flex flex-col py-4 space-y-2">
                            <span className="text-gray-500 text-left">
                                Home / Cart
                            </span>
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-semibold mb-4">
                                    Cart
                                </h1>
                            </div>
                            <SearchBar
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search in your cart..."
                                className="w-full"
                                currentPath="/cart"
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="container max-w-screen-xl mx-auto font-outfit">
                        <div className="flex space-x-4">
                            {/* Product Summary */}
                            <div className="w-2/3 bg-white rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h2 className="text-xl font-semibold">
                                        Product Summary
                                    </h2>
                                    {cartItems.length > 0 && (
                                        <div className="flex items-center space-x-6">
                                            <button
                                                onClick={handleDeleteAll}
                                                className="flex items-center space-x-2 text-gray-600"
                                            >
                                                <span>Delete All</span>
                                                <img
                                                    src={DeleteIcon}
                                                    alt="delete"
                                                    className="w-5 h-5"
                                                />
                                            </button>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-600">
                                                    Choose All
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    className="w-5 h-5 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {filteredCartItems.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">
                                        <p className="text-lg mb-4">
                                            No items found
                                        </p>
                                        <p className="mb-6">
                                            Try searching with different
                                            keywords
                                        </p>
                                    </div>
                                ) : (
                                    <div className="divide-y">
                                        {filteredCartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-4 flex items-start"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(
                                                        item.id
                                                    )}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedItems([
                                                                ...selectedItems,
                                                                item.id,
                                                            ]);
                                                        } else {
                                                            setSelectedItems(
                                                                selectedItems.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        item.id
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="mt-2 w-5 h-5 border border-gray-300 rounded mr-4"
                                                />

                                                <div className="flex-1">
                                                    <div className="flex space-x-4">
                                                        <img
                                                            src={
                                                                item.product
                                                                    .product_media[0]
                                                                    .photo_url
                                                            }
                                                            alt={
                                                                item.product
                                                                    .name
                                                            }
                                                            className="w-20 h-20 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <span className="text-sm text-gray-500">
                                                                {
                                                                    item.product
                                                                        .product_type
                                                                        .name
                                                                }
                                                            </span>
                                                            <h3 className="text-lg font-medium mt-1">
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </h3>

                                                            <div className="flex items-center mt-3">
                                                                <div className="flex items-center border rounded-lg">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleQuantityChange(
                                                                                item.id,
                                                                                "decrease"
                                                                            )
                                                                        }
                                                                        className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-l-lg"
                                                                        disabled={
                                                                            quantities[
                                                                                item
                                                                                    .id
                                                                            ] <=
                                                                            1
                                                                        }
                                                                    >
                                                                        −
                                                                    </button>
                                                                    <span className="px-4 py-2">
                                                                        {
                                                                            quantities[
                                                                                item
                                                                                    .id
                                                                            ]
                                                                        }
                                                                    </span>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleQuantityChange(
                                                                                item.id,
                                                                                "increase"
                                                                            )
                                                                        }
                                                                        className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-r-lg"
                                                                        disabled={
                                                                            quantities[
                                                                                item
                                                                                    .id
                                                                            ] >=
                                                                            item
                                                                                .product
                                                                                .quantity
                                                                        }
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-2">
                                                                Stock Total:{" "}
                                                                <span className="font-semibold text-primary text-md">
                                                                    {stocks[
                                                                        item.id
                                                                    ] || 0}{" "}
                                                                    pcs
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end space-y-2">
                                                    <div className="text-right">
                                                        <span className="text-sm text-gray-500">
                                                            Total : x
                                                            {
                                                                quantities[
                                                                    item.id
                                                                ]
                                                            }
                                                        </span>
                                                        <p className="font-semibold">
                                                            Rp{" "}
                                                            {(
                                                                item.product
                                                                    .price *
                                                                quantities[
                                                                    item.id
                                                                ]
                                                            ).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                handleAddToWishlist(
                                                                    item.product
                                                                        .id
                                                                )
                                                            }
                                                            className="p-2 hover:bg-gray-100 rounded"
                                                            disabled={
                                                                loadingWishlist[
                                                                    item.product
                                                                        .id
                                                                ]
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    wishlistStates[
                                                                        item
                                                                            .product
                                                                            .id
                                                                    ]
                                                                        ? BookmarkFilledIcon
                                                                        : BookmarkIcon
                                                                }
                                                                alt="Save"
                                                                className="w-5 h-5"
                                                                style={{
                                                                    filter: wishlistStates[
                                                                        item
                                                                            .product
                                                                            .id
                                                                    ]
                                                                        ? "none"
                                                                        : "brightness(0) saturate(100%)",
                                                                    fill: wishlistStates[
                                                                        item
                                                                            .product
                                                                            .id
                                                                    ]
                                                                        ? "#173302"
                                                                        : "none",
                                                                    opacity:
                                                                        loadingWishlist[
                                                                            item
                                                                                .product
                                                                                .id
                                                                        ]
                                                                            ? 0.5
                                                                            : 1,
                                                                }}
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleRemoveItem(
                                                                    item.id
                                                                )
                                                            }
                                                            className="p-2 hover:bg-gray-100 rounded"
                                                        >
                                                            <img
                                                                src={DeleteIcon}
                                                                alt="Delete"
                                                                className="w-5 h-5"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Rincian Harga */}
                            <div className="w-1/3 self-start p-4 border border-gray-300 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">
                                    Rincian Harga
                                </h2>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Price Total</span>
                                        <span>
                                            Rp {totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery</span>
                                        <span>Rp 10.000</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Discount (Promo)</span>
                                        <span>- Rp 10.000</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>
                                                Rp{" "}
                                                {(
                                                    totalPrice +
                                                    10000 -
                                                    10000
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={selectedItems.length === 0}
                                    className={`w-full py-2 rounded-md ${
                                        selectedItems.length === 0
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-green-500 text-white"
                                    }`}
                                >
                                    Pesan Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <SimilarSection similarProducts={similar_products || []} />
            </div>

            <Footer />
        </div>
    );
};

export default Cart;
