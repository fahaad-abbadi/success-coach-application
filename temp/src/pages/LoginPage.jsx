import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = { anonymousUserName: userName, password };
      const res = await ApiService.loginUser(loginData);

      console.log(res);

      if (res.status === 200) {
        ApiService.saveToken(res.token);
        ApiService.saveRole(res.role);

        setMessage(res.message);
        navigate("/posts");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Login in a User: " + error
      );

      console.log(error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);

    setTimeout(() => {
        setMessage("");
    }, 4000);
  }

  return (
    <div>
      <h2>Login</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default LoginPage;
