import React from 'react';
import HomeBg from '../../assets/Home.png';
import Logo from '../../assets/Logo.png';
import Vector from '../../assets/Vector.png';
import Logoipsum1 from '../../assets/logoipsum1.svg';
import Logoipsum2 from '../../assets/logoipsum2.svg';
import Logoipsum3 from '../../assets/logoipsum3.svg';
import SearchIcon from '../../assets/Search.svg';
import CommandIcon from '../../assets/ph_command-bold.svg';
import KIcon from '../../assets/K.svg';
import StarIcon from '../../assets/mdi_star-four-points.svg';
import VegetableImg from '../../assets/650d19e70f0c2cb32192512b54d97fb5.png';
import CakeImg from '../../assets/72d21517ec0797290d10e2992557d744.png';
import MealImg from '../../assets/da64e6b9a588ca133da333afad9156c4.png';
import SnackImg from '../../assets/9792320a717f83d711328f428d978534.png';
import WhyUsImg from '../../assets/Frame 1000007093.png';
import CheckIcon from '../../assets/Vector (6).png';
import ProductImg1 from '../../assets/Rectangle 6802.png';
import BookmarkIcon from '../../assets/solar_bookmark-linear.svg';
import StorefrontIcon from '../../assets/storefront.svg';
import ShieldIcon from '../../assets/iconamoon_shield-yes-fill.svg';
import ReviewStatus from '../../assets/Reviews + Status.svg';
import QuestionBg from '../../assets/Frame 1000007112.png';
import AvatarGroup from '../../assets/Avatar group.png';
import LogoFooter from '../../assets/Logo.svg';

const Home = () => {
    return (
        <>
    <div className='overflow overflow-y-scroll no-scrollbar'>
    <div className="bg-cover" style={{backgroundImage: `url(${HomeBg})`}}>
      <section id="navbar" className="h-[10vh] py-2 font-outfit">
        <div className="container max-w-screen-xl mx-auto">
          <div className="flex justify-between">
            <span className="flex items-center"
              ><img src={Logo} className="mr-2" />
              <p>EcoBite</p></span
            >
            <ul className="flex items-center">
              <li
                className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2"
              >
                <a href="#">Home</a>
              </li>
              <li
                className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2"
              >
                <a href="/catalog">Catalog</a>
              </li>
              <li
                className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2"
              >
                <a href="/whislist">Whislist</a>
              </li>
              <li
                className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2"
              >
                <a href="/transaction">Transaction</a>
              </li>
            </ul>
            <a href="/login"
              ><button className="px-4 py-2 bg-[#A1E870] rounded-md">
                Sign In
              </button></a
            >
          </div>
        </div>
      </section>
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
            Looking for a way to save money and help the environment? Buy
            surplus food! Surplus food is <br />
            food that is perfectly good to eat but that would otherwise be
            thrown away.
          </p>
          <p className="font-bold mt-8 text-[#173302]">
            Trusted by Many Big Companies
          </p>
          <div className="flex items-center justify-center mt-8">
            <span className="mr-2 flex items-center"
              ><img className="mr-2" src={Vector} />
              <p>Logoipsum</p></span
            >
            <span className="mr-2 flex items-center"
              ><img className="mr-2" src={Logoipsum1} />
              <p>Logoipsum</p></span
            >
            <span className="mr-2 flex items-center"
              ><img className="mr-2" src={Logoipsum2} />
              <p>Logoipsum</p></span
            >
            <span className="flex items-center"
              ><img className="mr-2" src={Logoipsum3} />
              <p>Logoipsum</p></span
            >
          </div>
          <div
            className="mt-8 border border-slate-500 rounded-md w-full overflow-hidden"
          >
            <div className="flex items-center justify-between py-2 px-4">
              <div className="flex items-center w-full">
                <img src={SearchIcon} className="w-5 h-5" />
                <input
                  type="text"
                  className="py-3 px-2 outline-none w-full"
                  placeholder="Find something here..."
                />
              </div>
              <div className="flex">
                <div
                  className="py-2 px-3 bg-[#F0F0F0] flex items-center justify-center rounded-lg mr-2"
                >
                  <img
                    src={CommandIcon}
                    className="w-4 h-4 flex items-center justify-center"
                  />
                </div>
                <div
                  className="py-2 px-3 bg-[#F0F0F0] flex items-center justify-center rounded-lg"
                >
                  <img
                    src={KIcon}
                    className="w-4 h-4 flex items-center justify-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </div>

    <section id="hero2">
      <div
        className="flex items-center justify-around py-3 bg-[#173302] text-white font-outfit"
      >
        <span className="flex justify-center items-center">
          <img src={StarIcon} className="mr-2" />
          <p>Food Savings</p>
        </span>
        <span className="flex justify-center items-center">
          <img src={StarIcon} className="mr-2" />
          <p>Reprocessed</p>
        </span>
        <span className="flex justify-center items-center">
          <img src={StarIcon} className="mr-2" />
          <p>Waste Reduction</p>
        </span>
        <span className="flex justify-center items-center">
          <img src={StarIcon} className="mr-2" />
          <p>Food Savings</p>
        </span>
        <span className="flex justify-center items-center">
          <img src={StarIcon} className="mr-2" />
          <p>Reprocessed</p>
        </span>
        <span className="flex justify-center items-center">
          <img src={StarIcon} />
          <p>Waste Reduction</p>
        </span>
      </div>
    </section>

    <section className="Hero3">
      <div className="mt-20 max-w-screen-xl mx-auto font-outfit">
        <div>
          <h1 className="text-4xl font-semibold">What Do We Provide</h1>
          <h1 className="text-4xl font-semibold mt-4">
            for Our Loyal
            <span className="bg-[#A1E870] p-1 rounded-xl">Customer?</span>
          </h1>
          <p className="mt-8 text-slate-500 text-sm">
            Delve into the abundant surplus of benefits we bring, tailored
            precisely to <br />
            your distinct preferences and needs.
          </p>
        </div>
      </div>
    </section>
    <section className="hero-4">
      <div
        className="container mt-20 grid grid-cols-2 gap-10 max-w-screen-xl mx-auto font-outfit"
      >
        <div className="border border-slate-400 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Leftover Stock of Fresh Vegetables & Fruits
          </h2>
          <p>
            Discover our surplus of farm-fresh vegetables, ready to elevate your
            culinary creations with freshness and flavor.
          </p>
          <div
            className="w-full h-72 border border-slate-400 flex items-center justify-center mt-2 rounded-xl bg-slate-50"
          >
            <img
              src={VegetableImg}
              className="w-fit h-[200px] drop-shadow-2xl"
            />
          </div>
        </div>
        <div className="border border-slate-400 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Remaining Supply of Freshly Baked Cakes
          </h2>
          <p>
            Indulge in our surplus of freshly baked cakes, offering delectable
            delights for every occasion.
          </p>
          <div
            className="w-full h-72 border border-slate-400 flex items-center justify-center mt-2 rounded-xl bg-slate-50"
          >
            <img
              src={CakeImg}
              className="w-fit h-[200px] drop-shadow-2xl"
            />
          </div>
        </div>
        <div className="border border-slate-400 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Excess Stock of Freshly Prepared Hearty Meals
          </h2>
          <p>
            Savor our surplus of freshly prepared hearty meals, crafted to
            satisfy your cravings with wholesome goodness.
          </p>
          <div
            className="w-full h-72 border border-slate-400 flex items-center justify-center mt-2 rounded-xl bg-slate-50"
          >
            <img
              src={MealImg}
              className="max-w-fit h-[200px] drop-shadow-2xl"
            />
          </div>
        </div>
        <div className="border border-slate-400 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            Excess Supply of Freshly Prepared Snack Items
          </h2>
          <p>
            Delight in our surplus of freshly prepared snack items, offering
            flavorful bites for any craving.
          </p>
          <div
            className="w-full h-72 border border-slate-400 flex items-center justify-center mt-2 rounded-xl bg-slate-50"
          >
            <img
              src={SnackImg}
              className="w-fit h-[200px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

    <div className="bg-[#F4FBF3] min-w-full mt-20 py-20">
      <section className="hero-5">
        <div className="container max-w-screen-xl mx-auto font-outfit">
          <div className="grid grid-cols-2 gap-10">
            <div
              className="w-full h-full bg-cover bg-no-repeat bg-center rounded-xl"
              style={{backgroundImage: `url(${WhyUsImg})`}}
            ></div>
            <div>
              <span className="py-2 px-2 rounded-full bg-[#A1E870] font-semibold">
                Why Choose Us?
              </span>
              <h1 className="text-4xl font-semibold mt-6 text-[#173302]">
                Why Choose Us
                <br />
                As Your Best Partner?
              </h1>
              <div className="flex mt-6 items-start">
                <img src={CheckIcon} className="w-5 h-5 mr-3" />
                <span>
                  <p className="text-[#173302] font-semibold">
                    More affordable prices
                  </p>
                  <p className="text-[#8E8E8E]">
                    Access top-quality services at unbeatable affordable rates,
                    ensuring unbeatable value without compromise.
                  </p>
                </span>
              </div>
              <div className="flex mt-6 items-start">
                <img src={CheckIcon} className="w-5 h-5 mr-3" />
                <span>
                  <p className="text-[#173302] font-semibold">
                    More affordable prices
                  </p>
                  <p className="text-[#8E8E8E]">
                    Access top-quality services at unbeatable affordable rates,
                    ensuring unbeatable value without compromise.
                  </p>
                </span>
              </div>
              <div className="flex mt-6 items-start">
                <img src={CheckIcon} className="w-5 h-5 mr-3" />
                <span>
                  <p className="text-[#173302] font-semibold">
                    More affordable prices
                  </p>
                  <p className="text-[#8E8E8E]">
                    Access top-quality services at unbeatable affordable rates,
                    ensuring unbeatable value without compromise.
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section className="Hero-6">
      <div className="mt-20 max-w-screen-xl mx-auto font-outfit">
        <div>
          <h1 className="text-4xl font-semibold">Product Choices</h1>
          <h1 className="text-4xl font-semibold mt-4">
            at
            <span className="bg-[#A1E870] p-1 rounded-xl">Discounted Prices!</span>
          </h1>
          <p className="mt-8 text-slate-500 text-sm">
            Explore a plethora of discounted product choices, ensuring
            unbeatable <br />
            affordability without compromising quality!
          </p>
        </div>
      </div>
    </section>

    <section className="hero-7">
      <div className="container max-w-screen-xl mx-auto font-outfit">
        <div className="grid grid-cols-4 gap-6">
          <div
            className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10"
          >
            <span className="relative">
              <button
                className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white"
              >
                5% Discount
              </button>
              <img src={ProductImg1} className="w-full" />
            </span>
            <span className="flex justify-between items-center mt-4">
              <p className="font-semibold text-xl">Fresh Broccoli</p>
              <img src={BookmarkIcon} className="w-5 h-6" />
            </span>
            <span className="flex items-center mt-2">
              <img src={StorefrontIcon} className="w-4 h-4 mr-2" />
              <p className="text-sm">Hotel California</p>
              <img
                src={ShieldIcon}
                className="w-4 h-4 ml-2"
              />
            </span>
            <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
            <span className="flex items-center mb-2">
              <span className="flex items-baseline">
                <p className="text-xs mr-2">Rp</p>
                <p className="text-xl font-bold mr-3">7.000</p></span
              >

              <span className="relative">
                <p className="text-md text-red-500">Rp 15.000</p>
                <div className="absolute top-1/2 border border-black w-full"></div>
              </span>
            </span>
            <a href="transaction.html">
              <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                Add To Cart
              </button>
            </a>
          </div>
          <div
            className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10"
          >
            <span className="relative">
              <button
                className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white"
              >
                5% Discount
              </button>
              <img src={ProductImg1} className="w-full h-fit" />
            </span>
            <span className="flex justify-between items-center mt-4">
              <p className="font-semibold text-xl">Fresh Broccoli</p>
              <img src={BookmarkIcon} className="w-5 h-6" />
            </span>
            <span className="flex items-center mt-2">
              <img src={StorefrontIcon} className="w-4 h-4 mr-2" />
              <p className="text-sm">Hotel California</p>
              <img
                src={ShieldIcon}
                className="w-4 h-4 ml-2"
              />
            </span>
            <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
            <span className="flex items-center mb-2">
              <span className="flex items-baseline">
                <p className="text-xs mr-2">Rp</p>
                <p className="text-xl font-bold mr-3">7.000</p></span
              >

              <span className="relative">
                <p className="text-md text-red-500">Rp 15.000</p>
                <div className="absolute top-1/2 border border-black w-full"></div>
              </span>
            </span>
            <a href="transaction.html">
              <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                Add To Cart
              </button>
            </a>
          </div>
          <div
            className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10"
          >
            <span className="relative">
              <button
                className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white"
              >
                5% Discount
              </button>
              <img src={ProductImg1} className="w-full" />
            </span>
            <span className="flex justify-between items-center mt-4">
              <p className="font-semibold text-xl">Fresh Broccoli</p>
              <img src={BookmarkIcon} className="w-5 h-6" />
            </span>
            <span className="flex items-center mt-2">
              <img src={StorefrontIcon} className="w-4 h-4 mr-2" />
              <p className="text-sm">Hotel California</p>
              <img
                src={ShieldIcon}
                className="w-4 h-4 ml-2"
              />
            </span>
            <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
            <span className="flex items-center mb-2">
              <span className="flex items-baseline">
                <p className="text-xs mr-2">Rp</p>
                <p className="text-xl font-bold mr-3">7.000</p></span
              >

              <span className="relative">
                <p className="text-md text-red-500">Rp 15.000</p>
                <div className="absolute top-1/2 border border-black w-full"></div>
              </span>
            </span>
            <a href="transaction.html">
              <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                Add To Cart
              </button>
            </a>
          </div>
          <div
            className="border border-slate-400 flex flex-col p-4 rounded-lg mt-10"
          >
            <span className="relative">
              <button
                className="bg-[#FC5A32] px-2 py-1 absolute top-3 left-2 rounded-lg text-white"
              >
                5% Discount
              </button>
              <img src={ProductImg1} className="w-full" />
            </span>
            <span className="flex justify-between items-center mt-4">
              <p className="font-semibold text-xl">Fresh Broccoli</p>
              <img src={BookmarkIcon} className="w-5 h-6" />
            </span>
            <span className="flex items-center mt-2">
              <img src={StorefrontIcon} className="w-4 h-4 mr-2" />
              <p className="text-sm">Hotel California</p>
              <img
                src={ShieldIcon}
                className="w-4 h-4 ml-2"
              />
            </span>
            <img src={ReviewStatus} className="w-1/2 mt-2 mb-4" />
            <span className="flex items-center mb-2">
              <span className="flex items-baseline">
                <p className="text-xs mr-2">Rp</p>
                <p className="text-xl font-bold mr-3">7.000</p></span
              >

              <span className="relative">
                <p className="text-md text-red-500">Rp 15.000</p>
                <div className="absolute top-1/2 border border-black w-full"></div>
              </span>
            </span>
            <a href="transaction.html">
              <button className="bg-[#A1E870] rounded-lg py-2 mt-2 w-full">
                Add To Cart
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section id="question">
      <div
        className="container max-w-screen-xl mx-auto text-center my-20 font-outfit bg-cover bg-center bg-no-repeat rounded-lg"
        style={{backgroundImage: `url(${QuestionBg})`}}
      >
        <div className="p-10">
          <img src={AvatarGroup} className="mx-auto" />
          <p className="text-xl">Still have questions?</p>
          <p className="text-sm">
            Having trouble finding the answer you need? Reach out to our
            friendly team for further help!
          </p>
          <button className="bg-[#A1E870] py-2 px-2 rounded-lg mt-6">
            Get in touch
          </button>
        </div>
      </div>
    </section>

    <footer>
      <div className="w-full bg-[#173302] text-white py-5 font-outfit">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <span className="flex items-center">
            <img src={LogoFooter} className="mr-2" />
            <p>EcoBite</p>
          </span>
          <span className="flex">
            <p className="mr-6">About Us</p>
            <p className="mr-6">Catalog</p>
            <p className="mr-6">Catalog Detail</p>
            <p>Customer Support</p>
          </span>
        </div>
        <div
          className="container mx-auto flex items-center justify-between max-w-screen-xl mt-10"
        >
          <p>© Ecobite 2024 - All Rights Reserved</p>
          <span className="flex">
            <p className="mr-10 text-xs">Terms of Use</p>
            <p className="mr-10 text-xs">Privacy Policy</p>
            <p className="text-xs">Agreement</p>
          </span>
        </div>
      </div>
    </footer>
            </div>
        </>
    );
};

export default Home;
