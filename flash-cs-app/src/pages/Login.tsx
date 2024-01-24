import React, { useState } from "react";
import { loginAPI } from "../api/authAPI";
import { useAppDispatch } from "../store";
import { login } from "../slices/auth.slice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const token = await loginAPI(email, password);
      localStorage.setItem("token", token);
      dispatch(login(email));
      navigate(location.state?.from.pathname ?? "/", { replace: true });
    } catch (error) {
      setErrorMessage("Login failed. Please check your email or password.");
    }
  };
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className={`mx-auto h-20 w-auto ${
            theme === "light"
               ? "logo-light"
              : "logo-dark"
          }`}
          src="/boxlogo.png"
          alt="Your Company Logo"
        />
        <h2 className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight `}>
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {/* Display error message if exists */}
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <div>
          <p className="mt-10 text-center text-sm">
            Not a member?{" "}
            <Link
              to="/Signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
