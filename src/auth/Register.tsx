import React, { useState } from "react";

import { useAuth } from "./AuthContext";

const Register: React.FC = () => {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await register(email, password);
      setSuccess("Account created successfully!");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-950">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-500/10 text-red-400 border border-red-500/20 text-sm p-2 mb-4 rounded text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-red-500/10 text-green-400 border border-red-500/20 text-sm p-2 mb-4 rounded text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:text-blue-300">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
