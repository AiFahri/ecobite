import Logo from "../../assets/Logo.png";
import { Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import LogoutIcon from "../../assets/logout.svg";

const Navbar = ({ auth }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        window.location.href = "/logout";
    };

    return (
        <section id="navbar" className="h-[10vh] py-2 font-outfit">
            <div className="container max-w-screen-xl mx-auto">
                <div className="flex justify-between">
                    <span className="flex items-center">
                        <img src={Logo} className="mr-2" alt="Logo" />
                        <p>EcoBite</p>
                    </span>
                    <ul className="flex items-center">
                        <li className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <Link href="/catalog">Catalog</Link>
                        </li>
                        <li className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <Link href="/wishlist">Wishlist</Link>
                        </li>
                        <li className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <Link href="/carts">Transaction</Link>
                        </li>
                    </ul>
                    {auth ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50"
                            >
                                <span className="text-slate-700">
                                    {auth.full_name}
                                </span>
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img
                                        src={
                                            auth.photo_url ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                auth.full_name
                                            )}`
                                        }
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <img
                                            src={LogoutIcon}
                                            alt="Logout"
                                            className="w-5 h-5"
                                        />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="px-4 py-2 bg-[#A1E870] rounded-md">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Navbar;
