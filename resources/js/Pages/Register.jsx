import loginBg from "../../assets/path/loginbg.svg";
import brocolliImg from "../../../resources/assets/path/brocolli.svg";
import ecobiteImg from "../../../resources/assets/path/Ecobite.svg";
import googleIcon from "../../../resources/assets/path/google.svg";
import facebookIcon from "../../../resources/assets/Facebook_f_logo_(2019).svg.png";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showVerificationPassword, setShowVerificationPassword] =
        useState(false);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        agree: false,
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post("/register", formData, {
            onSuccess: () => {},
            onError: (errors) => {
                setErrors(errors);
            },
            onStart: () => {
                setProcessing(true);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <>
            <div className="flex h-screen overflow-hidden font-outfit">
                <div className="w-1/2 relative">
                    <img
                        src={loginBg}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="relative z-10 flex justify-center items-center h-full">
                        <img
                            src={brocolliImg}
                            alt="Broccoli"
                            className="w-full mx-auto mt-32"
                        />
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <div className="w-full max-w-xl">
                        <img
                            src={ecobiteImg}
                            alt="EcoBite"
                            className="w-32 mx-auto mb-4"
                        />
                        <h2 className="text-center text-3xl mb-4 font-semibold">
                            Welcome Back!
                        </h2>
                        <p className="text-center mb-4 text-gray-400">
                            Already have an account?
                            <a href="/login" className="text-gray-900">
                                {" "}
                                Sign In
                            </a>
                        </p>
                        <div className="flex justify-center mb-4 pt-4 mt-7">
                            <a href="/auth/google" className="inline-block">
                                <button className="focus:outline-none focus:shadow-outline border rounded-lg px-4 py-2 mr-2 flex items-center">
                                    <img
                                        src={googleIcon}
                                        alt="Google"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Login with Google
                                </button>
                            </a>
                            <a href="/auth/facebook" className="inline-block">
                                <button className="focus:outline-none focus:shadow-outline border rounded-lg px-4 py-2 mr-2 flex items-center">
                                    <img
                                        src={facebookIcon}
                                        alt="Facebook"
                                        className="w-5 h-5 mr-2"
                                    />
                                    Login with Facebook
                                </button>
                            </a>
                        </div>
                        <div className="flex items-center justify-center mb-4 mt-10">
                            <div className="flex-grow border-t border-[#D7D7D7]"></div>
                            <span className="px-3 text-gray-500">
                                Or Sign Through
                            </span>
                            <div className="flex-grow border-t border-[#D7D7D7]"></div>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="rounded px-7 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Full Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="full_name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                />
                                {errors.full_name && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.full_name}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        <i
                                            className={`fas ${
                                                showPassword
                                                    ? "fa-eye-slash"
                                                    : "fa-eye"
                                            }`}
                                        ></i>
                                    </button>
                                </div>
                                {errors.password && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="password_confirmation"
                                        type={
                                            showVerificationPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm your password"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowVerificationPassword(
                                                !showVerificationPassword
                                            )
                                        }
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        <i
                                            className={`fas ${
                                                showVerificationPassword
                                                    ? "fa-eye-slash"
                                                    : "fa-eye"
                                            }`}
                                        ></i>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        className="form-checkbox"
                                        checked={formData.agree}
                                        onChange={handleInputChange}
                                    />
                                    <span className="ml-2">
                                        I agree to the terms and conditions
                                    </span>
                                </label>
                                {errors.agree && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.agree}
                                    </div>
                                )}
                            </div>

                            <button
                                className="bg-[#A1E870] hover:bg-green-700 py-2 px-56 ml-2 rounded focus:outline-none focus:shadow-outline w-full"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? "Processing..." : "Sign Up"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
