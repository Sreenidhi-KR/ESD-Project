import React, { useState } from "react";
import axios from "axios";

function Login({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const urlBase = "http://localhost:8080/api";

  const startLogin = (credentials) => {
    axios
      .post(`${urlBase}/admin/login`, credentials)
      .then((json) => {
        user(json.data.adminId);
        localStorage.setItem("Id", json.data.adminId);
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        alert("Inavlid Credintials");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = {
      email,
      password,
    };
    startLogin(credentials);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3>Sign In</h3>
          <div className="form-group mt-3">
            <h5>Email address</h5>
            <input
              type="email"
              required
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <h5>Password</h5>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid mt-5">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleLogin(e)}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Login;
