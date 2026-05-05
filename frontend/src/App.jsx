import React, { useContext, useState, useEffect } from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import { AuthContext } from "./components/context/AuthProvider";
import { api } from "./components/services/api";

const App = () => {
  const { user, setUser } = useContext(AuthContext); // ✅ SAFE

  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  // RESTORE USER ON REFRESH (IMPORTANT)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  // LOGIN
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async (name, email, password) => {
    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
        role: "employee",
      });

      alert("Signup successful");
      setIsSignup(false);
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  // LOGOUT (FINAL FIX)
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  // AUTH FLOW
  if (!user && !isSignup) {
    return (
      <Login
        handleLogin={handleLogin}
        loading={loading}
        setIsSignup={setIsSignup}
      />
    );
  }

  if (!user && isSignup) {
    return (
      <Signup
        handleSignup={handleSignup}
        setIsSignup={setIsSignup}
      />
    );
  }

  // DASHBOARDS
  if (user?.role === "admin") {
    return <AdminDashboard user={user} logout={handleLogout} />;
  }

  if (user?.role === "employee") {
    return <EmployeeDashboard user={user} logout={handleLogout} />;
  }

  return null;
};

export default App;