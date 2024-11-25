import WhyUsImg from '../../../assets/Frame 1000007093.png';
import CheckIcon from '../../../assets/Vector (6).png';

const Hero4 = () => {
    return (
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
    )
}

export default Hero4;