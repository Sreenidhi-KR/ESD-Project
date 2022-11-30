import React, { useState } from "react";
import axios from "axios";

function Login({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const urlBase = "http://localhost:8080/api";

  const startLogin = (credentials) => {
    axios
      .post(`${urlBase}/student/login`, credentials)
      .then((json) => {
        user(json.data.studentId);
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
    <div className="form-container">
      <div className="form-box regular-shadow">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i
              className="fa fa-user-circle"
              style={{ fontSize: "110px", color: "lightblue" }}
            ></i>
          </h4>
          <div className="image"></div>
        </div>

        <div className="body-form">
          <form onSubmit={handleLogin} id="login-form">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                required
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              id="login-submit"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
