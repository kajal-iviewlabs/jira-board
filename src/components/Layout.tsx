import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../pages/Home";
import { useAuth0 } from "@auth0/auth0-react";

const Layout = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {isAuthenticated && <Route path="/create" element={<Home />} />}
    </Routes>
  );
};

export default Layout;
