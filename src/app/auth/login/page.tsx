"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { auth, db } from "../../../../firebase"; // Import Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"; // Optional: to display a toast message
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("student"); // Dropdown for role selection
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Log in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the user's role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check if the role matches
        if (userData.role === role) {
          toast.success("Login successful!");

          if(role == "student"){
            router.push("/profile/student/dashboard");
          }
          else if(role == "admin"){
            router.push("/profile/admin");
          }
          else{
            router.push("/profile/recruiter");
          }
        //   toast.success("Logg in successful"); // Error if role doesn't match
        //   router.push("/dashboard"); // Navigate to dashboard on success
        } else {
          toast.error("Role does not match!"); // Error if role doesn't match
        }
      } else {
        toast.error("User record not found!"); // Error if no user data
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      toast.error("Error logging in. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleLogin}>
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
          Log In
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
