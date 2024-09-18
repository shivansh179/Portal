// File: /components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { auth } from "../../../firebase"; // Adjust the path to your firebase config
import { onAuthStateChanged } from "firebase/auth";

const Navbar = ({ handleSectionClick }: { handleSectionClick: (sectionName: string) => void }) => {
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
        <div className="text-xl font-bold text-blue-600">SRM University Delhi-NCR</div>

        <div className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            onClick={() => handleSectionClick("Student Data")}
          >
            Student Data
          </a>
          <a
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            onClick={() => handleSectionClick("Selected Students")}
          >
            Selected Students
          </a>
          <a
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
            onClick={() => handleSectionClick("Student Requests")}
          >
            Student Requests
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-semibold">
            {getFirstChar(userEmail)}
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-center mt-4 space-x-4">
        {/* Mobile Menu */}
        <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
          onClick={() => handleSectionClick("Student Data")}
        >
          Student Data
        </a>
        <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
          onClick={() => handleSectionClick("Selected Students")}
        >
          Selected Students
        </a>
        <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600"
          onClick={() => handleSectionClick("Student Requests")}
        >
          Student Requests
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
