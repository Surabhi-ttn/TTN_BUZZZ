import React, { Component } from "react";
import "./profile.css";
import cover from "./cover.jpeg";
import profile from "./surabhi.jpg";
import Header from '../header/header';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      displayprofile: {},
    }
  }
  

  componentDidMount() {
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
        displayprofile:result
      }); console.log(this.state)
    })
      .catch((error) => console.log("error", error));

  }

  render() {
    return (
      <div className="profile-container">
        <div className="row">
          <Header/>
        </div>
        <div className="row container">
          <div className="col">
            <div className="card card11">
              <div className="content">
                <div className="cover-pic">
                  <img id="pic1" src={cover} alt="cover pic" />
                  <div className="profile-pic">
                    <img id="pic2" src={profile} alt="profile pic" />
                  </div>
                </div>
              </div>
              <div className="display-profile">
                <span id="profile-name">
                  {this.state.displayprofile.first_name + " " + this.state.displayprofile.last_name}
                  </span>
                <p>{this.state.displayprofile.designation}</p>
                <p className="description">
                  {this.state.displayprofile.state + " " +
                  this.state.displayprofile.city + " " +
                  (this.state.displayprofile.friends? this.state.displayprofile.friends.length:0) }Friends
                  </p>
                <a className="add-friend-btn btn">
                  <i className="material-icons icon left">person_add</i>Add Friend
                </a>
                <a className="website-btn btn">
                  <i className="material-icons icon left">launch</i>Visit Website
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card22">
              <div className= "profile-heading">
                <div className="profile-suggestion-heading">Suggestion</div>
              <div><i className="material-icons">search</i></div>
              </div>
              
              <div className="suggestion-userprofile">
                <div className="suggestion-img">
                  <img src={profile} className="circle userprofile" />
                </div>
                <div className="suggestion-name">Name</div>
                <div className="s-add">
                  <a className="add-userfriend" href="#">+Friend</a>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Profile;
