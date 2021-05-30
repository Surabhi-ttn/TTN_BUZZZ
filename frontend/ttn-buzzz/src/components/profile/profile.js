import React, { Component } from "react";
import "./profile.css";
import { connect } from 'react-redux';
import cover from "./cover.jpeg";
import profile from "./surabhi.jpg";
import Header from '../header/header';
import {Redirect} from 'react-router'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      displayprofile: {},
      suggestionlist: []
    }
  }
  
  redirectToProfile(user_id) {
     this.props.history.push(`/viewprofile/${user_id}`)
  }

  componentDidMount() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:9000/user/showprofile?user_id=${this.props.match.params.user_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
        ...this.state,
        displayprofile:result
      }); 
    })
      .catch((error) => console.log("error", error));

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
                    <img id="pic2" src={this.state.displayprofile.profile_pic} alt="profile pic" />
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
              
              {this.state.suggestionlist.map(user => {
                return (
                  <div className="suggestion-userprofile" onClick={(e) => this.redirectToProfile(user.user_id)}>
                <div className="suggestion-img">
                  <img src={user.profile_pic} className="circle userprofile" alt="suggestion-image"/>
                </div>
                <div className="suggestion-name">{user.first_name + " " + user.last_name}</div>
                <div className="s-add">
                  <a className="add-userfriend" href="#">+Friend</a>
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
  return {
    user: state || {}
  }
}

export default connect(mapStateToProps)(Profile);
