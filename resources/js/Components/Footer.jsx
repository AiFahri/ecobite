import LogoFooter from "../../assets/Logo.svg";
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <footer>
            <div className="w-full bg-[#173302] text-white py-5 font-outfit">
                <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                    <span className="flex items-center">
                        <img
                            src={LogoFooter}
                            className="mr-2"
                            alt="EcoBite Logo"
                        />
                        <p>EcoBite</p>
                    </span>
                    <span className="flex">
                        <Link
                            href="/#why-us"
                            className="mr-6 hover:text-[#A1E870] transition-colors"
                        >
                            About Us
                        </Link>

                        <Link
                            href="/catalog"
                            className="mr-6 hover:text-[#A1E870] transition-colors"
                        >
                            Catalog
                        </Link>

                        <Link
                            href="/products/"
                            className="mr-6 hover:text-[#A1E870] transition-colors"
                        >
                            Catalog Detail
                        </Link>

                        <Link
                            href="/#customer-support"
                            className="hover:text-[#A1E870] transition-colors"
                        >
                            Customer Support
                        </Link>
                    </span>
                </div>
                <div className="container mx-auto flex items-center justify-between max-w-screen-xl mt-10">
                    <p>© Ecobite 2024 - All Rights Reserved</p>
                    <span className="flex">
                        <p className="mr-10 text-xs">Terms of Use</p>
                        <p className="mr-10 text-xs">Privacy Policy</p>
                        <p className="text-xs">Agreement</p>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
