"use client";

import { useState, useEffect } from "react";
import { auth } from "../../../firebase"; // Adjust the path to your firebase config
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Fetch logged-in user's email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Extract the first character of the user's email
  const getFirstChar = (email: string | null) => {
    return email ? email.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="bg-white dark:bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: University Name */}
        <div className="text-xl font-bold text-blue-600">SRM University Delhi-NCR</div>

        {/* Middle: Nav Items */}
        <div className="hidden md:flex space-x-8">
          <a href="/drive" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Drive</a>
          <a href="/offer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Offer</a>
          <a href="/notice" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Notice</a>
        </div>

        {/* Right: User Avatar */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold">
            {getFirstChar(userEmail)}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-center mt-4 space-x-4">
        <a href="/drive" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Drive</a>
        <a href="/offer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Offer</a>
        <a href="/notice" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Notice</a>
      </div>
    </nav>
  );
};

export default Navbar;
