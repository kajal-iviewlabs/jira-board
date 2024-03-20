import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Layout from "./components/router/Layout";
import LeftMenu from "./components/verticalDropDown/LeftMenu";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getTokenAndStore = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          localStorage.setItem("token", token);
        } catch (error) {
          console.error("Error during login:", error);
        }
      }
    };

    getTokenAndStore();
  }, [isAuthenticated]);

  return (
    <>
      <div>
        <Header />
        <div className="content">
          <LeftMenu />
          <Layout />
        </div>
      </div>
    </>
  );
}

export default App;
