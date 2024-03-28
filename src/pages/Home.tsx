import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = () => {
    loginWithRedirect();
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  if (token) {
    return (
      <div className="content">
        <p>Render authenticated content.</p>
      </div>
    );
  } else {
    return (
      <div className="content">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Our App!</h2>
          <p className="text-lg mb-4">
            Our app is designed to help you manage projects efficiently and
            collaborate with your team effortlessly.
          </p>
          <p className="text-lg mb-8">
            To get started and unlock all the features, please log in.
          </p>
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
};

export default Home;
