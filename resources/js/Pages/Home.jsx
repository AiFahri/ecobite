import React from "react";
import HomeBg from "../../assets/Home.png";

import Navbar from "../Components/Navbar";
import Hero from "../Components/Home/Hero";
import Hero2 from "../Components/Home/Hero2";
import Hero3 from "../Components/Home/Hero3";
import Hero4 from "../Components/Home/Hero4";
import Hero5 from "../Components/Home/Hero5";
import Footer from "../Components/Footer";
import ProductCard from "../Components/Home/ProductCard";
import Question from "../Components/Home/Question";
const Home = () => {
    return (
        <>
            <div className="overflow overflow-y-scroll no-scrollbar">
                <div
                    className="bg-cover"
                    style={{ backgroundImage: `url(${HomeBg})` }}
                >
                    <Navbar />
                    <Hero />
                </div>
                <Hero2 />
                <Hero3 />
                <Hero4 />
                <Hero5 />
                <ProductCard />
                <Question />
                <Footer />
            </div>
        </>
    );
};

export default Home;
