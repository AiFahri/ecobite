import React, { useState } from "react";
import { router } from "@inertiajs/react";
import SearchBar from "@/Components/Catalog/SearchBar";
import Logoipsum1 from "../../../assets/logoipsum1.svg";
import Logoipsum2 from "../../../assets/logoipsum2.svg";
import Logoipsum3 from "../../../assets/logoipsum3.svg";
import Vector from "../../../assets/Vector.png";

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilter = () => {
        router.get("/catalog", {
            search: searchQuery,
        });
    };

    return (
        <section
            id="hero"
            className="h-[90vh] flex items-center justify-center font-outfit"
        >
            <div className="text-center">
                <h1 className="text-6xl text-[#173302] font-bold">
                    Buy Leftover <br />
                    Food Stock Safely🍕
                </h1>
                <p className="mt-8 font-outfit text-gray-400">
                    Looking for a way to save money and help the environment?
                    Buy surplus food! Surplus food is <br />
                    food that is perfectly good to eat but that would otherwise
                    be thrown away.
                </p>
                <p className="font-bold mt-8 text-[#173302]">
                    Trusted by Many Big Companies
                </p>
                <div className="flex items-center justify-center mt-8">
                    <span className="mr-2 flex items-center">
                        <img className="mr-2" src={Vector} />
                        <p>Logoipsum</p>
                    </span>
                    <span className="mr-2 flex items-center">
                        <img className="mr-2" src={Logoipsum1} />
                        <p>Logoipsum</p>
                    </span>
                    <span className="mr-2 flex items-center">
                        <img className="mr-2" src={Logoipsum2} />
                        <p>Logoipsum</p>
                    </span>
                    <span className="flex items-center">
                        <img className="mr-2" src={Logoipsum3} />
                        <p>Logoipsum</p>
                    </span>
                </div>

                <div className="mt-8">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearch}
                        onEnter={handleFilter}
                        placeholder="Find something here..."
                        currentPath="/catalog"
                        showIcons={false} // Tambahkan prop baru untuk mengontrol tampilan icon
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
