import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../pages/Home";
import { useAuth0 } from "@auth0/auth0-react";
import ProjectPage from "../pages/Project";

const Layout = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {isAuthenticated && <Route path="/create" element={<Home />} />}
      <Route path="/project/:projectName" element={<ProjectPage />} />
    </Routes>
  );
};

export default Layout;
