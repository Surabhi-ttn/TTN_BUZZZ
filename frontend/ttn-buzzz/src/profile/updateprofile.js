import React, { Component } from "react";
import "./updateprofile.css";
import cover from "./cover.jpeg";
import profile from "./surabhi.jpg";
import Header from "../header/header";
import M from "materialize-css";
import $ from "jquery";

class UpdateProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      "user_id": "",
      "first_name": "",
      "last_name": "",
      "profile_pic": "",
      "cover_pic": "",
      "designation": "",
      "gender": "",
      "date_of_birth": "",
      "website": "",
      "city": "",
      "state": "",
      "pincode": "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    window.$("select").formSelect();
    
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:9000/user/showprofile?user_id=surabhi.chaurasia@tothenew.com",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          ...this.state,
          "first_name": result.first_name,
          "last_name": result.last_name,
          "profile_pic": result.profile_pic,
          "cover_pic": result.cover_pic,
          "designation": result.designation,
          "gender": result.gender,
          "date_of_birth": result.date_of_birth,
          "website": result.website,
          "city": result.city,
          "state": result.state,
          "pincode": result.pincode,
        });
        console.log(this.state);
      })
      .catch((error) => console.log("error", error))
  }

  handleChange(e) {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value,
    });
    const gender =
      document.getElementById("gender").options[
        document.getElementById("gender").selectedIndex
      ].text;
    const designation =
      document.getElementById("designation").options[
        document.getElementById("designation").selectedIndex
      ].text;
    this.setState({
      gender: gender,
      designation: designation,
    });
    
  }

  handleSubmit() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("user_id", "surabhi.chaurasia@tothenew.com");
    urlencoded.append("first_name", this.state.first_name);
    urlencoded.append("last_name", this.state.last_name);
    urlencoded.append("profile_pic", this.state.profile_pic);
    urlencoded.append("cover_pic", this.state.cover_pic);
    urlencoded.append("designation", this.state.designation);
    urlencoded.append("gender", this.state.gender);
    urlencoded.append("date_of_birth", this.state.date_of_birth);
    urlencoded.append("website", this.state.website);
    urlencoded.append("city", this.state.city);
    urlencoded.append("state", this.state.state);
    urlencoded.append("pincode", this.state.pincode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:9000/user/editprofile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          ...this.state,
          "first_name": result.first_name,
          "last_name": result.last_name,
          "profile_pic": result.profile_pic,
          "cover_pic": result.cover_pic,
          "designation": result.designation,
          "gender": result.gender,
          "date_of_birth": result.date_of_birth,
          "website": result.website,
          "city": result.city,
          "state": result.state,
          "pincode": result.pincode,
        });
        console.log(this.state);
      })
      .catch((error) => console.log("error", error));
  }
  render() {
    return (
      <div className="profile-form">
        <Header />
        <div className="row update-container">
          <div className="col">
            <div className="card update-card1">
              <form className="content">
                <div className="update-cover-pic">
                  <img id="update-pic1" src={cover} alt="cover pic" />
                  <div className="update-profile-pic">
                    <img id="update-pic2" src={profile} alt="profile pic" />
                    <div className="edit-profile circle">
                      <i className="material-icons e-profile">add_a_photo</i>
                    </div>
                  </div>
                </div>

                <div className="update-profile">
                  <div className="row">
                    <div className="input-field col">
                      <input
                        id="first_name"
                        placeholder=""
                        type="text"
                        disabled
                        value={this.state.first_name}
                        class="validate"
                      />
                      <label for="first_name">First Name</label>
                    </div>
                    <div className="input-field col">
                      <input
                        id="last_name"
                        placeholder=""
                        type="text"
                        disabled
                        value={this.state.last_name}
                        class="validate"
                      />
                      <label for="last_name">Last Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Designation</label>
                      <select
                        id="designation"
                        placeholder=""
                        value={this.state.designation}
                        onChange={this.handleChange}
                      >
                        <option value="" disabled selected>
                          Choose your option
                        </option>
                        <option value="ceo">CEO</option>
                        <option value="software engineer">
                          Software Engineer
                        </option>
                        <option value="manager">Manager</option>
                        <option value="trainee">Trainee</option>
                      </select>
                    </div>
                    <div className="input-field col">
                      <input
                        id="website"
                        type="text"
                        placeholder=""
                        value={this.state.website}
                        onChange={this.handleChange}
                        class="validate"
                      />
                      <label for="website">My Website</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <label>Gender</label>
                      <select
                        id="gender"
                        placeholder=""
                        value={this.state.gender}
                        onChange={this.handleChange}
                      >
                        <option value="" disabled selected>
                          Choose your option
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="input-field col">
                      <input
                        id="dob"
                        type="date"
                        placeholder=""
                        value={this.state.date_of_birth}
                        onChange={this.handleChange}
                        class="validate"
                      />
                      <label for="dob">Date Of Birth</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col">
                      <input
                        id="city"
                        type="text"
                        placeholder=""
                        value={this.state.city}
                        onChange={this.handleChange}
                        class="validate"
                      />
                      <label for="city">City</label>
                    </div>
                    <div className="input-field col">
                      <input
                        id="state"
                        type="text"
                        placeholder=""
                        value={this.state.state}
                        onChange={this.handleChange}
                        class="validate"
                      />
                      <label for="state">State</label>
                    </div>
                    <div className="input-field col">
                      <input
                        id="pincode"
                        type="number"
                        placeholder=""
                        value={this.state.pincode}
                        onChange={this.handleChange}
                        class="validate"
                      />
                      <label for="pincode">Pincode</label>
                    </div>
                  </div>
                  <a
                    className="save-btn btn"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    Save
                  </a>
                  <a className="reset-btn btn">Reset All</a>
                </div>
              </form>
            </div>
          </div>
          <div className="col">
            <div className="card update-card2">
              <div className="row update-s-heading">
                <div className="col update-heading">Suggestion</div>
                <div className="col">
                  <i className="material-icons">search</i>
                </div>
              </div>

              <div className="row update-suggestion-profile">
                <div className="col s-img">
                  <img src={profile} className="circle update-s-profile" />
                </div>
                <div className="col s-name">Name</div>
                <div className="col add">
                  <a className="add-friend" href="#">
                    +Friend
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
