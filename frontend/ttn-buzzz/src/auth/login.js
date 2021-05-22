import React from 'react';
import "./login.css";
import logo from "./logo.jpeg";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state= {loginresponse:{}}
  }
   login = () => {
    fetch("http://localhost:9000/auth/login", {
    method: "POST",
    body: JSON.stringify(),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => response.json())
.then(response => this.setState({loginresponse:response}));
}
  
  render() {
  return (
    <div className="login-container">
      <div class="row container">
        <div class="card">
          <div class="col">
            <img src={logo} className="App-logo" alt="logo" />
            <h5>
              Enter your details and Start
              <br /> your journey with us
            </h5>
            <h6>Don't sleep until you're proud.</h6>
            <a class="google-btn" onclick="this.login()">
              Sign In with Google
            </a>
          </div>
          <div class="col">
            <div class="row">
              <h5>Login to Your Account</h5>
            </div>
            <div class="input-field">
              <input id="email" type="email" class="validate" />
              <label for="email">TTN Username</label>
            </div>
            <div class="input-field">
              <input id="password" type="password" class="validate" />
              <label for="password">Password</label>
            </div>
            <div class="row options">
              <div class="col">
                <label>
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
              </div>
              <div class="col">
                <span class="optn2">
                  <a class="forgetpass" href="#" target="_blank">
                    Forgot Password?
                  </a>
                </span>
              </div>
            </div>
            <div class="btn2">
              <a href="#" class="local-btn">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default Login;
