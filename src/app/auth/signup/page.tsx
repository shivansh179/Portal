"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { auth, db } from "../../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("student");
  const router = useRouter();

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">Signup</h1>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full text-black border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="w-full text-black border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full text-black border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Role</label>
          <select
            value={role}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
            className="w-full text-black border p-2"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
