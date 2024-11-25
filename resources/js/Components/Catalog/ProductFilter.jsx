import ReviewsStatusIcon from "../../../assets/Reviews + Status.svg";
import Logo from "../../../assets/logo.png";

const ProductFilter = () => {
    return (
        <>
            <div className="border border-slate-400 p-4 rounded-lg mt-10">
                <span className="flex items-center">
                    <img src={Logo} className="w-8 h-8 mr-4" alt="Logo" />
                    <span>
                        <p>Explore</p>
                        <p className="text-xl">Product Filter</p>
                    </span>
                </span>
                <p className="text-xl mt-6">Location</p>
                <hr className="mt-6" />
                <p className="text-xl mt-6">Food Type</p>
                {["Vegetables", "Fruits", "Meat", "Seafood", "Dessert"].map(
                    (food, index) => (
                        <span key={index} className="flex justify-between mt-6">
                            <span className="flex">
                                <input type="checkbox" />
                                <p className="ml-2">{food}</p>
                            </span>
                            <p>21</p>
                        </span>
                    )
                )}
                <p className="my-4 text-xl mt-6">Tenant Type</p>
                <div className="grid grid-cols-2 gap-4 text-center mt-6">
                    {["hotel", "restaurant", "cafe", "food court"].map(
                        (tenant, index) => (
                            <span
                                key={index}
                                className="border border-slate-200 inline-block p-2"
                            >
                                <p>{tenant}</p>
                            </span>
                        )
                    )}
                </div>
                <p className="text-xl mt-6 mb-6">Price</p>
                <input type="range" className="w-full bg-[#173302]" />
                <div className="grid grid-cols-2 gap-4 text-center mt-6">
                    <span className="border border-slate-200 inline-block p-2">
                        <p>Rp30 rb</p>
                    </span>
                    {/* Repeat similar blocks for other price ranges */}
                </div>
                <div>
                    <span>
                        <p className="text-xl mt-6">Rating</p>
                    </span>
                    {[5, 4, 3, 2, 1].map((rating, index) => (
                        <span
                            key={index}
                            className="flex items-center justify-between mt-6"
                        >
                            <span className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <img
                                    src={ReviewsStatusIcon}
                                    alt={`${rating} stars`}
                                />
                            </span>
                            <p>421</p>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductFilter;
