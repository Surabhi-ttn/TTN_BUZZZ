import React from 'react';
import "./login.css";
import logo from "./logo.jpeg";

const Login = () => {
  
  return (
    <div className="login-container">
      <div className="row container">
        <div className="card login-card">
          <div className="col">
            <img src={logo} className="App-logo" alt="logo" />
            <h5>
              Enter your details and Start
              <br /> your journey with us
            </h5>
            <h6>Don't sleep until you're proud.</h6>
            <a href="http://localhost:9000/auth/login" className="google-btn" >
              Sign In with Google
            </a>
          </div>
          <div className="col">
            <div className="row">
              <h5>Login to Your Account</h5>
            </div>
            <div className="input-field">
              <input id="email" type="email" className="validate" />
              <label htmlFor="email">TTN Username</label>
            </div>
            <div className="input-field">
              <input id="password" type="password" className="validate" />
              <label htmlFor="password">Password</label>
            </div>
            <div className="row options">
              <div className="col">
                <label>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
              </div>
              <div className="col">
                <span className="optn2">
                  <a href="#" className="forgetpass" target="_blank">
                    Forgot Password?
                  </a>
                </span>
              </div>
            </div>
            <div className="btn2">
              <a href="#" className="local-btn">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
