"use client"

// components/StudentForm.tsx
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hometown, setHometown] = useState('');
  const [internship, setInternship] = useState('');
  const [project, setProject] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'students'), {
        name,
        email,
        hometown,
        internship,
        project,
      });
      alert('Student information submitted successfully!');
      setName('');
      setEmail('');
      setHometown('');
      setInternship('');
      setProject('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4  bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Student Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="hometown" className="block text-sm font-medium text-gray-700">Hometown:</label>
          <input
            type="text"
            id="hometown"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="internship" className="block text-sm font-medium text-gray-700">Internship:</label>
          <input
            type="text"
            id="internship"
            value={internship}
            onChange={(e) => setInternship(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700">Project:</label>
          <input
            type="text"
            id="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
