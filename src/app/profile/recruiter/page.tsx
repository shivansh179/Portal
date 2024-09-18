"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/RecruiterNavbar/page"; // Adjust the path as per your folder structure
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase"; // Import your Firestore configuration
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Page = () => {
  const [section, setSection] = useState<string>("");
  const [studentData, setStudentData] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]); // State for cart
  const [selectedStudents, setSelectedStudents] = useState<Map<string, any>>(new Map()); // State for selected students by email
  const [addedStudents, setAddedStudents] = useState<Set<string>>(new Set()); // Track added students by email

  // Toast configuration
  const notifyAddToCart = () => toast.success("Student added to cart!");
  const notifySaveToFirebase = () => toast.success("Selected students saved to Firebase!");
  const notifyError = (error: string) => toast.error(`Error: ${error}`);

  const handleSectionClick = (sectionName: string) => {
    setSection(sectionName);
    if (sectionName === "Student Data") {
      fetchStudentData();
    } else if (sectionName === "Selected Students") {
      fetchSelectedStudents(); // Fetch selected students when 'Selected Students' section is clicked
    }
  };

  const fetchStudentData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include doc.id
      setStudentData(studentList);
    } catch (error) {
      console.error("Error fetching student data:", error);
      notifyError("Error fetching student data.");
    }
  };

  const fetchSelectedStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "selectedStudents"));
      const selectedList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include doc.id
      const selectedByEmail = new Map<string, any>();
      selectedList.forEach(student => selectedByEmail.set(student.email, student));
      setSelectedStudents(selectedByEmail);
      setAddedStudents(new Set(selectedByEmail.keys())); // Set of emails
    } catch (error) {
      console.error("Error fetching selected students:", error);
      notifyError("Error fetching selected students.");
    }
  };

  const addToCart = async (student: any) => {
    if (addedStudents.has(student.email)) {
      notifyError("Student already selected.");
      return;
    }
    try {
      // Add student to cart
      setCart((prevCart) => [...prevCart, student]);
      // Track added student
      setAddedStudents((prevAdded) => new Set(prevAdded).add(student.email));
      // Save to Firebase
      const selectedCollection = collection(db, "selectedStudents");
      await addDoc(selectedCollection, student);
      notifyAddToCart(); // Show toast when student is added
    } catch (error) {
      notifyError(error.message); // Show error toast
      console.error("Error adding student to cart:", error);
    }
  };

  const saveCartToFirebase = async () => {
    try {
      const selectedCollection = collection(db, "selectedStudents");
      for (const student of cart) {
        // Check for duplicates before adding
        const querySnapshot = await getDocs(selectedCollection);
        const existingStudents = querySnapshot.docs.map((doc) => doc.data().email);
        if (!existingStudents.includes(student.email)) {
          await addDoc(selectedCollection, student); // Save each student in Firebase
        }
      }
      setCart([]); // Clear the cart after saving
      setAddedStudents(new Set()); // Clear the added students tracker
      notifySaveToFirebase(); // Show toast when students are saved to Firebase
    } catch (error) {
      notifyError(error.message); // Show error toast
      console.error("Error saving selected students to Firebase:", error);
    }
  };

  return (
    <div>
      {/* Pass the handleSectionClick function to Navbar */}
      <Navbar handleSectionClick={handleSectionClick} />

      <ToastContainer /> {/* Toast Container for showing notifications */}

      <div className="container mx-auto p-4">
        {/* Conditionally render content based on the selected section */}
        {section === "Student Data" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Student Data</h2>
            {studentData.length > 0 ? (
              <div className="space-y-4">
                {studentData.map((student) => (
                  <div
                    key={student.id} // Use student.id as key
                    className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Hometown:</strong> {student.hometown}</p>
                    <p><strong>Internship:</strong> {student.internship}</p>
                    <p><strong>Projects:</strong> {student.project}</p>
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(student)}
                      disabled={addedStudents.has(student.email)}
                      className={`mt-2 px-4 py-2 rounded ${addedStudents.has(student.email) ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}
                    >
                      {addedStudents.has(student.email) ? (
                        <span className="inline-block">✔</span> // Checkmark
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No student data available.</p>
            )}
          </div>
        )}

        {section === "Selected Students" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Selected Students</h2>
            {selectedStudents.size > 0 ? (
              <div className="space-y-4">
                {Array.from(selectedStudents.values()).map((student) => (
                  <div
                    key={student.id} // Use student.id as key
                    className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Hometown:</strong> {student.hometown}</p>
                    <p><strong>Internship:</strong> {student.internship}</p>
                    <p><strong>Projects:</strong> {student.project}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No selected students data available.</p>
            )}
          </div>
        )}

        {section === "Cart" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.length > 0 ? (
              <>
                <button
                  onClick={saveCartToFirebase}
                  className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save Selected Students
                </button>

                <div className="space-y-4">
                  {cart.map((student) => (
                    <div
                      key={student.id} // Use student.id as key
                      className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <p><strong>Name:</strong> {student.name}</p>
                      <p><strong>Email:</strong> {student.email}</p>
                      <p><strong>Hometown:</strong> {student.hometown}</p>
                      <p><strong>Internship:</strong> {student.internship}</p>
                      <p><strong>Projects:</strong> {student.project}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No students in cart.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
