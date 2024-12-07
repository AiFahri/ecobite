import { useState } from "react";
import { Link, router } from "@inertiajs/react";

import loginBg from "../../assets/path/loginbg.svg";
import brocolliImg from "../../../resources/assets/path/brocolli.svg";
import ecobiteImg from "../../../resources/assets/path/Ecobite.svg";
import googleIcon from "../../../resources/assets/path/google.svg";
import facebookIcon from "../../../resources/assets/Facebook_f_logo_(2019).svg.png";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(
            "/login",
            {
                email: formData.email,
                password: formData.password,
                remember: rememberMe,
            },
            {
                onSuccess: () => {
                    console.log("Login berhasil");
                    // router.visit("/catalog");
                },
                onError: (errors) => {
                    setErrors(errors);
                    console.log("Login error:", errors);
                },
                onStart: () => {
                    setProcessing(true);
                    console.log("Login dimulai");
                },
                onFinish: () => {
                    setProcessing(false);
                    console.log("Login selesai");
                },
            }
        );
    };

    return (
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
                        Don't have an account yet?
                        <Link href="/register" className="text-gray-900">
                            {" "}
                            Sign Up
                        </Link>
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
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
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
                        <div className="mb-6 relative">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="focus:outline-none mt-4"
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
                        <div className="flex items-center justify-between mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                />
                                <span className="ml-2">Remember Me</span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="inline-block font-semibold text-sm hover:text-blue-800"
                            >
                                Forget Password?
                            </Link>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-[#A1E870] hover:bg-green-700 py-2 px-56 ml-2 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? "Loading..." : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
