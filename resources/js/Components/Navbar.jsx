import Logo from "../../assets/Logo.png";

const Navbar = () => {
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
                            <a href="/whislist">Whislist</a>
                        </li>
                        <li className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-2">
                            <a href="/transaction">Transaction</a>
                        </li>
                    </ul>
                    <a href="/login">
                        <button className="px-4 py-2 bg-[#A1E870] rounded-md">
                            Sign In
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
