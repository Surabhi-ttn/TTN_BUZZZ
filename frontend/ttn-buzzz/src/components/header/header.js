import React from "react";
import logo from "../auth/logo.jpeg";
import profile from "../profile/surabhi.jpg";
import "./header.css";

const Header = () => {


  // handleContactList() {
  //   var requestOptions = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
    
  //   fetch("http://localhost:9000/user/contactlist?user_id=ankitpahwa111@gmail.com", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

    return (
      <div className="header navbar-fixed">
        <nav className="navbar">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              <img src={logo} className="logo" alt="logo" />
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <img src={profile} className="header-profile circle" alt="logo" />
              </li>
              <li>
                <span className="p-name">Name</span>
              </li>
              
              <li>
                <a href="#">
                  <i className="fab fa-facebook-messenger circle"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="material-icons circle">person</i>
                </a>
              </li>
              <li>
                <a href="#">
                <a className="btn logout-btn">Logout</a>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

export default Header;
