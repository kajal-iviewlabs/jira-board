import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

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
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 flex flex-col items-start justify-center ml-5">
          <h1 className="text-4xl text-blue-900 font-bold mb-4 ">
            Welcome to Our Website
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to our project management tool! We're thrilled to have you
            on board. With our platform, you can streamline your project
            workflows, collaborate effortlessly with your team, and stay
            organized every step of the way. Whether you're a seasoned project
            manager or just getting started, we're here to support you on your
            journey to success. Let's create, collaborate, and achieve great
            things together!
          </p>
          <button className="bg-blue-900 text-gray-100 hover:bg-gray-100 hover:text-blue-900 border hover:border-blue-900 p-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            <Link to="create">Create new project</Link>
          </button>
        </div>
        <div className="w-1/2 mr-3">
          <img src="homePageImg.jpeg" alt="HomePageImage" className="w-full" />
        </div>
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
