import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Router from "./components/Router";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateTheme(themeName: string) {
  document.documentElement.setAttribute('data-theme', themeName);
}

function App() {
  const location = useLocation();

  // Get the base part of the pathname without any slashes or query strings
  const basePathname = location.pathname.split("/")[1]

  // Capitalize the first letter of the basePathname for the title
  const pageTitle = capitalizeFirstLetter(basePathname);

  // Map each page name to its corresponding logo URL
  const pageLogos: { [key: string]: string } = {
    home: "home.png",
    dashboard: "dashboard.png", // corrected typo 'dahsboard' to 'dashboard'
    article: "article.png",
    exercise: "exercise.png",
    studynow: "studynow.png",
    mydecks: "mydecks.png",
    login: "login.png",
    logout: "logout.png",
    signup: "signup.png",
    profile: "profile.png",
  };


  const logoUrl = pageLogos[basePathname] || pageLogos['mydecks'];
  const [theme, setTheme] = useState('synthwave');


  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col flex-grow">
        <div className="h-16">
          <Topbar pageTitle={pageTitle} logoUrl={logoUrl} />
        </div>
        <div className="mt-[65px] overflow-auto flex-grow">
          <Router />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
