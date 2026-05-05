import React, { useState } from "react";

const Login = ({ handleLogin, loading, setIsSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-purple-950">

      <div className="relative w-[90%] max-w-md p-10 rounded-3xl 
        bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">

        <h2 className="text-4xl font-extrabold text-center text-white">
          Welcome Back
        </h2>

        <form onSubmit={submitHandler} className="mt-8 space-y-5">

          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 text-white"
          />

          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p
          className="text-center text-sm text-blue-400 mt-4 cursor-pointer"
          onClick={() => setIsSignup(true)}
        >
          New user? Create account
        </p>

      </div>
    </div>
  );
};

export default Login;