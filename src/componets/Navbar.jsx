import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logOut } from "../auth";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Logo</Link>
        </div>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-4"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
