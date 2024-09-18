"use client";

import { useState } from "react";
import Login from "./auth/login/page";  // Import Login component
import Signup from "./auth/signup/page";  // Import Signup component

export default function Home() {
  const [showSignup, setShowSignup] = useState(false); // Toggle between login and signup

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Conditionally render Login or Signup */}
        {showSignup ? <Signup /> : <Login />}

        {/* Toggle Button */}
        <button
          onClick={() => setShowSignup(!showSignup)}
          className="mt-4 text-blue-500 underline"
        >
          {showSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </button>
      </main>
    </div>
  );
}
