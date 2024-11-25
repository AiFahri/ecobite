import VegetableImg from '../../../assets/650d19e70f0c2cb32192512b54d97fb5.png';
import CakeImg from '../../../assets/72d21517ec0797290d10e2992557d744.png';
import MealImg from '../../../assets/da64e6b9a588ca133da333afad9156c4.png';
import SnackImg from '../../../assets/9792320a717f83d711328f428d978534.png';

const Hero3 = () => {
    return (
        <>
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
    </>
    )
}

export default Hero3;