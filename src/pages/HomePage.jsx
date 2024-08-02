// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../componets/Navbar";
import Posts from "../componets/Posts";
import AddPost from "../componets/AddPost";

// eslint-disable-next-line react/prop-types
const HomePage = ({ user }) => {
  return (
    <div className="relative">
      <Navbar user={user} />
      <div className="container mx-auto p-4 mt-16">
        <Posts />
      </div>
      <AddPost user={user} />
    </div>
  );
};

export default HomePage;
