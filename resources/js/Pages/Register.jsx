import loginBg from '../../assets/path/loginbg.svg'
import brocolliImg from '../../../resources/assets/path/brocolli.svg';
import ecobiteImg from '../../../resources/assets/path/Ecobite.svg';
import googleIcon from '../../../resources/assets/path/google.svg';
import appleIcon from '../../../resources/assets/path/ic_baseline-apple.svg';
import { useState } from 'react';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showVerificationPassword, setShowVerificationPassword] = useState(false);

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowVerificationPassword(!showVerificationPassword);
        }
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
          <h2 className="text-center text-3xl mb-4 font-semibold">Welcome Back!</h2>
          <p className="text-center mb-4 text-gray-400">
            Don’t have an account yet?
            <a href="#" className="text-gray-900">Sign Up</a>
          </p>
          <div className="flex justify-center mb-4 pt-4 mt-7">
            <button
              className="focus:outline-none focus:shadow-outline border rounded-lg px-4 py-2 mr-2 flex items-center"
            >
              <img
                src={googleIcon}
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </button>
            <button
              className="focus:outline-none focus:shadow-outline border rounded-lg px-4 py-2 mr-2 flex items-center"
            >
              <img
                src={appleIcon}
                alt="Apple"
                className="w-5 h-5 mr-2"
              />
              Login with Apple
            </button>
          </div>
          <div className="flex items-center justify-center mb-4 mt-10">
            <div className="flex-grow border-t border-[#D7D7D7]"></div>
            <span className="px-3 text-gray-500">Or Sign Through</span>
            <div className="flex-grow border-t border-[#D7D7D7]"></div>
          </div>
          <form className="rounded px-7 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="Username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Username"
                type="Username"
                placeholder="Enter your Username"
              />
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
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password-verification"
              >
                Password Verification
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password-verification"
                type={showVerificationPassword ? "text" : "password"}
                placeholder="Enter your password verification"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="focus:outline-none mt-4"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <div className="absolute bottom-0 right-0 pr-3 flex items-center text-sm leading-5 mb-3">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('verification')}
                  className="focus:outline-none"
                >
                  <i className={`fas ${showVerificationPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Remember Me</span>
              </label>
              <a
                href="#"
                className="inline-block font-semibold text-sm hover:text-blue-800"
              >
                Forget Password?
              </a>
            </div>
            <div className="flex items-center justify-between">
              <a href="index.html">
                <button
                  className="bg-[#A1E870] hover:bg-green-700 py-2 px-56 ml-2 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
                </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>

    

        </>
    )
}

export default Register;