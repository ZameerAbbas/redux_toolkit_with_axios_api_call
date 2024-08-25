import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../redux/slice/authSlice";
import { useNavigate  } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const loginError = useSelector((state) => state.auth.loginError);
  const loginData = useSelector((state) => state.auth.loginData);

  // Local state for form inputs
  const [username, setUsername] = useState(""); //emilys
  const [password, setPassword] = useState(""); //emilyspass

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginApi({ username, password, expiresInMins: 30 }));
  };

  console.log("loginData", loginData);
  useEffect(() => {
    if (loginData) {
      navigate("/home");
    }
  }, [loginData, navigate]);
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {loginError && <p style={{ color: "red" }}>Error: {loginError}</p>}
    </div>
  );
};

export default LoginPage;
