import React, { useState } from "react";
import { signupAPI } from "../api/signupAPI";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";


function SignUp() {
  const [nickname, setNickname] = useState("");
  const [englishLevel, setEnglishLevel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");


    try {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match, please try again.");
      } else {
        const result: any = await signupAPI(
          email,
          nickname,
          englishLevel,
          password
        );
        navigate("/login");
      }
    } catch (err: any) {
      setErrorMessage(err.toString().split("Error: ").at(1));
    }
  };

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
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Create a new account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium leading-6 text-white"
            >
              Nickname
            </label>
            <div className="mt-2">
              <input
                id="nickname"
                name="nickname"
                type="nickname"
                autoComplete="nickname"
                placeholder="Enter your nickname"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="block w-full rounded-md bg-white border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="englishLevel"
              className="block text-sm font-medium leading-6 text-white"
            >
              English level
            </label>
            <div className="mt-2">
              <select
                id="englishLevel"
                name="englishLevel"
                required
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value)}
                className="block w-full rounded-md bg-white border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value=""selected disabled>Select your english level</option>
                <option value="elementary">Elementary</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="native">Native</option>
              </select>
            </div>
          </div>

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
                placeholder="Enter your email address"
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
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Re-confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <div>
          <p className="mt-5 text-center text-sm">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
