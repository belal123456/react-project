import React from "react";
import Navbar from "../componets/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 h-screen flex flex-col justify-center items-center text-center mt-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg text-gray-700 mb-8">
          We are excited to share our journey with you.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
