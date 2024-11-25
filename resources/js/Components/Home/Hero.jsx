import Logoipsum1 from '../../../assets/logoipsum1.svg';    
import Logoipsum2 from '../../../assets/logoipsum2.svg';
import Logoipsum3 from '../../../assets/logoipsum3.svg';
import SearchIcon from '../../../assets/Search.svg';
import CommandIcon from '../../../assets/ph_command-bold.svg';
import KIcon from '../../../assets/K.svg';
import Vector from '../../../assets/Vector.png';

const Hero = () => {
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
    )
}

export default Hero;