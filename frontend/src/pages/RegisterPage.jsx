import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const registerData = { anonymousUserName: userName, password };
      await ApiService.registerUser(registerData);

      setMessage("Register Successful");
      navigate("/login");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Regsitering a User: " + error
      );
      console.log(error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
<div className="flex min-h-screen items-center justify-center bg-gray-100">
  <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
    <h2 className="text-center text-2xl font-semibold text-gray-800">Register</h2>

    {message && <p className="text-center text-sm text-red-500">{message}</p>}

    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-gray-500 focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-gray-500 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700"
      >
        Register
      </button>
    </form>

    <p className="text-center text-sm text-gray-600">
      Already have an account?{" "}
      <a href="/login" className="text-gray-800 underline hover:text-gray-600">
        Login
      </a>
    </p>
  </div>
</div>

  );
};

export default RegisterPage;
