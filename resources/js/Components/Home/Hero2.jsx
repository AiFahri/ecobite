import StarIcon from '../../../assets/mdi_star-four-points.svg';


const Hero2 = () => {
    return (
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
    )
}

export default Hero2;