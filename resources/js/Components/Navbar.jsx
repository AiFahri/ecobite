import Logo from "../../assets/Logo.png";
import { usePage } from "@inertiajs/react";

const Navbar = () => {
    const page = usePage();

    // Debug seluruh props
    console.log("All props:", {
        props: page.props,
        url: page.url,
        component: page.component,
        auth: page.props.auth,
        user: page.props.auth?.user,
        flash: page.props.flash,
    });

    const { auth } = page.props;

    return (
        <section id="navbar" className="h-[10vh] py-2 font-outfit">
            <div className="container max-w-screen-xl mx-auto">
                <div className="flex justify-between">
                    <span className="flex items-center">
                        <img src={Logo} className="mr-2" />
                        <p>EcoBite</p>
                    </span>
                    <ul className="flex items-center">
                        <li className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <a href="/">Home</a>
                        </li>
                        <li className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <a href="/catalog">Catalog</a>
                        </li>
                        <li className="mr-14 text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <a href="/wishlist">Wishlist</a>
                        </li>
                        <li className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <a href="/carts">Transaction</a>
                        </li>
                    </ul>

                    {auth?.user ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md">
                            <img
                                src={
                                    auth.user.profile_photo_url ||
                                    "https://ui-avatars.com/api/?name=" +
                                        auth.user.name
                                }
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-gray-700">
                                {auth.user.name}
                            </span>
                        </div>
                    ) : (
                        <a href="/login">
                            <button className="px-4 py-2 bg-[#A1E870] rounded-md">
                                Sign In
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Navbar;
