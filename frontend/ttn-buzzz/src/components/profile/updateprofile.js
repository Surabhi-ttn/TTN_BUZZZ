import React from "react";
import { connect } from 'react-redux';
import {updateProfile} from '../../actions/action'
import "./updateprofile.css";
import cover from "./cover.jpeg";
import profile from "./surabhi.jpg";
import Header from "../header/header";

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
      suggestionlist: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirectToProfile(user_id) {
     this.props.history.push(`/viewprofile/${user_id}`)
  }

  componentDidMount() {
    window.$("select").formSelect();
    
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9000/user/showprofile?user_id=${this.props.user.user_id}`,
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
      })
      .catch((error) => console.log("error", error))

      fetch(`http://localhost:9000/user/suggestionlist?user_id=${this.props.user.user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
        ...this.state,
        suggestionlist: result.suggestionlist
      })
    })
      .catch(error => console.log('error', error));
  }

  handleChange(e) {
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
    urlencoded.append("user_id", this.props.user.user_id);
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
        this.props.updateProfile(result.data[0])
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
                        <option value="" disabled selected>Choose Your Option
                        </option>
                        <option value="ceo">ceo</option>
                        <option value="software engineer">
                          software engineer
                        </option>
                        <option value="manager">manager</option>
                        <option value="trainee">trainee</option>
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
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>
                    </div>
                    <div className="input-field col">
                      <input
                        id="date_of_birth"
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

             { this.state.suggestionlist.map(user => {
                return (
                  <div className="row update-suggestion-profile" onClick={(e) => this.redirectToProfile(user.user_id)}>
                <div className="col s-img">
                  <img src={user.profile_pic} className="circle update-s-profile" alt="s-img"/>
                </div>
                <div className="col s-name">{user.first_name + " " + user.last_name}</div>
                <div className="col add">
                  <a className="add-friend" href="#">
                    +Friend
                  </a>
                </div>
              </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
   user: state || {}
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
      updateProfile: (updatedprofile) => dispatch((updateProfile(updatedprofile)))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateProfile);
