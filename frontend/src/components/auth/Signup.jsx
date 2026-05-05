import React, { useState } from "react";

const Signup = ({ handleSignup, setIsSignup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await handleSignup(name, email, password, role);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-purple-950">

      <div className="w-[90%] max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white">

        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={submitHandler} className="space-y-4">

          <input
            className="w-full p-3 rounded bg-black/40 border border-white/10"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded bg-black/40 border border-white/10"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 rounded bg-black/40 border border-white/10"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE SELECT (IMPORTANT FOR ASSESSMENT) */}
          <select
            className="w-full p-3 rounded bg-black/40 border border-white/10"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <button
            disabled={loading}
            className="w-full p-3 rounded bg-purple-600 hover:bg-purple-700 transition"
          >
            {loading ? "Creating..." : "Signup"}
          </button>

        </form>

        <p
          className="text-center mt-4 text-sm cursor-pointer text-gray-300"
          onClick={() => setIsSignup(false)}
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
};

export default Signup;