import LogoFooter from '../../assets/Logo.svg';


const Footer = () => {
    return (
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
    )
}

export default Footer;