import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddDeckModal from "./AddDeckModal";
import "../css/Navbar.css";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../slices/auth.slice";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../api/utilsAPI";
import { getAllDeck } from "../api/CardAPI";
import CardListFilter from "./CardListFilter";
import { useTheme } from "../ThemeContext";

function Navbar() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: [queryKey.DECK],
    queryFn: getAllDeck,
  });

  const toggleNavbar = () => {
    if (windowWidth <= 1024) {
      setIsOpen((prevState) => !prevState);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (windowWidth <= 1024) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [windowWidth]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { theme, toggleTheme } = useTheme();

  const barBorderColor =
    theme === "light" ? "bar-border-light" : "bar-border-dark";

  return (
    <div className="w-auto">
      <label
        htmlFor="my-drawer-2"
        className={`drawer-button text-4xl lg:hidden fixed justify-center items-center flex w-6 h-12 rounded rounded-e-full top-1/2 bg-base-200/50`}
      >
        {/* <img
          src="/arrow.png"
          alt="Toggle Drawer"
          className="arrow-icon invert object-contain w-6"
        /> */}
        |||
      </label>
      <div
        className={`drawer relative ${
          isOpen ? "lg:drawer-open z-[1]" : ""
        } lg:w-auto max-lg:fixed h-screen overflow-hidden pointer-events-none`}
      >
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={toggleNavbar}
        />

        <div
          className={`drawer-side my-auto max-w-10 h-auto  ${barBorderColor}`}
        >
          <label
            htmlFor="my-drawer-2"
            className="drawer-overlay"
            aria-label="close sidebar"
          ></label>

          <div className="flex flex-col h-screen">
            {/* Scrollable Menu items */}
            <div
              className={`flex flex-1 flex-col lg:max-w-sm overflow-y-auto ${
                isOpen && theme === "light" ? "bg-gradient-to-l from-indigo-700 to-indigo-400" : ""
              }`}
            >
              <ul className="menu p-4 w-auto gap-4 text-lg">
                {/* Sidebar content here */}
                <li className="flex mb-20 mt-5">
                  <Link
                    to="/home"
                    onClick={toggleNavbar}
                    className={`font-bold btn-ghost ml-0 ${
                      theme === "light"
                        ? isOpen
                          ? "text-light-fixed"
                          : "text-light"
                        : "text-dark"
                    }`}
                  >
                    <img
                      src="/boxlogo.png"
                      alt="Logo"
                      className={`mr-2 h-8 ${
                        theme === "light"
                          ? isOpen
                            ? "logo-light-fixed"
                            : "logo-light"
                          : "logo-dark"
                      }`}
                    />
                    <span className="text-3xl align-text-top">Flash CS</span>
                  </Link>
                </li>
                <li>
                  <Link to="/home" onClick={toggleNavbar}>
                    <span
                      className={`mr-2 ${
                        theme === "light"
                          ? isOpen
                            ? "logo-light-fixed"
                            : "logo-light"
                          : "logo-dark"
                      }`}
                    >
                      <img src={"/home.png"} alt="Icon" className="h-6" />
                    </span>
                    <span
                      className={`${
                        theme === "light"
                          ? isOpen
                            ? "text-light-fixed"
                            : "text-light"
                          : "text-dark"
                      }`}
                    >
                      Home
                    </span>
                  </Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link to="/dashboard" onClick={toggleNavbar}>
                      <span
                        className={`mr-2 ${
                          theme === "light" && isOpen
                            ? "logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                        {/* Use the imported iconImage variable as the source */}
                        <img
                          src={"/dashboard.png"}
                          alt="Icon"
                          className="h-6"
                        />
                      </span>
                      <span
                        className={`${
                          theme === "light" && isOpen
                            ? "text-light-fixed"
                            : theme === "light"
                            ? "text-light"
                            : "text-dark"
                        }`}
                      >
                        Dashboard
                      </span>
                    </Link>
                  </li>
                )}
                <li>
                  <Link to="/article" onClick={toggleNavbar}>
                    <span
                      className={`mr-2 ${
                        theme === "light" && isOpen
                          ? "logo-light-fixed"
                          : theme === "light"
                          ? "logo-light"
                          : "logo-dark"
                      }`}
                    >
                      {/* Use the imported iconImage variable as the source */}
                      <img src={"/article.png"} alt="Icon" className="h-6" />
                    </span>
                    <span
                      className={`${
                        theme === "light" && isOpen
                          ? "text-light-fixed"
                          : theme === "light"
                          ? "text-light"
                          : "text-dark"
                      }`}
                    >
                      Article
                    </span>
                  </Link>
                </li>
                {/* {isAuthenticated && (
                  <li>
                    <Link to="/exercise" onClick={toggleNavbar}>
                      <span
                        className={`mr-2 ${
                          theme === "light" && isOpen
                            ? "logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                        <img src={"/exercise.png"} alt="Icon" className="h-6" />
                      </span>
                      <span
                        className={`${
                          theme === "light" && isOpen
                            ? "text-light-fixed"
                            : theme === "light"
                            ? "text-light"
                            : "text-dark"
                        }`}
                      >
                        Exercise
                      </span>
                    </Link>
                  </li>
                )} */}
                {isAuthenticated && (
                  <li>
                    <Link to="/studynow" onClick={toggleNavbar}>
                      <span
                        className={`mr-2 ${
                          theme === "light" && isOpen
                            ? "logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                        {/* Use the imported iconImage variable as the source */}
                        <img src={"/studynow.png"} alt="Icon" className="h-6" />
                      </span>
                      <span
                        className={`${
                          theme === "light" && isOpen
                            ? "text-light-fixed"
                            : theme === "light"
                            ? "text-light"
                            : "text-dark"
                        }`}
                      >
                        Study Now
                      </span>
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li className="menu-item">
                    <details className="menu p-0 text-lg">
                      <summary className="flex">
                        <span
                          className={`mr-2 ${
                            theme === "light" && isOpen
                              ? "logo-light-fixed"
                              : theme === "light"
                              ? "logo-light"
                              : "logo-dark"
                          }`}
                        >
                          <img
                            src={"/mydecks.png"}
                            alt="Icon"
                            className="h-6"
                          />
                        </span>
                        <span
                          className={`${
                            theme === "light" && isOpen
                              ? "text-light-fixed"
                              : theme === "light"
                              ? "text-light"
                              : "text-dark"
                          }`}
                        >
                          My Decks
                        </span>
                        <span className={`dropdown-icon`}></span>
                      </summary>
                      <div className="navbar-list-container max-h-[260px] overflow-y-auto overflow-x-hidden hover:scale-100">
                        <ul className="menu text-lg max-w-20%" onClick={toggleNavbar}>
                          <CardListFilter theme={""} isOpen={false} />
                          <li>
                            <button
                              onClick={openModal}
                              className="text-left w-full group hover:scale-105"
                            >
                              <span
                                className={`inline-block group-hover:rotate-90 transition-transform duration-900 ease-in-out ${
                                  theme === "light" && isOpen
                                    ? "text-light-fixed"
                                    : theme === "light"
                                    ? "text-light"
                                    : "text-dark"
                                }`}
                              >
                                +
                              </span>
                              <span
                                className={`${
                                  theme === "light" && isOpen
                                    ? "text-light-fixed"
                                    : theme === "light"
                                    ? "text-light"
                                    : "text-dark"
                                }`}
                              >
                                Create a new deck
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </details>
                  </li>
                )}
              </ul>
              <div className="menu relative h-32 w-[360px] mt-auto pl-4 text-lg">
                {!isAuthenticated && (
                  <li>
                    <Link
                      to="/login"
                      className="w-full mb-2"
                      onClick={toggleNavbar}
                    >
                      <span
                        className={`mr-2 ${
                          theme === "light" && isOpen
                            ? "logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                        <img src={"/login.png"} alt="Icon" className="h-6" />
                      </span>
                      <span
                        className={`${
                          theme === "light" && isOpen
                            ? "text-light-fixed"
                            : theme === "light"
                            ? "text-light"
                            : "text-dark"
                        }`}
                      >
                        Login
                      </span>
                    </Link>
                  </li>
                )}

                {!isAuthenticated && (
                  <li>
                    <Link
                      to="/signup"
                      className="w-full mb-2"
                      onClick={toggleNavbar}
                    >
                      <span
                        className={`mr-2 ${
                          theme === "light" && isOpen
                            ? "logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                        <img
                          src={"/signup.png"}
                          alt="Signup Icon"
                          className="h-6"
                        />
                      </span>
                      <span
                        className={`${
                          theme === "light" && isOpen
                            ? "text-light-fixed"
                            : theme === "light"
                            ? "text-light"
                            : "text-dark"
                        }`}
                      >
                        Sign Up
                      </span>
                    </Link>
                  </li>
                )}

                {isAuthenticated && (
                  <li>
                    <Link
                      to="/profile"
                      className="w-full"
                      onClick={toggleNavbar}
                    >
                      <span
                        className={`mr-2 ${
                          theme === "light" && isOpen
                            ? "logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                        {/* Use the imported iconImage variable as the source */}
                        <img src={"/profile.png"} alt="Icon" className="h-6" />
                      </span>
                      <span
                        className={`${
                          theme === "light" && isOpen
                            ? "text-light-fixed"
                            : theme === "light"
                            ? "text-light"
                            : "text-dark"
                        }`}
                      >
                        Profile
                      </span>
                    </Link>
                  </li>
                )}

                {isAuthenticated && (
                  <li onClick={() => dispatch(logout())}>
                    <div className="w-full">
                      <span
                        className={`mr-2 ${
                          theme === "light" && isOpen
                            ? "logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                        <img src={"/login.png"} alt="Icon" className="h-6" />
                      </span>
                      <span
                        className={`${
                          theme === "light" && isOpen
                            ? "text-light-fixed"
                            : theme === "light"
                            ? "text-light"
                            : "text-dark"
                        }`}
                      >
                        Logout
                      </span>
                    </div>
                  </li>
                )}
              </div>
            </div>
            {/* Non-scrollable Bottom section */}
          </div>
        </div>
        <AddDeckModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}

export default Navbar;
