import { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SearchBar from "@/Components/Catalog/SearchBar";
import TransactionFilter from "@/Components/Transaction/TransactionFilter";

const Transactions = () => {
    const { auth, transactions } = usePage().props; // Data dari server
    const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
    const [filteredTransactions, setFilteredTransactions] = useState(transactions.data || []); // State untuk data transaksi yang difilter

    // Handle input di search bar
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        handleFilter();
    };

    // Fungsi untuk mengirim query pencarian ke server
    const handleFilter = () => {
        if (searchQuery.trim() === "") {
            // Jika searchQuery kosong, hapus parameter search dari URL
            router.get(
                "/transactions", // Endpoint backend untuk transaksi
                {}, // Tidak mengirimkan parameter
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["transactions"], // Hanya mengambil data transaksi dari server
                    onSuccess: (page) => {
                        setFilteredTransactions(page.props.transactions.data || []); // Update state transaksi
                    },
                }
            );
        } else {
            // Jika searchQuery tidak kosong, kirim parameter search
            router.get(
                "/transactions", // Endpoint backend untuk transaksi
                { search: searchQuery }, // Query parameter untuk pencarian
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["transactions"], // Hanya mengambil data transaksi dari server
                    onSuccess: (page) => {
                        setFilteredTransactions(page.props.transactions.data || []); // Update state transaksi
                    },
                }
            );
        }
        console.log(searchQuery);
    };

    return (
        <div className="overflow-y-scroll no-scrollbar">
            <Navbar auth={auth} />

            <div className="container max-w-screen-xl mx-auto font-outfit mb-16">
                {/* Breadcrumb */}
                <section>
                    <div className="max-w-screen-xl mx-auto font-outfit">
                        <span className="flex">
                            <p>Home</p>
                            <p className="text-[#173302] mx-2">/</p>
                            <p className="text-[#173302]">Transactions</p>
                        </span>
                        <h2 className="text-2xl my-6 font-semibold text-[#173302]">
                            Transactions
                        </h2>
                        <SearchBar
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Find something here..."
                            className="w-full mr-12"
                            currentPath="/transactions"
                        />
                    </div>
                </section>

                {/* Main Content - Filter & Transactions */}
                <section className="mt-10">
                    <div className="flex gap-4">
                        {/* Left Sidebar - Filter */}
                        <div className="w-1/4">
                            <TransactionFilter />
                        </div>

                        {/* Right Content - Transactions */}
                        <div className="w-3/4">
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h2 className="text-xl font-semibold">
                                        Product Summary
                                    </h2>
                                </div>

                                <div className="divide-y">
                                    {filteredTransactions.map((transaction) => (
                                        <div key={transaction.id} className="p-4">
                                            {/* Tenant Info */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="font-medium">
                                                    {
                                                        transaction
                                                            .transaction_items[0]
                                                            .product.tenant.name
                                                    }
                                                </span>
                                                {transaction.transaction_items[0].product.tenant.is_verified && (
                                                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                                        Verified
                                                    </span>
                                                )}
                                                <span className="text-gray-500 text-sm">
                                                    {new Date(transaction.created_at).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "2-digit",
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                                <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full">
                                                    {transaction.status}
                                                </span>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex items-start">
                                                <div className="flex-1 flex">
                                                    <img
                                                        src={
                                                            transaction
                                                                .transaction_items[0]
                                                                .product
                                                                .product_media[0]
                                                                .photo_url
                                                        }
                                                        alt={
                                                            transaction
                                                                .transaction_items[0]
                                                                .product.name
                                                        }
                                                        className="w-20 h-20 object-cover rounded-lg mr-4"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <span className="text-sm text-gray-500">
                                                                    {
                                                                        transaction
                                                                            .transaction_items[0]
                                                                            .product
                                                                            .product_type
                                                                            .name
                                                                    }
                                                                </span>
                                                                <h3 className="text-lg font-medium">
                                                                    {
                                                                        transaction
                                                                            .transaction_items[0]
                                                                            .product
                                                                            .name
                                                                    }
                                                                </h3>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-sm text-gray-500">
                                                                    Total:
                                                                </p>
                                                                <p className="font-semibold">
                                                                    Rp{" "}
                                                                    {transaction.transaction_items[0].product.price.toLocaleString()}
                                                                </p>
                                                                <div className="flex gap-2 mt-2">
                                                                    <button className="text-gray-600 text-sm hover:text-gray-800">
                                                                        Detail
                                                                        Transaction
                                                                    </button>
                                                                    <button className="bg-[#A1E870] text-[#173302] px-4 py-1 rounded-lg text-sm">
                                                                        Repurchase
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        Total:
                                                        <p className="text-sm text-gray-600 mt-2">
                                                            {transaction.transaction_items?.[0]?.quantity}{" "}
                                                            items x Rp{" "}
                                                            {transaction.transaction_items?.[0]?.product?.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tambahkan pagination */}
                                {transactions.data?.length > 0 && (
                                    <div className="p-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <p className="text-slate-400">
                                                Showing{" "}
                                                <b className="text-black font-normal">
                                                    {transactions.from || 0} -{" "}
                                                    {transactions.to || 0}
                                                </b>{" "}
                                                Products From{" "}
                                                <b className="text-black font-normal">
                                                    {transactions.total || 0}
                                                </b>{" "}
                                                Results
                                            </p>

                                            <span className="flex">
                                                {transactions.links?.map(
                                                    (link, i) => (
                                                        <button
                                                            key={i}
                                                            className={`p-2 mx-1 ${
                                                                link.active
                                                                    ? "bg-[#173302] text-white"
                                                                    : "border border-slate-200"
                                                            } rounded-md w-10 h-10 text-center`}
                                                            onClick={() =>
                                                                link.url &&
                                                                router.get(
                                                                    link.url
                                                                )
                                                            }
                                                            dangerouslySetInnerHTML={{
                                                                __html: link.label,
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Transactions;
