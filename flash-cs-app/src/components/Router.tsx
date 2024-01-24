import React from "react";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Article from "../pages/Article";
import MyDecks from "../pages/MyDecks";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/NotFoundPage";
import Exercise from "../pages/Exercise";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import StudyNow from "../pages/StudyNow";
import ArticleModal from "../pages/ArticleModal";

export const routeConfig = [
  {
    path: "/home",
    name: "Home",
    show: false,
    requiredLogin: false,
    component: <Home />,
  },
  {
    path: "/login",
    name: "Login",
    show: false,
    requiredLogin: false,
    component: <Login />,
  },
  {
    path: "/signup",
    name: "Sign Up",
    show: false,
    requiredLogin: false,
    component: <SignUp />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    show: false,
    requiredLogin: true,
    component: <Dashboard />,
  },
  {
    path: "/article",
    name: "Article",
    show: false,
    requiredLogin: false,
    component: <Article />,
  },
  {
    path: "/mydecks",
    name: "My Decks",
    show: false,
    requiredLogin: true,
    component: <MyDecks />,
  },
  // {
  //   path: "/exercise",
  //   name: "Exercise",
  //   show: false,
  //   requiredLogin: true,
  //   component: <Exercise />,
  // },
  {
    path: "/profile",
    name: "Profile",
    show: false,
    requiredLogin: true,
    component: <Profile />,
  },
  {
    path: "/studynow",
    name: "Study Now",
    show: false,
    requiredLogin: true,
    component: <StudyNow />,
  },
  {
    path: "/exercise/:itemId",
    name: "Exercise",
    show: false,
    requiredLogin: false,
    component: <ArticleModal />,
  },
];

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route element={<PrivateRoute />}>
        {routeConfig
          .filter((route) => route.requiredLogin)
          .map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
      </Route>

      {routeConfig
        .filter((route) => !route.requiredLogin)
        .map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
