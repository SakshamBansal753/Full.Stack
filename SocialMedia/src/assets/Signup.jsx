import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [NewUser, setNewUser] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [Message, setMessage] = useState("");

  const create = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(NewUser)
      });

      const data = await response.json(); // ✅ FIXED await

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("Account created successfully!");
      navigate("/");
    } catch (e) {
      console.error(e);
      setMessage("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">Sign Up</h1>
          <p className="text-sm text-gray-400">Join the community and share your posts.</p>
        </div>
        <form className="space-y-4" onSubmit={create}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. johndoe"
              value={NewUser.username}
              onChange={(e) => setNewUser({ ...NewUser, username: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={NewUser.email}
              onChange={(e) => setNewUser({ ...NewUser, email: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={NewUser.password}
              onChange={(e) => setNewUser({ ...NewUser, password: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Sign Up
          </button>

          {Message && (
            <p className="text-sm text-center mt-2 text-yellow-400">{Message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
